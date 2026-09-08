import { useEffect, useRef } from 'react'
import { loadThree } from '../anatomy3d/atlasSource.js'
import { PointerTap } from '../anatomy3d/pointerTap.js'
import { SimpleOrbitControls } from '../anatomy3d/simpleOrbitControls.js'
import { COMPARTIMENTOS_BOTIQUIN } from '../../lib/botiquinModelo.js'

const COLUMNAS = [-4.35, -1.45, 1.45, 4.35]
const FILAS = [-1.55, 1.55]
const POSICIONES = Object.fromEntries(
  COMPARTIMENTOS_BOTIQUIN.map((compartimento, indice) => [
    compartimento.id,
    { x: COLUMNAS[indice % 4], z: FILAS[Math.floor(indice / 4)] },
  ]),
)

function colorSeguro(THREE, valor, respaldo = '#38bdf8') {
  try { return new THREE.Color(valor || respaldo) } catch { return new THREE.Color(respaldo) }
}

function material(THREE, color, opciones = {}) {
  return new THREE.MeshStandardMaterial({
    color: colorSeguro(THREE, color),
    roughness: opciones.roughness ?? 0.5,
    metalness: opciones.metalness ?? 0.05,
    transparent: Boolean(opciones.transparent),
    opacity: opciones.opacity ?? 1,
    side: opciones.side,
  })
}

function mesh(THREE, geometria, color, opciones) {
  const objeto = new THREE.Mesh(geometria, material(THREE, color, opciones))
  objeto.castShadow = true
  objeto.receiveShadow = true
  return objeto
}

function caja(THREE, ancho, alto, fondo, color, opciones) {
  return mesh(THREE, new THREE.BoxGeometry(ancho, alto, fondo), color, opciones)
}

function cilindro(THREE, radio, alto, color, opciones) {
  return mesh(THREE, new THREE.CylinderGeometry(radio, radio, alto, 24), color, opciones)
}

function capsula(THREE, radio, largo, color) {
  const grupo = new THREE.Group()
  const cuerpo = cilindro(THREE, radio, largo, color)
  cuerpo.rotation.z = Math.PI / 2
  grupo.add(cuerpo)
  const extremos = [-largo / 2, largo / 2]
  for (const x of extremos) {
    const extremo = mesh(THREE, new THREE.SphereGeometry(radio, 18, 12), color)
    extremo.position.x = x
    grupo.add(extremo)
  }
  return grupo
}

function tuboCurvo(THREE, color, escala = 1) {
  const curva = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.55 * escala, 0.05, 0),
    new THREE.Vector3(-0.22 * escala, 0.45 * escala, 0),
    new THREE.Vector3(0.15 * escala, 0.36 * escala, 0),
    new THREE.Vector3(0.5 * escala, 0.05, 0),
  ])
  return mesh(THREE, new THREE.TubeGeometry(curva, 24, 0.055 * escala, 10, false), color)
}

function etiquetaCruz(THREE, color = '#ffffff') {
  const cruz = new THREE.Group()
  const horizontal = caja(THREE, 1.15, 0.12, 0.34, color)
  const vertical = caja(THREE, 0.34, 0.12, 1.15, color)
  cruz.add(horizontal, vertical)
  return cruz
}

