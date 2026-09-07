import { createElement, useEffect, useRef } from 'react'
import { SYSTEMS } from './anatomyData.js'
import { createExplosionLayout } from './explosionLayout.js'
import { mergeAtlasGeometries } from './mergeGeometries.js'
import { decodeModelResponse } from './modelDownload.js'
import { PointerTap } from './pointerTap.js'
import { SimpleOrbitControls } from './simpleOrbitControls.js'

const clamp01 = (value) => Math.max(0, Math.min(1, Number(value) || 0))

export default function AnatomyScene({
  THREE,
  atlas,
  state,
  onSelect,
  onProgress,
  onError,
}) {
  const hostRef = useRef(null)
  const latestState = useRef(state)
  const selectRef = useRef(onSelect)
  const progressRef = useRef(onProgress)
  const errorRef = useRef(onError)

  latestState.current = state
  selectRef.current = onSelect
  progressRef.current = onProgress
  errorRef.current = onError

  useEffect(() => {
    const host = hostRef.current
    if (!host || !THREE || !atlas) return undefined

    let disposed = false
    let frame = 0
    let dirty = true
    let ready = false
    let loadedChunks = 0
    let amount = 0
    let packingWidth = 1
    let packingHeight = 1
    let layoutKey = ''
    let lastView = ''
    let lastReset = -1
    let lastExplodeTarget = -1
    let lastIsolateKey = ''
    let lastStateKey = ''

    const abort = new AbortController()
    const geometries = []
    const materials = []
    const sceneObjects = []
    const pickers = []

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      })
    } catch {
      errorRef.current?.('Este navegador no pudo iniciar el visor 3D. Activa WebGL o usa un navegador actualizado.')
      return undefined
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.08
    renderer.domElement.className = 'atlas3d-canvas'
    renderer.domElement.setAttribute(
      'aria-label',
      'Modelo anatómico humano interactivo. Arrastra para rotar, usa la rueda o pellizca para acercar y toca una estructura para identificarla.',
    )
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.005, 100)
    camera.position.set(1.4, 1.05, 3.6)

    const controls = new SimpleOrbitControls(THREE, camera, renderer.domElement, () => {
      dirty = true
    })
    controls.target.set(0, 0.85, 0)
    controls.syncFromCamera()

    const hemisphere = new THREE.HemisphereLight(0xffffff, 0x64748b, 1.35)
    const keyLight = new THREE.DirectionalLight(0xfffaf4, 2.1)
    keyLight.position.set(-2, 4, 3)
    const rimLight = new THREE.DirectionalLight(0xdbeafe, 1.55)
    rimLight.position.set(2, 2, -3)
    scene.add(hemisphere, keyLight, rimLight)

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(30, 96),
      new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 1 }),
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.019
    scene.add(ground)
    sceneObjects.push(ground)

    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(0.68, 0.7, 0.028, 100),
      new THREE.MeshStandardMaterial({ color: 0xe8edf2, metalness: 0.08, roughness: 0.7 }),
    )
    platform.position.y = -0.016
    scene.add(platform)
    sceneObjects.push(platform)

    const textureWidth = THREE.MathUtils.ceilPowerOfTwo(atlas.parts.length)
    const partData = new Float32Array(textureWidth * 4)
    const partTexture = new THREE.DataTexture(
      partData,
      textureWidth,
      1,
      THREE.RGBAFormat,
      THREE.FloatType,
    )
    partTexture.minFilter = THREE.NearestFilter
    partTexture.magFilter = THREE.NearestFilter
    partTexture.generateMipmaps = false
    partTexture.needsUpdate = true

    const selectionData = new Uint8Array(textureWidth * 4)
    const selectionTexture = new THREE.DataTexture(
      selectionData,
      textureWidth,
      1,
      THREE.RGBAFormat,
      THREE.UnsignedByteType,
    )
    selectionTexture.minFilter = THREE.NearestFilter
    selectionTexture.magFilter = THREE.NearestFilter
    selectionTexture.generateMipmaps = false
    selectionTexture.needsUpdate = true

    const centers = atlas.parts.map((part) => (
      new THREE.Vector3()
        .fromArray(part.bounds[0])
        .add(new THREE.Vector3().fromArray(part.bounds[1]))
        .multiplyScalar(0.5)
    ))
    const bounds = atlas.parts.map((part) => new THREE.Box3(
      new THREE.Vector3().fromArray(part.bounds[0]),
      new THREE.Vector3().fromArray(part.bounds[1]),
    ))
    const offsets = []

    const applyTheme = () => {
      const dark = document.documentElement.dataset.tema === 'oscuro'
      renderer.setClearColor(dark ? 0x07101c : 0xeaf0f6)
      ground.material.color.set(dark ? 0x111b2d : 0xcbd5e1)
      platform.material.color.set(dark ? 0x182235 : 0xe8edf2)
      dirty = true
    }
    applyTheme()
    const themeObserver = new MutationObserver(applyTheme)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-tema'],
    })

    const materialFor = (systemId) => {
      const system = SYSTEMS.find((item) => item.id === systemId)
      const surface = systemId === 'integumentary'
      const material = new THREE.MeshStandardMaterial({
        color: system?.color || '#aebbb8',
        metalness: 0.04,
        roughness: 0.58,
        side: THREE.DoubleSide,
        transparent: surface,
        opacity: surface ? 0.11 : 1,
        depthWrite: !surface,
      })

      material.onBeforeCompile = (shader) => {
        shader.uniforms.partState = { value: partTexture }
        shader.uniforms.selectionState = { value: selectionTexture }
        shader.uniforms.stateWidth = { value: textureWidth }
        shader.vertexShader = `
          attribute float partIndex;
          uniform sampler2D partState;
          uniform sampler2D selectionState;
          uniform float stateWidth;
          varying float partVisible;
          varying float partSelected;
        ${shader.vertexShader}`
        shader.vertexShader = shader.vertexShader.replace(
          '#include <begin_vertex>',
          `#include <begin_vertex>
          vec2 stateUv = vec2((partIndex + 0.5) / stateWidth, 0.5);
          vec4 atlasState = texture2D(partState, stateUv);
          transformed += atlasState.xyz;
          partVisible = atlasState.w;
          partSelected = texture2D(selectionState, stateUv).r;`,
        )
        shader.fragmentShader = `
          varying float partVisible;
          varying float partSelected;
        ${shader.fragmentShader}`
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <clipping_planes_fragment>',
          `#include <clipping_planes_fragment>
          if (partVisible < 0.5) discard;`,
        )
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <color_fragment>',
          `#include <color_fragment>
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.04, 0.72, 0.95), partSelected * 0.78);`,
        )
      }
      material.customProgramCacheKey = () => 'ptem-atlas-part-state-v1'
      materials.push(material)
      return material
    }

    const systemMaterials = new Map(SYSTEMS.map((system) => [system.id, materialFor(system.id)]))

    const loadChunk = async (chunkIndex) => {
      const chunk = atlas.chunks[chunkIndex]
      const compressed = Boolean(chunk.gzip && typeof DecompressionStream !== 'undefined')
      const response = await fetch(compressed ? chunk.gzip : chunk.url, {
        signal: abort.signal,
        cache: 'force-cache',
        mode: 'cors',
      })
      const buffer = await decodeModelResponse(response, chunk.bytes, compressed)
      if (disposed) return

      const groups = new Map()
      atlas.parts.forEach((part, partIndex) => {
        if (part.chunk !== chunkIndex) return

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute(
          'position',
          new THREE.BufferAttribute(
            new Float32Array(buffer, part.positions, part.vertexCount * 3),
            3,
          ),
        )
        geometry.setAttribute(
          'normal',
          new THREE.BufferAttribute(
            new Int16Array(buffer, part.normals, part.vertexCount * 3),
            3,
            true,
          ),
        )
        geometry.setIndex(new THREE.BufferAttribute(
          new Uint32Array(buffer, part.indices, part.indexCount),
          1,
        ))
        geometry.setAttribute(
          'partIndex',
          new THREE.BufferAttribute(new Float32Array(part.vertexCount).fill(partIndex), 1),
        )
        geometry.boundingBox = bounds[partIndex].clone()
        geometry.computeBoundingSphere()
        geometries.push(geometry)

        const picker = new THREE.Mesh(geometry)
        picker.matrixAutoUpdate = false
        pickers[partIndex] = picker

        const group = groups.get(part.system) || []
        group.push(geometry)
        groups.set(part.system, group)
      })

      groups.forEach((group, systemId) => {
        const geometry = mergeAtlasGeometries(THREE, group)
        if (!geometry) return
        geometries.push(geometry)
        const mesh = new THREE.Mesh(geometry, systemMaterials.get(systemId))
        mesh.frustumCulled = false
        scene.add(mesh)
      })

      loadedChunks += 1
      progressRef.current?.(Math.round((loadedChunks / atlas.chunks.length) * 100))
      lastStateKey = ''
      dirty = true
    }

    ;(async () => {
      try {
        let cursor = 0
        await Promise.all(Array.from({ length: 3 }, async () => {
          while (cursor < atlas.chunks.length) {
            const chunkIndex = cursor
            cursor += 1
            await loadChunk(chunkIndex)
          }
        }))
        if (!disposed) {
          ready = true
          dirty = true
        }
      } catch (error) {
        if (!disposed && error?.name !== 'AbortError') {
          errorRef.current?.(
            error instanceof Error
              ? error.message
              : 'No se pudo preparar el modelo anatómico.',
          )
        }
      }
    })()

    const directionFor = (view) => {
      if (view === 'front') return new THREE.Vector3(0, 0.02, 1)
      if (view === 'back') return new THREE.Vector3(0, 0.02, -1)
      if (view === 'side') return new THREE.Vector3(1, 0.02, 0)
      return new THREE.Vector3(0.35, 0.06, 1).normalize()
    }

    const fit = (view, extent = amount) => {
      const mobile = host.clientWidth < 768
      const fov = THREE.MathUtils.degToRad(camera.fov / 2)
      let distance = mobile ? 4.8 : 4
      let targetY = 0.85
      let effectiveView = view

      if (extent > 0.15) {
        const safeAspect = Math.max(0.35, camera.aspect)
        const packedSize = Math.max(packingHeight, packingWidth / safeAspect)
        distance = Math.max(distance, (packedSize / (2 * Math.tan(fov))) * 1.25)
        targetY = 0.85
        if (extent > 0.8) effectiveView = 'front'
      }

      controls.target.set(0, targetY, 0)
      camera.position.copy(controls.target).addScaledVector(
        directionFor(effectiveView),
        distance,
      )
      controls.maxDistance = Math.max(40, distance * 2.5)
      controls.syncFromCamera()
      dirty = true
    }

    const fitSelected = () => {
      const selected = new Set(latestState.current.selected)
      const box = new THREE.Box3()
      atlas.parts.forEach((part, index) => {
        if (!selected.has(part.id)) return
        box.union(bounds[index].clone().translate(new THREE.Vector3(
          partData[index * 4],
          partData[index * 4 + 1],
          partData[index * 4 + 2],
        )))
      })
      if (box.isEmpty()) return

      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      const largest = Math.max(size.x / Math.max(0.45, camera.aspect), size.y, size.z, 0.04)
      const distance = Math.max(
        0.12,
        (largest / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)))) * 1.7,
      )
      controls.target.copy(center)
      camera.position.copy(center).addScaledVector(
        directionFor(latestState.current.view),
        distance,
      )
      controls.maxDistance = Math.max(40, distance * 3)
      controls.syncFromCamera()
      dirty = true
    }

    const applyState = (force = false) => {
      const current = latestState.current
      const visible = new Set(current.visible)
      const selected = new Set(current.selected)
      const stateKey = `${current.visible.join(',')}|${current.selected.join(',')}|${current.isolate}`
      const visibleParts = atlas.parts.filter((part) => (
        current.isolate
          ? selected.has(part.id)
          : visible.has(part.system) || selected.has(part.id)
      ))
      const nextLayoutKey = `${stateKey}|${camera.aspect.toFixed(3)}`

      if (nextLayoutKey !== layoutKey) {
        const layout = createExplosionLayout(visibleParts, camera.aspect)
        packingWidth = layout.width || 1
        packingHeight = layout.height || 1
        atlas.parts.forEach((part, index) => {
          const cell = layout.cells.get(part.id)
          offsets[index] = cell
            ? new THREE.Vector3(cell.x, cell.y + 0.85, 0)
            : centers[index].clone()
        })
        layoutKey = nextLayoutKey
      }

      if (!force && stateKey === lastStateKey && Math.abs(amount - current.explode) < 0.0001) {
        return
      }

      atlas.parts.forEach((part, index) => {
        const center = centers[index]
        const destination = offsets[index] || center
        let dx = 0
        let dy = 0
        let dz = 0

        if (amount <= 0.45) {
          const t = amount / 0.45
          const group = Math.max(0, SYSTEMS.findIndex((system) => system.id === part.system))
          const angle = (group / SYSTEMS.length) * Math.PI * 2
          dx = Math.sin(angle) * t * 0.48
          dy = (center.y - 0.85) * t * 0.28
          dz = Math.cos(angle) * t * 0.48
        } else {
          const t = (amount - 0.45) / 0.55
          const group = Math.max(0, SYSTEMS.findIndex((system) => system.id === part.system))
          const angle = (group / SYSTEMS.length) * Math.PI * 2
          dx = THREE.MathUtils.lerp(Math.sin(angle) * 0.48, destination.x - center.x, t)
          dy = THREE.MathUtils.lerp((center.y - 0.85) * 0.28, destination.y - center.y, t)
          dz = THREE.MathUtils.lerp(Math.cos(angle) * 0.48, -center.z, t)
        }

        const isSelected = selected.has(part.id)
        const isVisible = current.isolate
          ? isSelected
          : visible.has(part.system) || isSelected

        partData.set([dx, dy, dz, isVisible ? 1 : 0], index * 4)
        selectionData[index * 4] = isSelected ? 255 : 0

        const picker = pickers[index]
        if (picker) {
          picker.position.set(dx, dy, dz)
          picker.updateMatrix()
          picker.updateMatrixWorld(true)
        }
      })

      partTexture.needsUpdate = true
      selectionTexture.needsUpdate = true
      ground.visible = platform.visible = amount < 0.5 && !current.isolate
      controls.enableRotate = amount < 0.8
      controls.panMode = amount >= 0.8
      controls.autoRotate = current.rotate && !current.isolate && amount < 0.4
      lastStateKey = stateKey
      dirty = true
    }

    const resize = () => {
      if (!host.clientWidth || !host.clientHeight) return
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, host.clientWidth < 768 ? 1.45 : 1.8))
      camera.aspect = host.clientWidth / host.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(host.clientWidth, host.clientHeight, false)
      layoutKey = ''
      applyState(true)
      if (latestState.current.isolate) fitSelected()
      else fit(latestState.current.view, clamp01(latestState.current.explode))
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    resize()

    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    const worldBox = new THREE.Box3()
    const hitPoint = new THREE.Vector3()
    const tap = new PointerTap()

    const pointerDown = (event) => {
      tap.down(
        event.pointerId,
        event.clientX,
        event.clientY,
        event.pointerType === 'touch' ? 12 : 5,
      )
    }
    const pointerMove = (event) => tap.move(event.pointerId, event.clientX, event.clientY)
    const pointerCancel = (event) => tap.cancel(event.pointerId)
    const pointerUp = (event) => {
      const validTap = tap.up(event.pointerId, event.clientX, event.clientY)
      if (!validTap || !ready) return

      const rect = renderer.domElement.getBoundingClientRect()
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1,
      )
      raycaster.setFromCamera(pointer, camera)

      let nearest = Infinity
      let found = -1
      const hasSolid = atlas.parts.some((part, index) => (
        part.system !== 'integumentary' && partData[index * 4 + 3] > 0.5
      ))

      pickers.forEach((mesh, index) => {
        const part = atlas.parts[index]
        if (
          !mesh
          || partData[index * 4 + 3] < 0.5
          || (hasSolid && part.system === 'integumentary')
        ) return

        worldBox.copy(bounds[index]).translate(mesh.position)
        if (!raycaster.ray.intersectBox(worldBox, hitPoint)) return
        const hits = raycaster.intersectObject(mesh, false)
        if (hits[0] && hits[0].distance < nearest) {
          nearest = hits[0].distance
          found = index
        }
      })

      if (found >= 0) selectRef.current?.(atlas.parts[found].id)
    }

    renderer.domElement.addEventListener('pointerdown', pointerDown)
    renderer.domElement.addEventListener('pointermove', pointerMove)
    renderer.domElement.addEventListener('pointerup', pointerUp)
    renderer.domElement.addEventListener('pointercancel', pointerCancel)

    const contextLost = (event) => {
      event.preventDefault()
      errorRef.current?.('El dispositivo pausó la sesión 3D. Recarga el visor para continuar.')
    }
    renderer.domElement.addEventListener('webglcontextlost', contextLost)

    const clock = new THREE.Clock()
    const animate = () => {
      if (disposed) return
      frame = requestAnimationFrame(animate)
      const delta = Math.min(clock.getDelta(), 0.05)
      const current = latestState.current
      const targetAmount = clamp01(current.explode)
      const moving = Math.abs(amount - targetAmount) > 0.0001

      if (moving) {
        amount = THREE.MathUtils.damp(amount, targetAmount, 8, delta)
        if (Math.abs(amount - targetAmount) < 0.0001) amount = targetAmount
      }

      if (moving || lastStateKey === '') applyState(true)
      else applyState(false)

      if (current.view !== lastView || current.reset !== lastReset) {
        if (current.isolate) fitSelected()
        else fit(current.view, amount)
        lastView = current.view
        lastReset = current.reset
      }

      if (targetAmount !== lastExplodeTarget && !current.isolate) {
        fit(current.view, targetAmount)
        lastExplodeTarget = targetAmount
      }

      const isolateKey = current.isolate
        ? `${current.selected.join(',')}|${current.reset}|${camera.aspect.toFixed(3)}`
        : ''
      if (isolateKey !== lastIsolateKey) {
        if (current.isolate) fitSelected()
        else if (lastIsolateKey) fit(current.view, amount)
        lastIsolateKey = isolateKey
      }

      if (controls.update(delta)) dirty = true
      if (dirty || moving) {
        renderer.render(scene, camera)
        dirty = false
      }
    }
    animate()

    return () => {
      disposed = true
      abort.abort()
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      themeObserver.disconnect()
      controls.dispose()
      renderer.domElement.removeEventListener('pointerdown', pointerDown)
      renderer.domElement.removeEventListener('pointermove', pointerMove)
      renderer.domElement.removeEventListener('pointerup', pointerUp)
      renderer.domElement.removeEventListener('pointercancel', pointerCancel)
      renderer.domElement.removeEventListener('webglcontextlost', contextLost)

      const disposedGeometries = new Set()
      geometries.forEach((geometry) => {
        if (!disposedGeometries.has(geometry)) {
          geometry.dispose()
          disposedGeometries.add(geometry)
        }
      })
      sceneObjects.forEach((object) => {
        if (object.geometry && !disposedGeometries.has(object.geometry)) object.geometry.dispose()
        const objectMaterials = Array.isArray(object.material) ? object.material : [object.material]
        objectMaterials.filter(Boolean).forEach((material) => material.dispose())
      })
      materials.forEach((material) => material.dispose())
      partTexture.dispose()
      selectionTexture.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [THREE, atlas])

  return createElement('div', { className: 'atlas3d-scene', ref: hostRef })
}
