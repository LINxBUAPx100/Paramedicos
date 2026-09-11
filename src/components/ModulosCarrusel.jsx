import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

// El padre entrega únicamente los módulos autorizados para el grupo.
// Conservamos el nombre del componente para migrar sus consumidores juntos.
export default function ModulosCarrusel({ modulos, leidos = {} }) {
  const [consulta, setConsulta] = useState('')
  const normalizar = (texto) => String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  const visibles = modulos.filter((m) => normalizar(`${m.titulo} ${m.subtitulo}`).includes(normalizar(consulta)))
  return (
    <div className="ui-modulos ph-wrap">
      <label className="ui-campo">Encontrar un módulo
        <input type="search" value={consulta} onChange={(e) => setConsulta(e.target.value)} placeholder="Nombre o especialidad" />
      </label>
      <p className="ui-modulos-conteo" role="status">{visibles.length} de {modulos.length} módulos</p>
      <div className="ui-modulos-lista">
        {visibles.map((modulo) => {
          const total = modulo.temas.length
          const completados = modulo.temas.filter((t) => leidos[t.id]).length
          return (
            <article key={modulo.id} className="ui-modulo" style={{ '--modulo-color': modulo.color }}>
              <span className="ui-modulo-num" aria-hidden="true">{String(modulo.numero).padStart(2, '0')}</span>
              <div className="ui-modulo-texto">
                <span className="ui-antetitulo">Módulo {modulo.numero} · {total} temas</span>
                <h3><Link to={`/modulo/${modulo.id}`}>{modulo.titulo}</Link></h3>
                <p>{modulo.subtitulo || modulo.descripcion}</p>
                <label className="ui-modulo-progreso">{completados} de {total} temas leídos
                  <progress value={completados} max={total || 1} />
                </label>
              </div>
              <Link to={`/modulo/${modulo.id}`} className="btn btn--suave" aria-label={`Entrar al módulo ${modulo.numero}`}>Estudiar <Icon name="chevronDer" size={17} /></Link>
            </article>
          )
        })}
      </div>
      {visibles.length === 0 && <p className="ui-estado">{modulos.length ? 'No hay módulos que coincidan. Prueba con otro nombre.' : 'Todavía no hay módulos disponibles para tu grupo.'}</p>}
    </div>
  )
}
