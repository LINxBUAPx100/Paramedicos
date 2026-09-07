/** Distingue un toque de una rotación, paneo, pellizco o secuencia cancelada. */
export class PointerTap {
  constructor() {
    this.active = new Map()
    this.blocked = false
  }

  down(id, x, y, threshold) {
    if (this.active.size === 0) this.blocked = false
    this.active.set(id, { x, y, threshold })
    if (this.active.size > 1) this.blocked = true
  }

  move(id, x, y) {
    const start = this.active.get(id)
    if (start && Math.hypot(x - start.x, y - start.y) > start.threshold) {
      this.blocked = true
    }
  }

  up(id, x, y) {
    this.move(id, x, y)
    const isTap = this.active.has(id) && this.active.size === 1 && !this.blocked
    this.active.delete(id)
    return isTap
  }

  cancel(id) {
    this.active.delete(id)
    this.blocked = true
  }
}
