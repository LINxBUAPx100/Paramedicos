import { Link, useParams } from 'react-router-dom'
import { useCursosDeAcademia } from '../../../context/ContenidoContext.jsx'
import { conteosDeCurso } from '../../../lib/cursosDelUsuario.js'
import { META_PROGRAMA } from '../../../lib/programasModelo.js'
import { rutaDeAcademia } from '../../../lib/adminModelo.js'
import Icon from '../../../components/Icon.jsx'

// ============================================================
//  Programas de la academia — la pantalla que faltaba
// ------------------------------------------------------------
//  R.E.S.C.A.T.E. imparte paramédico, enfermería y cursos cortos, pero la
//  consola entraba siempre al primero. No había forma de supervisar las
//  calificaciones de enfermería, sus grupos ni su temario: la academia entera
//  se veía a través de la ventana de un solo programa.
//
//  Ésta es la pantalla anterior al resumen. Cada programa es, en la práctica,
//  una academia dentro de la academia —sus alumnos, sus profesores, sus notas,
//  su contenido— y desde aquí se entra a la consola de cada uno.
//
//  POR QUÉ NO ES UN DESPLEGABLE. Un filtro se pierde al recargar, no se puede
//  mandar por enlace a un profesor y no deja ver de un vistazo cuántos
//  programas hay ni cómo va cada uno. El curso vive en la dirección
//  (`/admin/aca/<academia>/c/<curso>`), así que cada programa tiene su propia
//  consola y sus pantallas no se pueden mezclar.
//
//  UN PROGRAMA VACÍO SE ENSEÑA VACÍO. Enfermería empieza sin un solo tema y eso
//  no es un error que haya que esconder: es el estado real, y la tarjeta lo
//  dice. Se llena solo conforme se cree contenido.
// ============================================================

export default function AcaProgramas() {
  const { academiaId } = useParams()
  const cursos = useCursosDeAcademia(academiaId)

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Programas</h1>
        <p>
          Cada programa tiene sus propios alumnos, grupos, calificaciones y
          temario. Entra en uno para supervisarlo.
        </p>
      </header>

      {cursos.length === 0 ? (
        <p className="panel-vacio">
          Esta academia todavía no tiene ningún programa. Se crean desde{' '}
          <Link to="/admin/replicacion">Contenido de la plataforma</Link>.
        </p>
      ) : (
        <ul className="prog-lista">
          {cursos.map((c) => (
            <TarjetaPrograma key={c.id} curso={c} academiaId={academiaId} />
          ))}
        </ul>
      )}
    </div>
  )
}

function TarjetaPrograma({ curso, academiaId }) {
  const tipo = META_PROGRAMA[curso.tipoPrograma] ? curso.tipoPrograma : 'tum'
  const meta = META_PROGRAMA[tipo]
  const { modulos, temas } = conteosDeCurso(curso)
  const publicado = curso.estado === 'publicado'
  // Un curso a medio clonar no se puede supervisar como si estuviera entero:
  // sus cifras estarían incompletas y nadie sabría por qué.
  const aMedias = curso.clonacion && curso.clonacion.completa === false

  return (
    <li className="prog-item" style={{ '--curso-color': meta.color }}>
      <Link to={rutaDeAcademia(academiaId, '', curso.id)} className="prog-enlace">
        <span className="prog-ico"><Icon name={meta.icono} size={22} /></span>
        <span className="prog-texto">
          <strong className="prog-titulo">{curso.titulo || curso.id}</strong>
          <span className="prog-tipo">{meta.etiqueta}</span>
          <span className="prog-cifras">
            {temas === 0
              ? 'Sin contenido todavía'
              : `${modulos} módulo(s) · ${temas} temas`}
            {curso.version ? ` · versión ${curso.version}` : ''}
          </span>
        </span>
        <span className="prog-estados">
          <span className={`prog-estado ${publicado ? 'activo' : 'inactivo'}`}>
            {publicado ? 'Publicado' : 'Borrador'}
          </span>
          {aMedias && <span className="prog-estado alerta">Copia incompleta</span>}
        </span>
        <Icon name="chevronDer" size={20} className="prog-flecha" />
      </Link>
    </li>
  )
}