function crearObjeto(THREE, articulo) {
  const grupo = new THREE.Group()
  const color = articulo.visual?.color || '#38bdf8'
  const preset = articulo.visual?.preset || 'generico'
  const blanco = '#f8fafc'
  const oscuro = '#0f172a'
  const metal = '#94a3b8'

  const agregarFrasco = ({ ancho = 0.42, alto = 1.05, tapa = '#e2e8f0' } = {}) => {
    const cuerpo = cilindro(THREE, ancho, alto, color, { transparent: true, opacity: 0.92 })
    cuerpo.position.y = alto / 2
    const cuello = cilindro(THREE, ancho * 0.55, 0.2, color)
    cuello.position.y = alto + 0.08
    const tap = cilindro(THREE, ancho * 0.68, 0.18, tapa)
    tap.position.y = alto + 0.24
    grupo.add(cuerpo, cuello, tap)
  }

  switch (preset) {
    case 'botella': {
      agregarFrasco({ ancho: 0.38, alto: 1.15, tapa: '#ffffff' })
      const bomba = caja(THREE, 0.48, 0.12, 0.18, '#e2e8f0')
      bomba.position.set(0.15, 1.5, 0)
      grupo.add(bomba)
      break
    }
    case 'frasco':
      agregarFrasco({ ancho: 0.34, alto: 0.9, tapa: oscuro })
      break
    case 'sobre':
    case 'paquete':
    case 'selloToracico':
    case 'compresa': {
      const ancho = preset === 'sobre' ? 0.9 : 1.05
      const fondo = preset === 'compresa' ? 0.82 : 0.72
      const alto = preset === 'compresa' ? 0.22 : 0.13
      const paquete = caja(THREE, ancho, alto, fondo, color, { roughness: 0.72 })
      paquete.position.y = alto / 2
      grupo.add(paquete)
      if (preset === 'selloToracico') {
        const circulo = mesh(THREE, new THREE.CylinderGeometry(0.28, 0.28, 0.03, 28), blanco)
        circulo.position.y = alto + 0.02
        grupo.add(circulo)
      }
      break
    }
    case 'rollo':
    case 'cintaCanalizar': {
      const rollo = mesh(THREE, new THREE.TorusGeometry(0.42, 0.18, 14, 30), color)
      rollo.rotation.x = Math.PI / 2
      rollo.position.y = 0.28
      grupo.add(rollo)
      break
    }
    case 'caja':
    case 'guantes':
    case 'cubrebocas':
    case 'farmacologia': {
      const ancho = preset === 'farmacologia' ? 1.15 : 1
      const cuerpo = caja(THREE, ancho, 0.45, 0.78, color, { roughness: 0.7 })
      cuerpo.position.y = 0.23
      grupo.add(cuerpo)
      if (preset === 'guantes') {
        const ranura = caja(THREE, 0.48, 0.03, 0.22, blanco)
        ranura.position.y = 0.47
        grupo.add(ranura)
      }
      if (preset === 'cubrebocas') {
        for (const z of [-0.18, 0, 0.18]) {
          const pliegue = caja(THREE, 0.72, 0.025, 0.035, blanco)
          pliegue.position.set(0, 0.47, z)
          grupo.add(pliegue)
        }
      }
      if (preset === 'farmacologia') {
        const cruz = etiquetaCruz(THREE)
        cruz.scale.setScalar(0.42)
        cruz.position.y = 0.48
        grupo.add(cruz)
      }
      break
    }
    case 'baumanometro': {
      const caratula = cilindro(THREE, 0.42, 0.18, '#e2e8f0', { metalness: 0.15 })
      caratula.rotation.x = Math.PI / 2
      caratula.position.set(-0.35, 0.42, 0)
      grupo.add(caratula)
      const cara = mesh(THREE, new THREE.CircleGeometry(0.31, 28), blanco)
      cara.position.set(-0.35, 0.42, 0.1)
      grupo.add(cara)
      const aguja = caja(THREE, 0.22, 0.025, 0.025, '#dc2626')
      aguja.position.set(-0.25, 0.43, 0.12)
      aguja.rotation.z = 0.7
      grupo.add(aguja)
      const pera = capsula(THREE, 0.23, 0.45, oscuro)
      pera.rotation.z = Math.PI / 2
      pera.position.set(0.35, 0.32, 0)
      grupo.add(pera)
      const brazalete = caja(THREE, 0.62, 0.18, 0.62, color)
      brazalete.position.set(0.1, 0.14, -0.45)
      grupo.add(brazalete)
      break
    }
    case 'estetoscopio': {
      const aro = mesh(THREE, new THREE.TorusGeometry(0.48, 0.055, 10, 36, Math.PI * 1.5), oscuro)
      aro.rotation.x = Math.PI / 2
      aro.rotation.z = Math.PI * 0.75
      aro.position.y = 0.55
      grupo.add(aro)
      for (const x of [-0.25, 0.25]) {
        const rama = cilindro(THREE, 0.035, 0.62, metal, { metalness: 0.7 })
        rama.rotation.z = x < 0 ? -0.32 : 0.32
        rama.position.set(x, 0.92, 0)
        grupo.add(rama)
        const oliva = capsula(THREE, 0.065, 0.16, oscuro)
        oliva.position.set(x * 1.32, 1.22, 0)
        grupo.add(oliva)
      }
      const campana = cilindro(THREE, 0.2, 0.1, metal, { metalness: 0.7 })
      campana.position.set(-0.34, 0.12, 0)
      grupo.add(campana)
      break
    }
    case 'cabestrillo': {
      const geometria = new THREE.BufferGeometry()
      geometria.setAttribute('position', new THREE.Float32BufferAttribute([
        -0.75, 0, 0, 0.75, 0, 0, 0, 1.05, 0,
      ], 3))
      geometria.computeVertexNormals()
      const tela = mesh(THREE, geometria, color, { side: THREE.DoubleSide, roughness: 0.9 })
      tela.rotation.x = -0.35
      grupo.add(tela)
      break
    }
    case 'ferula': {
      const ferula = caja(THREE, 0.46, 0.18, 1.5, color)
      ferula.position.y = 0.12
      ferula.rotation.y = 0.18
      grupo.add(ferula)
      break
    }
    case 'termometro':
    case 'lampara': {
      const cuerpo = capsula(THREE, preset === 'termometro' ? 0.09 : 0.12, 1.1, color)
      cuerpo.position.y = 0.18
      cuerpo.rotation.z = -0.12
      grupo.add(cuerpo)
      if (preset === 'termometro') {
        const pantalla = caja(THREE, 0.3, 0.04, 0.18, oscuro)
        pantalla.position.set(0.08, 0.22, 0.09)
        grupo.add(pantalla)
      }
      break
    }
    case 'jeringa':
    case 'cateteres': {
      const cuerpo = cilindro(THREE, 0.11, 0.9, '#dbeafe', { transparent: true, opacity: 0.72 })
      cuerpo.rotation.z = Math.PI / 2
      cuerpo.position.y = 0.2
      grupo.add(cuerpo)
      const embolo = cilindro(THREE, 0.055, 0.62, blanco)
      embolo.rotation.z = Math.PI / 2
      embolo.position.set(-0.58, 0.2, 0)
      grupo.add(embolo)
      const punta = cilindro(THREE, 0.025, 0.52, metal, { metalness: 0.5 })
      punta.rotation.z = Math.PI / 2
      punta.position.set(0.7, 0.2, 0)
      grupo.add(punta)
      if (preset === 'cateteres') {
        for (const z of [-0.23, 0.23]) {
          const copia = grupo.clone()
          copia.scale.setScalar(0.82)
          copia.position.z = z
          grupo.add(copia)
          break
        }
      }
      break
    }
    case 'canulas': {
      for (let i = 0; i < 4; i += 1) {
        const canula = tuboCurvo(THREE, ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6'][i], 0.72 + i * 0.08)
        canula.position.set(0, 0.12 + i * 0.11, (i - 1.5) * 0.12)
        grupo.add(canula)
      }
      break
    }
    case 'canulaNasal':
    case 'supraglotico': {
      const tubo = tuboCurvo(THREE, color, preset === 'supraglotico' ? 1 : 0.82)
      tubo.position.y = 0.18
      grupo.add(tubo)
      const extremo = mesh(
        THREE,
        new THREE.SphereGeometry(preset === 'supraglotico' ? 0.22 : 0.14, 18, 12),
        preset === 'supraglotico' ? '#c4b5fd' : color,
        { transparent: true, opacity: 0.82 },
      )
      extremo.scale.set(1.7, 0.65, 0.85)
      extremo.position.set(0.52, 0.2, 0)
      grupo.add(extremo)
      break
    }
    case 'mascarillaRcp': {
      const mascara = mesh(THREE, new THREE.ConeGeometry(0.52, 0.46, 24, 1, true), '#bae6fd', {
        transparent: true, opacity: 0.68, side: THREE.DoubleSide,
      })
      mascara.position.y = 0.24
      grupo.add(mascara)
      const valvula = cilindro(THREE, 0.13, 0.22, oscuro)
      valvula.position.y = 0.57
      grupo.add(valvula)
      break
    }
    case 'pinzaKelly':
    case 'tijera': {
      for (const giro of [-0.22, 0.22]) {
        const rama = cilindro(THREE, 0.035, 1.15, metal, { metalness: 0.8 })
        rama.rotation.z = Math.PI / 2 + giro
        rama.position.y = 0.15
        grupo.add(rama)
        const aro = mesh(THREE, new THREE.TorusGeometry(0.16, 0.035, 10, 22), metal, { metalness: 0.8 })
        aro.rotation.x = Math.PI / 2
        aro.position.set(giro < 0 ? -0.62 : 0.62, 0.15, giro < 0 ? -0.12 : 0.12)
        grupo.add(aro)
      }
      break
    }
    case 'manta': {
      const manta = caja(THREE, 1.05, 0.2, 0.75, color, { metalness: 0.62, roughness: 0.24 })
      manta.position.y = 0.12
      grupo.add(manta)
      break
    }
    case 'bvm': {
      const bolsa = mesh(THREE, new THREE.SphereGeometry(0.55, 24, 16), color, { transparent: true, opacity: 0.82 })
      bolsa.scale.set(0.82, 1.18, 0.82)
      bolsa.position.y = 0.65
      grupo.add(bolsa)
      const valvula = cilindro(THREE, 0.18, 0.34, oscuro)
      valvula.position.y = 1.27
      grupo.add(valvula)
      const mascara = mesh(THREE, new THREE.ConeGeometry(0.38, 0.38, 22, 1, true), '#bae6fd', {
        transparent: true, opacity: 0.6, side: THREE.DoubleSide,
      })
      mascara.position.y = 1.62
      grupo.add(mascara)
      break
    }
    case 'torniquete': {
      const banda = caja(THREE, 1.35, 0.12, 0.45, color)
      banda.position.y = 0.18
      banda.rotation.y = 0.12
      grupo.add(banda)
      const hebilla = caja(THREE, 0.28, 0.24, 0.5, oscuro)
      hebilla.position.set(-0.42, 0.32, 0)
      grupo.add(hebilla)
      const molinete = cilindro(THREE, 0.07, 0.68, oscuro)
      molinete.rotation.z = Math.PI / 2
      molinete.position.set(0.28, 0.42, 0)
      grupo.add(molinete)
      break
    }
    case 'normogotero': {
      const camara = capsula(THREE, 0.15, 0.48, '#dbeafe')
      camara.rotation.z = Math.PI / 2
      camara.position.y = 0.42
      grupo.add(camara)
      const curva = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.15, 0.2, 0),
        new THREE.Vector3(0.2, 0.1, 0.2),
        new THREE.Vector3(0.55, 0.22, -0.1),
        new THREE.Vector3(0.72, 0.08, 0),
      ])
      grupo.add(mesh(THREE, new THREE.TubeGeometry(curva, 30, 0.025, 8, false), '#e0f2fe'))
      break
    }
    default: {
      const cuerpo = caja(THREE, 0.92, 0.52, 0.72, color)
      cuerpo.position.y = 0.27
      grupo.add(cuerpo)
    }
  }

  return grupo
}

