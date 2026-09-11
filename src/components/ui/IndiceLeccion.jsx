import { useRef } from 'react'

export default function IndiceLeccion({ secciones = [] }) {
  const indice = useRef(null)
  if (!secciones.length) return null
  const ir = (i) => {
    const destino = document.getElementById(`leccion-seccion-${i}`)
    if (!destino) return
    if (indice.current) indice.current.open = false
    destino.focus({ preventScroll: true })
    destino.scrollIntoView({ block: 'start', behavior: 'auto' })
  }
  return <details className="ui-indice" ref={indice}>
    <summary>En esta lección · {secciones.length} secciones</summary>
    <ol>{secciones.map((s, i) => <li key={i}><button type="button" onClick={() => ir(i)}>{s.titulo}</button></li>)}</ol>
  </details>
}
