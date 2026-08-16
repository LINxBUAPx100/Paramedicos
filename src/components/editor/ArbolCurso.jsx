import { useState } from 'react'
import Icon from '../Icon.jsx'
import { ETIQUETA_ESTADO } from '../../lib/editorModelo.js'

// Chip de estado: texto + color (nunca solo color).
export function ChipEstado({ estado = 'publicado' }) {
  return (
    <span className={`editor-chip editor-chip--${estado}`}>
      {ETIQUETA_ESTADO[estado] || estado}
    </span>
  )
}

function mismaRef(a, b) {
  return !!a && !!b
    && a.moduloId === b.moduloId
    && (a.unidadId || null) === (b.unidadId || null)
    && (a.temaId || null) === (b.temaId || null)
}

// Árbol jerárquico Curso → Módulo → Unidad → Tema.
//  - Navegable 100 % con teclado (botones nativos: Tab + Enter).
//  - Expandir/contraer con aria-expanded; nodo activo con aria-current.
//  - Los estados se muestran con texto (chip), no solo con color.
//  - Solo re-renderiza con cambios de estructura/selección (sin listeners).
export default function ArbolCurso({ estructura, seleccion, onSeleccionar, onCrearHijo, puedeCrear = true, mostrarArchivados = true }) {
  // Modulos/unidades expandidos (por id). Por defecto: primer módulo abierta.
  const [abiertos, setAbiertos] = useState(() => new Set(estructura[0] ? [estructura[0].id] : []))
  const alternar = (id) => {
    setAbiertos((prev) => {
      const s = new Set(prev)
      if (s.has(id)) s.delete(id)
      else s.add(id)
      return s
    })
  }

  const visible = (nodo) => mostrarArchivados || nodo.estado !== 'archivado'

  return (
    <nav className="editor-arbol" aria-label="Estructura del curso">
      {estructura.length === 0 && (
        <p className="editor-vacio">
          Este curso todavía no tiene modulos. Crea la primera para empezar a armar tu temario.
        </p>
      )}
      <ul className="editor-arbol-lista">
        {estructura.filter(visible).map((modulo) => {
          const moduloAbierta = abiertos.has(modulo.id)
          const refModulo = { moduloId: modulo.id }
          return (
            <li key={modulo.id} className={modulo.estado === 'archivado' ? 'editor-nodo--archivado' : ''}>
              <div className={`editor-nodo ${mismaRef(seleccion, refModulo) ? 'editor-nodo--activo' : ''}`}>
                <button
                  type="button"
                  className="editor-expandir"
                  aria-expanded={moduloAbierta}
                  aria-label={`${moduloAbierta ? 'Contraer' : 'Expandir'} el módulo ${modulo.titulo}`}
                  onClick={() => alternar(modulo.id)}
                >
                  <Icon name={moduloAbierta ? 'chevronAbajo' : 'chevronDer'} size={16} />
                </button>
                <button
                  type="button"
                  className="editor-nombre"
                  aria-current={mismaRef(seleccion, refModulo) ? 'true' : undefined}
                  onClick={() => onSeleccionar(refModulo)}
                >
                  <Icon name="capas" size={16} />
                  <span>{modulo.titulo}</span>
                </button>
                <ChipEstado estado={modulo.estado || 'publicado'} />
              </div>
              {moduloAbierta && (
                <ul className="editor-arbol-lista editor-arbol-lista--hijos">
                  {(modulo.unidades || []).filter(visible).map((unidad) => {
                    const idUnidad = `${modulo.id}/${unidad.id}`
                    const unidadAbierto = abiertos.has(idUnidad)
                    const refUnidad = { moduloId: modulo.id, unidadId: unidad.id }
                    return (
                      <li key={unidad.id} className={unidad.estado === 'archivado' ? 'editor-nodo--archivado' : ''}>
                        <div className={`editor-nodo ${mismaRef(seleccion, refUnidad) ? 'editor-nodo--activo' : ''}`}>
                          <button
                            type="button"
                            className="editor-expandir"
                            aria-expanded={unidadAbierto}
                            aria-label={`${unidadAbierto ? 'Contraer' : 'Expandir'} la unidad ${unidad.titulo}`}
                            onClick={() => alternar(idUnidad)}
                          >
                            <Icon name={unidadAbierto ? 'chevronAbajo' : 'chevronDer'} size={16} />
                          </button>
                          <button
                            type="button"
                            className="editor-nombre"
                            aria-current={mismaRef(seleccion, refUnidad) ? 'true' : undefined}
                            onClick={() => onSeleccionar(refUnidad)}
                          >
                            <Icon name="carpeta" size={16} />
                            <span>{unidad.titulo}</span>
                          </button>
                          <ChipEstado estado={unidad.estado || 'publicado'} />
                        </div>
                        {unidadAbierto && (
                          <ul className="editor-arbol-lista editor-arbol-lista--hijos">
                            {(unidad.temas || []).filter(visible).map((tema) => {
                              const refTema = { moduloId: modulo.id, unidadId: unidad.id, temaId: tema.id }
                              return (
                                <li key={tema.id} className={tema.estado === 'archivado' ? 'editor-nodo--archivado' : ''}>
                                  <div className={`editor-nodo editor-nodo--hoja ${mismaRef(seleccion, refTema) ? 'editor-nodo--activo' : ''}`}>
                                    <button
                                      type="button"
                                      className="editor-nombre"
                                      aria-current={mismaRef(seleccion, refTema) ? 'true' : undefined}
                                      onClick={() => onSeleccionar(refTema)}
                                    >
                                      <Icon name="libro" size={16} />
                                      <span>{tema.titulo}</span>
                                    </button>
                                    <ChipEstado estado={tema.estado || 'publicado'} />
                                  </div>
                                </li>
                              )
                            })}
                            {puedeCrear && (
                              <li>
                                <button
                                  type="button"
                                  className="editor-crear-hijo"
                                  onClick={() => onCrearHijo({ tipo: 'tema', moduloId: modulo.id, unidadId: unidad.id })}
                                >
                                  <Icon name="mas" size={14} /> Nuevo tema en “{unidad.titulo}”
                                </button>
                              </li>
                            )}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                  {puedeCrear && (
                    <li>
                      <button
                        type="button"
                        className="editor-crear-hijo"
                        onClick={() => onCrearHijo({ tipo: 'unidad', moduloId: modulo.id })}
                      >
                        <Icon name="mas" size={14} /> Nueva unidad en “{modulo.titulo}”
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </li>
          )
        })}
        {puedeCrear && (
          <li>
            <button type="button" className="editor-crear-hijo" onClick={() => onCrearHijo({ tipo: 'modulo' })}>
              <Icon name="mas" size={14} /> Nuevo módulo
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}
