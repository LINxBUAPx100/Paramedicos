import { Fragment, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { partirTexto } from '../lib/glosario.js'
import { useGlosario } from '../lib/useGlosario.js'
import { partirPorFarmacos } from '../lib/rutaFarmacos.js'
import { useFarmacosEnLeccion, ChipFarmaco } from './pulso/FarmacosEnTexto.jsx'

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
  // PTEM Pulso: los fármacos de ESTA lección, si el plan incluye el
  // entrenador. Se buscan en los tramos que el glosario dejó sin enlazar: un
  // término del glosario nunca se convierte en ficha de fármaco.
  const farmacos = useFarmacosEnLeccion()
  const segmentos = useMemo(() => {
    const base = partirTexto(texto, glosario, { regex: glosario.regex })
    if (!farmacos?.lista?.length) return base
    return base.flatMap((s) => (s.entrada ? [s] : partirPorFarmacos(s.texto, farmacos.lista)))
  }, [texto, glosario, farmacos])

  return segmentos.map((s, i) =>
    s.farmaco ? (
      <ChipFarmaco key={i} f={s.farmaco} texto={s.texto} etiqueta={farmacos.etiqueta} casilla={farmacos.casilla} />
    ) : s.entrada ? (
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
