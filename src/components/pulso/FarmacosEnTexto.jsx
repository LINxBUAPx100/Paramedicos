import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

// Fármacos marcados DENTRO de la lectura (PTEM Pulso, entrega 2 del
// entrenador). TemaPage envuelve la lección con <ProveedorFarmacosEnLeccion>;
// TextoGlosario pregunta al contexto qué fármacos buscar en cada párrafo.
//
//  · Solo con el entrenador en el plan (mismas puertas que FarmacosDelTema).
//  · Solo los fármacos que el catálogo liga a ESTA lección.
//  · El catálogo se pide al abrir la lección, no viaja en el paquete de la
//    página: mientras llega, el texto se pinta tal cual.
const Contexto = createContext(null)

export function useFarmacosEnLeccion() {
  return useContext(Contexto)
}

export function ProveedorFarmacosEnLeccion({ temaId, children }) {
  const { capacidades, esSuperadmin } = useAuth()
  const puede = esSuperadmin || Boolean(capacidades?.entrenadorFarmacologia)
  const [datos, setDatos] = useState(null)
  useEffect(() => {
    if (!puede || !temaId) { setDatos(null); return undefined }
    let vivo = true
    Promise.all([import('../../data/farmacos/catalogo.js'), import('../../lib/farmacosModelo.js')])
      .then(([cat, mod]) => {
        if (!vivo) return
        const lista = mod.indiceInverso(cat.FARMACOS)[temaId] || []
        setDatos(lista.length ? { lista, etiqueta: mod.ETIQUETA_ORIGEN, casilla: mod.casillaDe } : null)
      })
      .catch(() => { if (vivo) setDatos(null) })
    return () => { vivo = false }
  }, [puede, temaId])
  return <Contexto.Provider value={datos}>{children}</Contexto.Provider>
}

// La palabra marcada y su globo con la ficha corta.
export function ChipFarmaco({ f, texto, etiqueta, casilla }) {
  const [abierto, setAbierto] = useState(false)
  const caja = useRef(null)
  useEffect(() => {
    if (!abierto) return undefined
    const fuera = (e) => { if (!caja.current?.contains(e.target)) setAbierto(false) }
    const tecla = (e) => { if (e.key === 'Escape') setAbierto(false) }
    document.addEventListener('pointerdown', fuera)
    document.addEventListener('keydown', tecla)
    return () => { document.removeEventListener('pointerdown', fuera); document.removeEventListener('keydown', tecla) }
  }, [abierto])
  return (
    <span className="fr-chip-caja" ref={caja}>
      <button type="button" className="fr-chip" aria-expanded={abierto} onClick={() => setAbierto((v) => !v)} title={`Ficha de ${f.nombre}`}>
        {texto}
      </button>
      {abierto && (
        <span className="fr-globo" role="dialog" aria-label={`Ficha corta de ${f.nombre}`}>
          <b className="fr-globo-titulo">{f.nombre}</b>
          <span className="fr-globo-insignias"><span>{f.grupo}</span><span>{etiqueta?.[casilla?.(f)]}</span></span>
          <span>{f.uso}</span>
          <span className="fr-globo-prec"><b>Precaución:</b> {f.precaucion}</span>
          <span className="fr-globo-acciones">
            <Link className="btn btn--turno btn--sm" to={`/farmacos?modo=tarjetas&farmaco=${f.id}`}>Repasar sus tarjetas</Link>
            <Link className="btn btn--sm fr-globo-ficha" to={`/farmacos/${f.id}`}>Ver ficha</Link>
          </span>
          <span className="fr-globo-aviso">Material de estudio: dosis y vía según el protocolo de tu servicio.</span>
        </span>
      )}
    </span>
  )
}