function spriteTexto(THREE, texto, color, texturas) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 112
  const contexto = canvas.getContext('2d')
  contexto.clearRect(0, 0, canvas.width, canvas.height)
  contexto.fillStyle = 'rgba(10, 18, 30, 0.78)'
  contexto.roundRect?.(4, 4, 504, 104, 22)
  contexto.fill()
  contexto.fillStyle = color
  contexto.font = '700 38px Arial, sans-serif'
  contexto.textAlign = 'center'
  contexto.textBaseline = 'middle'
  contexto.fillText(texto, 256, 57, 470)
  const textura = new THREE.CanvasTexture(canvas)
  textura.colorSpace = THREE.SRGBColorSpace
  textura.needsUpdate = true
  texturas.push(textura)
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: textura, transparent: true, depthWrite: false }))
  sprite.scale.set(2.15, 0.47, 1)
  return sprite
}

function aplicarEstado(THREE, raiz, acceso) {
  const bloqueado = acceso?.estado === 'bloqueado' || acceso?.estado === 'proximo'
  const silueta = acceso?.estado === 'silueta'
  raiz.traverse((objeto) => {
    if (!objeto.isMesh || !objeto.material) return
    const materiales = Array.isArray(objeto.material) ? objeto.material : [objeto.material]
    for (const mat of materiales) {
      mat.userData.colorOriginal = mat.color?.clone?.()
      mat.userData.opacityOriginal = mat.opacity
      if (bloqueado || silueta) {
        mat.color?.set(silueta ? '#111827' : '#64748b')
        mat.transparent = true
        mat.opacity = silueta ? 0.28 : 0.42
        mat.depthWrite = false
      }
    }
  })
}

