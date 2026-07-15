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
    && a.faseId === b.faseId
    && (a.moduloId || null) === (b.moduloId || null)
    && (a.temaId || null) === (b.temaId || null)
}

// Árbol jerárquico Curso → Fase → Módulo → Tema.
//  - Navegable 100 % con teclado (botones nativos: Tab + Enter).
//  - Expandir/contraer con aria-expanded; nodo activo con aria-current.
//  - Los estados se muestran con texto (chip), no solo con color.
//  - Solo re-renderiza con cambios de estructura/selección (sin listeners).
export default function ArbolCurso({ estructura, seleccion, onSeleccionar, onCrearHijo, puedeCrear = true, mostrarArchivados = true }) {
  // Fases/módulos expandidos (por id). Por defecto: primera fase abierta.
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
          Este curso todavía no tiene fases. Crea la primera para empezar a armar tu temario.
        </p>
      )}
      <ul className="editor-arbol-lista">
        {estructura.filter(visible).map((fase) => {
          const faseAbierta = abiertos.has(fase.id)
          const refFase = { faseId: fase.id }
          return (
            <li key={fase.id} className={fase.estado === 'archivado' ? 'editor-nodo--archivado' : ''}>
              <div className={`editor-nodo ${mismaRef(seleccion, refFase) ? 'editor-nodo--activo' : ''}`}>
                <button
                  type="button"
                  className="editor-expandir"
                  aria-expanded={faseAbierta}
                  aria-label={`${faseAbierta ? 'Contraer' : 'Expandir'} la fase ${fase.titulo}`}
                  onClick={() => alternar(fase.id)}
                >
                  <Icon name={faseAbierta ? 'chevronAbajo' : 'chevronDer'} size={16} />
                </button>
                <button
                  type="button"
                  className="editor-nombre"
                  aria-current={mismaRef(seleccion, refFase) ? 'true' : undefined}
                  onClick={() => onSeleccionar(refFase)}
                >
                  <Icon name="capas" size={16} />
                  <span>{fase.titulo}</span>
                </button>
                <ChipEstado estado={fase.estado || 'publicado'} />
              </div>
              {faseAbierta && (
                <ul className="editor-arbol-lista editor-arbol-lista--hijos">
                  {(fase.modulos || []).filter(visible).map((modulo) => {
                    const idModulo = `${fase.id}/${modulo.id}`
                    const moduloAbierto = abiertos.has(idModulo)
                    const refModulo = { faseId: fase.id, moduloId: modulo.id }
                    return (
                      <li key={modulo.id} className={modulo.estado === 'archivado' ? 'editor-nodo--archivado' : ''}>
                        <div className={`editor-nodo ${mismaRef(seleccion, refModulo) ? 'editor-nodo--activo' : ''}`}>
                          <button
                            type="button"
                            className="editor-expandir"
                            aria-expanded={moduloAbierto}
                            aria-label={`${moduloAbierto ? 'Contraer' : 'Expandir'} el módulo ${modulo.titulo}`}
                            onClick={() => alternar(idModulo)}
                          >
                            <Icon name={moduloAbierto ? 'chevronAbajo' : 'chevronDer'} size={16} />
                          </button>
                          <button
                            type="button"
                            className="editor-nombre"
                            aria-current={mismaRef(seleccion, refModulo) ? 'true' : undefined}
                            onClick={() => onSeleccionar(refModulo)}
                          >
                            <Icon name="carpeta" size={16} />
                            <span>{modulo.titulo}</span>
                          </button>
                          <ChipEstado estado={modulo.estado || 'publicado'} />
                        </div>
                        {moduloAbierto && (
                          <ul className="editor-arbol-lista editor-arbol-lista--hijos">
                            {(modulo.temas || []).filter(visible).map((tema) => {
                              const refTema = { faseId: fase.id, moduloId: modulo.id, temaId: tema.id }
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
                                  onClick={() => onCrearHijo({ tipo: 'tema', faseId: fase.id, moduloId: modulo.id })}
                                >
                                  <Icon name="mas" size={14} /> Nuevo tema en “{modulo.titulo}”
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
                        onClick={() => onCrearHijo({ tipo: 'modulo', faseId: fase.id })}
                      >
                        <Icon name="mas" size={14} /> Nuevo módulo en “{fase.titulo}”
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
            <button type="button" className="editor-crear-hijo" onClick={() => onCrearHijo({ tipo: 'fase' })}>
              <Icon name="mas" size={14} /> Nueva fase
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}
