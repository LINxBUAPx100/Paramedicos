export class SimpleOrbitControls {
  constructor(THREE, camera, domElement, onChange = () => {}) {
    this.THREE = THREE
    this.camera = camera
    this.domElement = domElement
    this.onChange = onChange
    this.target = new THREE.Vector3()
    this.spherical = new THREE.Spherical()
    this.minDistance = 0.07
    this.maxDistance = 40
    this.enableRotate = true
    this.panMode = false
    this.autoRotate = false
    this.autoRotateSpeed = 0.42
    this.pointers = new Map()
    this.pinch = null
    this.disposed = false

    this._offset = new THREE.Vector3()
    this._right = new THREE.Vector3()
    this._up = new THREE.Vector3()

    this._onPointerDown = this._onPointerDown.bind(this)
    this._onPointerMove = this._onPointerMove.bind(this)
    this._onPointerUp = this._onPointerUp.bind(this)
    this._onWheel = this._onWheel.bind(this)
    this._onContextMenu = (event) => event.preventDefault()

    domElement.style.touchAction = 'none'
    domElement.addEventListener('pointerdown', this._onPointerDown)
    domElement.addEventListener('pointermove', this._onPointerMove)
    domElement.addEventListener('pointerup', this._onPointerUp)
    domElement.addEventListener('pointercancel', this._onPointerUp)
    domElement.addEventListener('wheel', this._onWheel, { passive: false })
    domElement.addEventListener('contextmenu', this._onContextMenu)
  }

  syncFromCamera() {
    this._offset.copy(this.camera.position).sub(this.target)
    this.spherical.setFromVector3(this._offset)
    this.spherical.radius = Math.max(
      this.minDistance,
      Math.min(this.maxDistance, this.spherical.radius || 1),
    )
    this.spherical.makeSafe()
    this.camera.lookAt(this.target)
    this.camera.updateMatrixWorld()
  }

  _apply() {
    this.spherical.radius = Math.max(
      this.minDistance,
      Math.min(this.maxDistance, this.spherical.radius),
    )
    this.spherical.phi = Math.max(0.04, Math.min(Math.PI * 0.96, this.spherical.phi))
    this.spherical.makeSafe()
    this._offset.setFromSpherical(this.spherical)
    this.camera.position.copy(this.target).add(this._offset)
    this.camera.lookAt(this.target)
    this.camera.updateMatrixWorld()
    this.onChange()
  }

  _pan(deltaX, deltaY) {
    const height = Math.max(1, this.domElement.clientHeight)
    const scale = (
      2 * this.spherical.radius
      * Math.tan(this.THREE.MathUtils.degToRad(this.camera.fov / 2))
    ) / height

    this._right.set(1, 0, 0).applyQuaternion(this.camera.quaternion)
    this._up.set(0, 1, 0).applyQuaternion(this.camera.quaternion)
    this.target.addScaledVector(this._right, -deltaX * scale)
    this.target.addScaledVector(this._up, deltaY * scale)
  }

  _zoom(factor) {
    this.spherical.radius *= factor
    this._apply()
  }

  _onPointerDown(event) {
    if (this.disposed) return
    this.domElement.setPointerCapture?.(event.pointerId)
    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })
    if (this.pointers.size >= 2) this._resetPinch()
  }

  _resetPinch() {
    const [a, b] = [...this.pointers.values()]
    if (!a || !b) {
      this.pinch = null
      return
    }
    this.pinch = {
      distance: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)),
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2,
    }
  }

  _onPointerMove(event) {
    const previous = this.pointers.get(event.pointerId)
    if (!previous) return

    this.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (this.pointers.size >= 2) {
      const [a, b] = [...this.pointers.values()]
      const next = {
        distance: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)),
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2,
      }
      if (this.pinch) {
        this.spherical.radius *= this.pinch.distance / next.distance
        this._pan(next.x - this.pinch.x, next.y - this.pinch.y)
        this._apply()
      }
      this.pinch = next
      return
    }

    const deltaX = event.clientX - previous.x
    const deltaY = event.clientY - previous.y
    if (this.enableRotate && !this.panMode && event.button !== 2) {
      this.spherical.theta -= deltaX * 0.005
      this.spherical.phi -= deltaY * 0.005
    } else {
      this._pan(deltaX, deltaY)
    }
    this._apply()
  }

  _onPointerUp(event) {
    this.pointers.delete(event.pointerId)
    try { this.domElement.releasePointerCapture?.(event.pointerId) } catch { /* nada */ }
    if (this.pointers.size >= 2) this._resetPinch()
    else this.pinch = null
  }

  _onWheel(event) {
    event.preventDefault()
    this._zoom(Math.exp(event.deltaY * 0.0012))
  }

  update(deltaSeconds = 0) {
    if (!this.autoRotate || this.pointers.size > 0) return false
    this.spherical.theta -= this.autoRotateSpeed * Math.min(deltaSeconds, 0.05)
    this._apply()
    return true
  }

  dispose() {
    this.disposed = true
    this.pointers.clear()
    this.domElement.removeEventListener('pointerdown', this._onPointerDown)
    this.domElement.removeEventListener('pointermove', this._onPointerMove)
    this.domElement.removeEventListener('pointerup', this._onPointerUp)
    this.domElement.removeEventListener('pointercancel', this._onPointerUp)
    this.domElement.removeEventListener('wheel', this._onWheel)
    this.domElement.removeEventListener('contextmenu', this._onContextMenu)
  }
}
