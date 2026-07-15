import { useEffect, useId, useMemo, useState } from 'react'
import Icon from '../Icon.jsx'
import { ChipEstado } from './ArbolCurso.jsx'
import {
  validarTitulo, validarDescripcion, LIMITE_TITULO, LIMITE_DESCRIPCION,
} from '../../lib/editorModelo.js'

const ETIQUETA_TIPO = { curso: 'Curso', fase: 'Fase', modulo: 'Módulo', tema: 'Tema' }

function fecha(ts) {
  const d = ts?.toDate?.() || (ts instanceof Date ? ts : null)
  return d ? d.toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' }) : '—'
}

// Panel de edición del elemento seleccionado.
//  - Campos con guardado EXPLÍCITO (nada se escribe por tecla): borrador local
//    + botón Guardar; el padre recibe onDirty para proteger cambios sin guardar.
//  - Validación inline vinculada por aria-describedby.
//  - Acciones según tipo y estado; las destructivas las confirma el padre.
const PERMISOS_TODOS = { editar: true, publicar: true, crear: true, duplicarCurso: true }

export default function PanelNodo({
  tipo, nodo, meta, posicion, padre, temaDoc, cargandoTema,
  destinosMover = [], ocupado = false, puedeReordenar = true,
  permisos = PERMISOS_TODOS,
  onGuardarCampos, onAccion, onDirty,
}) {
  // Capacidades del usuario sobre ESTE editor (super/director: todo; profesor:
  // según sus permisosEditor). Gobiernan qué botones se muestran; la barrera
  // real son las reglas + la capa de datos.
  const puede = { ...PERMISOS_TODOS, ...permisos }
  const puedeDuplicar = tipo === 'curso' ? puede.duplicarCurso : puede.crear
  const uid = useId()
  const [borrador, setBorrador] = useState({})
  const [destinoMover, setDestinoMover] = useState('')

  // Campos editables según el tipo (el contenido interno del tema es Fase 5).
  const campos = useMemo(() => {
    if (tipo === 'curso') return ['titulo', 'descripcion']
    if (tipo === 'fase') return ['titulo', 'subtitulo', 'descripcion']
    if (tipo === 'modulo') return ['titulo', 'descripcion']
    return ['titulo', 'resumen']
  }, [tipo])

  const valorOriginal = (campo) => {
    if (campo === 'resumen') return temaDoc?.resumen ?? ''
    return nodo?.[campo] ?? ''
  }
  const valorActual = (campo) => borrador[campo] ?? valorOriginal(campo)

  const hayCambios = campos.some((c) => borrador[c] !== undefined && borrador[c] !== valorOriginal(c))
  useEffect(() => { onDirty?.(hayCambios) }, [hayCambios, onDirty])
  // Al cambiar de selección se descarta el borrador local (el padre ya
  // confirmó los cambios sin guardar antes de permitir el cambio).
  useEffect(() => { setBorrador({}); setDestinoMover('') }, [nodo?.id, tipo])

  const errores = {
    titulo: validarTitulo(valorActual('titulo')),
    descripcion: validarDescripcion(valorActual('descripcion')),
    subtitulo: null,
    resumen: validarDescripcion(valorActual('resumen')),
  }
  const hayErrores = campos.some((c) => errores[c])

  const guardar = () => {
    if (hayErrores || !hayCambios || ocupado) return
    const cambios = {}
    for (const c of campos) {
      if (borrador[c] !== undefined && borrador[c] !== valorOriginal(c)) cambios[c] = borrador[c]
    }
    onGuardarCampos(cambios, () => setBorrador({}))
  }

  const estado = nodo?.estado || 'publicado'
  const etiquetas = {
    titulo: 'Título',
    subtitulo: 'Subtítulo',
    descripcion: 'Descripción',
    resumen: 'Resumen (lo que ve el alumno en el temario)',
  }

  return (
    <section className="editor-panel" aria-label={`Edición de ${ETIQUETA_TIPO[tipo]?.toLowerCase()}`}>
      <header className="editor-panel-cabecera">
        <p className="editor-panel-tipo">{ETIQUETA_TIPO[tipo]}</p>
        <h2>{nodo?.titulo || 'Sin título'}</h2>
        <ChipEstado estado={estado} />
      </header>

      {estado === 'archivado' && (
        <p className="editor-aviso" role="status">
          Este elemento está archivado: los alumnos no lo ven y no se puede editar
          hasta restaurarlo. Nada se ha eliminado.
        </p>
      )}

      <div className="editor-campos">
        {campos.map((campo) => {
          const multilinea = campo === 'descripcion' || campo === 'resumen'
          const idCampo = `${uid}-${campo}`
          const idError = `${uid}-${campo}-error`
          const deshabilitado = ocupado || estado === 'archivado' || (campo === 'resumen' && (cargandoTema || !temaDoc))
          return (
            <div className="editor-campo" key={campo}>
              <label htmlFor={idCampo}>{etiquetas[campo]}</label>
              {multilinea ? (
                <textarea
                  id={idCampo}
                  rows={3}
                  maxLength={LIMITE_DESCRIPCION + 50}
                  value={valorActual(campo)}
                  disabled={deshabilitado}
                  aria-invalid={errores[campo] ? 'true' : undefined}
                  aria-describedby={errores[campo] ? idError : undefined}
                  onChange={(e) => setBorrador((b) => ({ ...b, [campo]: e.target.value }))}
                />
              ) : (
                <input
                  id={idCampo}
                  type="text"
                  maxLength={LIMITE_TITULO + 20}
                  value={valorActual(campo)}
                  disabled={deshabilitado}
                  aria-invalid={errores[campo] ? 'true' : undefined}
                  aria-describedby={errores[campo] ? idError : undefined}
                  onChange={(e) => setBorrador((b) => ({ ...b, [campo]: e.target.value }))}
                />
              )}
              {campo === 'resumen' && cargandoTema && <p className="editor-nota">Cargando el contenido del tema…</p>}
              {errores[campo] && <p className="editor-error" id={idError}>{errores[campo]}</p>}
            </div>
          )
        })}
        <div className="editor-guardar-fila">
          <button
            type="button"
            className="btn-pildora btn-pildora--solido"
            disabled={!hayCambios || hayErrores || ocupado || estado === 'archivado' || !puede.editar}
            onClick={guardar}
          >
            <Icon name="check" size={16} /> Guardar cambios
          </button>
          {hayCambios && <span className="editor-pendiente">Tienes cambios sin guardar</span>}
        </div>
      </div>

      {(puede.publicar || puedeDuplicar) && (
        <>
          <h3 className="editor-subtitulo">Acciones</h3>
          <div className="editor-acciones">
            {puede.publicar && estado !== 'publicado' && estado !== 'archivado' && (
              <button type="button" className="btn-pildora" disabled={ocupado} onClick={() => onAccion('publicar')}>
                <Icon name="verificado" size={16} /> Publicar
              </button>
            )}
            {puede.publicar && estado === 'publicado' && (
              <button type="button" className="btn-pildora" disabled={ocupado} onClick={() => onAccion('despublicar')}>
                <Icon name="ojoCerrado" size={16} /> Despublicar
              </button>
            )}
            {puede.publicar && (estado !== 'archivado' ? (
              <button type="button" className="btn-pildora" disabled={ocupado} onClick={() => onAccion('archivar')}>
                <Icon name="archivo" size={16} /> Archivar
              </button>
            ) : (
              <button type="button" className="btn-pildora" disabled={ocupado} onClick={() => onAccion('restaurar')}>
                <Icon name="restaurar" size={16} /> Restaurar
              </button>
            ))}
            {puedeDuplicar && (
              <button type="button" className="btn-pildora" disabled={ocupado} onClick={() => onAccion('duplicar')}>
                <Icon name="copiar" size={16} /> Duplicar
              </button>
            )}
          </div>
        </>
      )}

      {puedeReordenar && puede.editar && tipo !== 'curso' && (
        <>
          <h3 className="editor-subtitulo" id={`${uid}-orden`}>Orden</h3>
          <div className="editor-acciones" role="group" aria-labelledby={`${uid}-orden`}>
            <button type="button" className="btn-pildora" disabled={ocupado} onClick={() => onAccion('reordenar', 'inicio')}>
              <Icon name="subir" size={16} /> Al inicio
            </button>
            <button type="button" className="btn-pildora" disabled={ocupado} onClick={() => onAccion('reordenar', 'arriba')}>
              <Icon name="chevronArriba" size={16} /> Subir
            </button>
            <button type="button" className="btn-pildora" disabled={ocupado} onClick={() => onAccion('reordenar', 'abajo')}>
              <Icon name="chevronAbajo" size={16} /> Bajar
            </button>
            <button type="button" className="btn-pildora" disabled={ocupado} onClick={() => onAccion('reordenar', 'fin')}>
              <Icon name="bajar" size={16} /> Al final
            </button>
          </div>
        </>
      )}

      {puede.editar && destinosMover.length > 0 && (
        <>
          <h3 className="editor-subtitulo">
            {tipo === 'modulo' ? 'Mover a otra fase' : 'Mover a otro módulo'}
          </h3>
          <div className="editor-mover">
            <label htmlFor={`${uid}-mover`} className="sr-only">Destino</label>
            <select
              id={`${uid}-mover`}
              value={destinoMover}
              disabled={ocupado}
              onChange={(e) => setDestinoMover(e.target.value)}
            >
              <option value="">Elige el destino…</option>
              {destinosMover.map((d) => (
                <option key={d.valor} value={d.valor}>{d.etiqueta}</option>
              ))}
            </select>
            <button
              type="button"
              className="btn-pildora"
              disabled={!destinoMover || ocupado}
              onClick={() => onAccion('mover', destinoMover)}
            >
              <Icon name="moverA" size={16} /> Mover
            </button>
          </div>
        </>
      )}

      <h3 className="editor-subtitulo">Detalles</h3>
      <dl className="editor-detalles">
        <div><dt>Posición</dt><dd>{posicion || '—'}</dd></div>
        <div><dt>Pertenece a</dt><dd>{padre || '—'}</dd></div>
        <div><dt>Creado</dt><dd>{fecha(meta?.creadoEn)}{meta?.creadoPor ? ` · ${meta.creadoPor}` : ''}</dd></div>
        <div><dt>Última actualización</dt><dd>{fecha(meta?.actualizado)}</dd></div>
        <div><dt>Actualizado por</dt><dd>{meta?.actualizadoPor || '—'}</dd></div>
        <div><dt>Versión</dt><dd>{meta?.version ?? '—'}</dd></div>
        {meta?.ultimaAccion && <div><dt>Última acción</dt><dd>{meta.ultimaAccion}</dd></div>}
      </dl>
    </section>
  )
}
