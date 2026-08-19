import { Fragment, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { partirTexto } from '../lib/glosario.js'
import { useGlosario } from '../lib/useGlosario.js'

// ============================================================
//  Texto de una lección con sus tecnicismos enlazados al glosario
// ------------------------------------------------------------
//  Cada término que el temario define en algún `conceptoClave` queda subrayado
//  aquí y lleva a su ficha en /logros, ya desplazada a esa palabra exacta.
//
//  Se marcan TODAS las apariciones. La alternativa —marcar solo la primera vez
//  que el término sale en la lección— exigía un contador compartido entre
//  bloques, y eso ata el resultado al ORDEN en que React renderiza: si un
//  bloque se vuelve a pintar por su cuenta, encuentra el término «ya marcado» y
//  lo deja sin enlazar. Se midió sobre el temario real antes de decidir: marcar
//  todo son 8,0 subrayados por tema y marcar solo el primero, 5,9. La prosa casi
//  no repite el término exacto, así que el contador no compraba legibilidad y sí
//  traía un fallo dependiente del orden. Sin estado no hay tal fallo.
// ============================================================
export default function TextoGlosario({ texto }) {
  const glosario = useGlosario()
  const segmentos = useMemo(
    () => partirTexto(texto, glosario, { regex: glosario.regex }),
    [texto, glosario]
  )

  return segmentos.map((s, i) =>
    s.entrada ? (
      <Link
        key={i}
        to={`/logros?t=${s.entrada.slug}`}
        className="glosario-termino"
        title={`Ver «${s.entrada.termino}» en el glosario`}
      >
        {s.texto}
      </Link>
    ) : (
      <Fragment key={i}>{s.texto}</Fragment>
    )
  )
}