function disponerEscena(escena, texturas) {
  escena.traverse((objeto) => {
    objeto.geometry?.dispose?.()
    const materiales = Array.isArray(objeto.material) ? objeto.material : [objeto.material]
    for (const mat of materiales) {
      if (!mat) continue
      mat.map?.dispose?.()
      mat.dispose?.()
    }
  })
  for (const textura of texturas) textura.dispose?.()
}

export default function BotiquinScene({
  catalogo,
  estados,
  selectedId,
  compartimento = 'todos',
  autoRotate = false,
  resetToken = 0,
  onSelect,
  onReady,
  onError,
}) {
  const hostRef = useRef(null)
  const controlsRef = useRef(null)
  const cameraRef = useRef(null)
  const rootsRef = useRef(new Map())
  const onSelectRef = useRef(onSelect)
  const onReadyRef = useRef(onReady)
  const onErrorRef = useRef(onError)

  useEffect(() => { onSelectRef.current = onSelect }, [onSelect])
  useEffect(() => { onReadyRef.current = onReady }, [onReady])
  useEffect(() => { onErrorRef.current = onError }, [onError])

  useEffect(() => {
    let activo = true
    let frame = 0
    let observer = null
    let limpiar = () => {}

    ;(async () => {
      try {
        const THREE = await loadThree()
        if (!activo || !hostRef.current) return
        const host = hostRef.current
        const escena = new THREE.Scene()
        escena.fog = new THREE.FogExp2(0x111827, 0.025)
        const camara = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
        camara.position.set(9.2, 7.1, 11.6)
        cameraRef.current = camara

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8))
        renderer.setClearColor(0x000000, 0)
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        renderer.domElement.className = 'botiquin3d-canvas'
        renderer.domElement.setAttribute('aria-label', 'Botiquín tridimensional interactivo')
        host.replaceChildren(renderer.domElement)

        const controles = new SimpleOrbitControls(THREE, camara, renderer.domElement)
        controles.target.set(0, 0, 0)
        controles.minDistance = 7
        controles.maxDistance = 24
        controles.autoRotateSpeed = 0.22
        controles.syncFromCamera()
        controlsRef.current = controles

        const ambiental = new THREE.HemisphereLight(0xdbeafe, 0x111827, 2.3)
        escena.add(ambiental)
        const principal = new THREE.DirectionalLight(0xffffff, 3.2)
        principal.position.set(6, 10, 8)
        principal.castShadow = true
        principal.shadow.mapSize.set(1024, 1024)
        principal.shadow.camera.left = -12
        principal.shadow.camera.right = 12
        principal.shadow.camera.top = 10
        principal.shadow.camera.bottom = -10
        escena.add(principal)
        const relleno = new THREE.PointLight(0x38bdf8, 14, 30)
        relleno.position.set(-7, 3, 5)
        escena.add(relleno)

        const suelo = mesh(THREE, new THREE.PlaneGeometry(34, 26), '#0b1220', { roughness: 0.95 })
        suelo.rotation.x = -Math.PI / 2
        suelo.position.y = -1.02
        suelo.receiveShadow = true
        suelo.castShadow = false
        escena.add(suelo)

        const botiquin = new THREE.Group()
        botiquin.rotation.x = -0.06
        escena.add(botiquin)

        const rojo = '#c91f37'
        const rojoOscuro = '#7f1224'
        const base = caja(THREE, 12.4, 0.68, 7.65, rojo, { roughness: 0.58 })
        base.position.y = -0.7
        botiquin.add(base)
        const interior = caja(THREE, 11.75, 0.18, 7.05, '#182235', { roughness: 0.86 })
        interior.position.y = -0.25
        botiquin.add(interior)
        const paredes = [
          [12.4, 0.72, 0.28, 0, -0.15, -3.72],
          [12.4, 0.72, 0.28, 0, -0.15, 3.72],
          [0.28, 0.72, 7.2, -6.06, -0.15, 0],
          [0.28, 0.72, 7.2, 6.06, -0.15, 0],
        ]
        for (const [w, h, d, x, y, z] of paredes) {
          const pared = caja(THREE, w, h, d, rojoOscuro)
          pared.position.set(x, y, z)
          botiquin.add(pared)
        }
        const asa = mesh(THREE, new THREE.TorusGeometry(1.12, 0.16, 14, 32, Math.PI), rojoOscuro)
        asa.rotation.x = Math.PI / 2
        asa.rotation.z = Math.PI
        asa.position.set(0, -0.45, 4.15)
        botiquin.add(asa)

        const tapa = new THREE.Group()
        const tapaCuerpo = caja(THREE, 12.1, 0.34, 6.6, rojo, { roughness: 0.58 })
        tapaCuerpo.position.y = 0
        tapa.add(tapaCuerpo)
        const panelTapa = caja(THREE, 11.45, 0.08, 5.95, '#111827', { roughness: 0.86 })
        panelTapa.position.y = 0.22
        tapa.add(panelTapa)
        const cruz = etiquetaCruz(THREE)
        cruz.scale.setScalar(1.16)
        cruz.position.y = 0.31
        tapa.add(cruz)
        tapa.position.set(0, 2.68, -5.55)
        tapa.rotation.x = -0.92
        botiquin.add(tapa)

        const texturas = []
        const roots = new Map()
        const pickables = []
        const porCompartimento = Object.fromEntries(COMPARTIMENTOS_BOTIQUIN.map((c) => [c.id, []]))
        for (const item of catalogo) porCompartimento[item.compartimento]?.push(item)

        for (const comp of COMPARTIMENTOS_BOTIQUIN) {
          const posicion = POSICIONES[comp.id]
          const grupoComp = new THREE.Group()
          grupoComp.position.set(posicion.x, 0, posicion.z)
          grupoComp.visible = compartimento === 'todos' || compartimento === comp.id
          botiquin.add(grupoComp)

          const piso = caja(THREE, 2.62, 0.11, 2.62, comp.color, { transparent: true, opacity: 0.18 })
          piso.position.y = -0.08
          piso.receiveShadow = true
          grupoComp.add(piso)
          const bordeGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(2.66, 0.18, 2.66))
          const borde = new THREE.LineSegments(bordeGeo, new THREE.LineBasicMaterial({
            color: colorSeguro(THREE, comp.color), transparent: true, opacity: 0.58,
          }))
          borde.position.y = -0.02
          grupoComp.add(borde)
          const label = spriteTexto(THREE, comp.corto.toUpperCase(), comp.color, texturas)
          label.position.set(0, 0.14, -1.08)
          label.scale.multiplyScalar(0.7)
          grupoComp.add(label)

          const items = porCompartimento[comp.id]
          const columnas = Math.max(2, Math.ceil(Math.sqrt(items.length)))
          const filas = Math.ceil(items.length / columnas)
          const pasoX = columnas > 1 ? 1.9 / (columnas - 1) : 0
          const pasoZ = filas > 1 ? 1.75 / (filas - 1) : 0
          const escalaBase = items.length >= 8 ? 0.34 : items.length >= 5 ? 0.42 : 0.5

          items.forEach((item, indice) => {
            const raiz = crearObjeto(THREE, item)
            raiz.userData.itemId = item.id
            raiz.userData.phase = indice * 0.73 + COMPARTIMENTOS_BOTIQUIN.indexOf(comp)
            raiz.userData.baseScale = escalaBase * (item.visual?.escala || 1)
            raiz.scale.setScalar(raiz.userData.baseScale)
            const columna = indice % columnas
            const fila = Math.floor(indice / columnas)
            raiz.position.x = -0.95 + columna * pasoX
            raiz.position.z = -0.78 + fila * pasoZ
            raiz.updateMatrixWorld(true)
            const bounds = new THREE.Box3().setFromObject(raiz)
            raiz.position.y += 0.08 - bounds.min.y
            raiz.userData.baseY = raiz.position.y
            raiz.traverse((objeto) => {
              if (objeto.isMesh) {
                objeto.userData.itemId = item.id
                pickables.push(objeto)
              }
            })
            aplicarEstado(THREE, raiz, estados[item.id])
            grupoComp.add(raiz)
            roots.set(item.id, raiz)
          })
        }
        rootsRef.current = roots

        const aplicarSeleccion = (id, hovered = null) => {
          roots.forEach((raiz, itemId) => {
            const factor = itemId === id ? 1.24 : itemId === hovered ? 1.1 : 1
            raiz.scale.setScalar(raiz.userData.baseScale * factor)
          })
        }
        aplicarSeleccion(selectedId)

        const raycaster = new THREE.Raycaster()
        const puntero = new THREE.Vector2()
        const tap = new PointerTap()
        let hovered = null
        const proyectar = (evento) => {
          const rect = renderer.domElement.getBoundingClientRect()
          puntero.x = ((evento.clientX - rect.left) / rect.width) * 2 - 1
          puntero.y = -((evento.clientY - rect.top) / rect.height) * 2 + 1
          raycaster.setFromCamera(puntero, camara)
          return raycaster.intersectObjects(pickables, false)[0]?.object?.userData?.itemId || null
        }
        const pointerDown = (evento) => tap.down(evento.pointerId, evento.clientX, evento.clientY, evento.pointerType === 'touch' ? 12 : 6)
        const pointerMove = (evento) => {
          tap.move(evento.pointerId, evento.clientX, evento.clientY)
          const siguiente = proyectar(evento)
          if (siguiente !== hovered) {
            hovered = siguiente
            renderer.domElement.style.cursor = hovered ? 'pointer' : 'grab'
            aplicarSeleccion(selectedId, hovered)
          }
        }
        const pointerUp = (evento) => {
          if (!tap.up(evento.pointerId, evento.clientX, evento.clientY)) return
          const id = proyectar(evento)
          if (id) onSelectRef.current?.(id)
        }
        const pointerCancel = (evento) => tap.cancel(evento.pointerId)
        renderer.domElement.addEventListener('pointerdown', pointerDown)
        renderer.domElement.addEventListener('pointermove', pointerMove)
        renderer.domElement.addEventListener('pointerup', pointerUp)
        renderer.domElement.addEventListener('pointercancel', pointerCancel)

        const restablecer = () => {
          camara.position.set(9.2, 7.1, 11.6)
          controles.target.set(0, 0, 0)
          controles.syncFromCamera()
        }
        controlsRef.current.reset = restablecer
        controlsRef.current.autoRotate = autoRotate

        const resize = () => {
          const ancho = Math.max(1, host.clientWidth)
          const alto = Math.max(1, host.clientHeight)
          camara.aspect = ancho / alto
          camara.updateProjectionMatrix()
          renderer.setSize(ancho, alto, false)
        }
        observer = new ResizeObserver(resize)
        observer.observe(host)
        resize()

        const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        let previo = performance.now()
        const animar = (ahora) => {
          if (!activo) return
          const delta = Math.min((ahora - previo) / 1000, 0.05)
          previo = ahora
          controles.update(delta)
          if (!reduced) {
            roots.forEach((raiz) => {
              raiz.position.y = raiz.userData.baseY + Math.sin(ahora * 0.00125 + raiz.userData.phase) * 0.035
            })
          }
          renderer.render(escena, camara)
          frame = requestAnimationFrame(animar)
        }
        frame = requestAnimationFrame(animar)
        onReadyRef.current?.()

        limpiar = () => {
          cancelAnimationFrame(frame)
          observer?.disconnect()
          renderer.domElement.removeEventListener('pointerdown', pointerDown)
          renderer.domElement.removeEventListener('pointermove', pointerMove)
          renderer.domElement.removeEventListener('pointerup', pointerUp)
          renderer.domElement.removeEventListener('pointercancel', pointerCancel)
          controles.dispose()
          disponerEscena(escena, texturas)
          renderer.dispose()
          renderer.forceContextLoss?.()
          if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement)
          rootsRef.current = new Map()
          controlsRef.current = null
          cameraRef.current = null
        }
      } catch (error) {
        if (activo) onErrorRef.current?.(
          error instanceof Error ? error.message : 'No se pudo iniciar la escena tridimensional.',
        )
      }
    })()

    return () => {
      activo = false
      limpiar()
    }
  }, [catalogo, estados, compartimento])

  useEffect(() => {
    controlsRef.current && (controlsRef.current.autoRotate = autoRotate)
  }, [autoRotate])

  useEffect(() => {
    controlsRef.current?.reset?.()
  }, [resetToken])

  useEffect(() => {
    rootsRef.current.forEach((raiz, id) => {
      raiz.scale.setScalar(raiz.userData.baseScale * (id === selectedId ? 1.24 : 1))
    })
  }, [selectedId])

  return <div ref={hostRef} className="botiquin3d-scene" aria-busy="false" />
}
