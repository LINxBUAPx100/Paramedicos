import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { FARMACOS } from '../data/farmacos/catalogo.js'
import { indiceInverso } from '../lib/farmacosModelo.js'
import '../styles/farmacos.css'

// Tira «Fármacos de este tema» al pie de la lección (PLAN-LMS §27.2).
// El enlace se DERIVA del catálogo: ninguna lección se edita para tenerlo.
const POR_TEMA = indiceInverso(FARMACOS)

export default function FarmacosDelTema({ temaId }) {
  const { capacidades, esSuperadmin } = useAuth()
  const lista = POR_TEMA[temaId]
  if (!lista?.length) return null
  if (!esSuperadmin && !capacidades?.entrenadorFarmacologia) return null
  return (
    <section className="farm-tira" aria-label="Fármacos de este tema">
      <h2 className="seccion-titulo"><Icon name="pildora" size={20} /> Fármacos de este tema</h2>
      <ul>
        {lista.map((f) => (
          <li key={f.id}><Link to={`/farmacos/${f.id}`}>{f.nombre}</Link></li>
        ))}
      </ul>
    </section>
  )
}
