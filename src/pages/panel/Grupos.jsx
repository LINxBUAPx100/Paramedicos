import { usePanel } from '../../components/panel/PanelShell.jsx'
import GruposAcademia from '../../components/panel/GruposAcademia.jsx'
import VisibilidadGrupos from '../../components/panel/VisibilidadGrupos.jsx'
import Icon from '../../components/Icon.jsx'
import { useState } from 'react'
import InvitacionesRol from '../../components/panel/InvitacionesRol.jsx'

// ============================================================
//  Panel del director · GRUPOS (Bloque O)
// ------------------------------------------------------------
//  Los grupos y LO QUE CADA GRUPO VE, juntos: son la misma decisión partida en
//  dos pantallas. La segunda mitad vivía en /temario, un nombre que no anuncia
//  que ahí se controla el acceso al contenido.
// ============================================================

export default function PanelGrupos() {
  const { academiaId, academiaNombre, grupos, miembros, miUid, recargar, gestion, quienEmite } = usePanel()
  const [seleccion, setSeleccion] = useState('')
  const grupo = grupos.find((g) => g.id === seleccion) || grupos[0]

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Grupos</h1>
        <p>Crea grupos, reparte sus códigos y decide qué contenido ve cada uno.</p>
      </header>

      <GruposAcademia
        academiaId={academiaId}
        academiaNombre={academiaNombre}
        grupos={grupos}
        miembros={miembros}
        miUid={miUid}
        onCambio={recargar}
      />

      <section className="panel-visibilidad">
        {grupo && <label className="ui-campo">Grupo de trabajo<select value={grupo.id} onChange={(e) => setSeleccion(e.target.value)}>{grupos.map((g) => <option value={g.id} key={g.id}>{g.nombre || g.id}</option>)}</select></label>}
        {grupo && gestion === 'director' && <details className="ui-panel" key={grupo.id}><summary>Invitar alumnos a {grupo.nombre || grupo.id}</summary><InvitacionesRol academiaId={academiaId} academiaNombre={academiaNombre} miUid={miUid} grupos={[grupo]} grupoInicial={grupo.id} quienEmite={quienEmite} /></details>}
        <h2><Icon name="ojo" size={20} /> Qué contenido ve cada grupo</h2>
        <p className="panel-gestion-sub">
          Este es el 100% del contenido de tu academia. Usa los ojos para decidir qué módulos y temas
          pueden ver los alumnos del grupo elegido: lo oculto desaparece de sus listas y aparece
          bloqueado en Logros hasta que lo liberes.
        </p>
        <VisibilidadGrupos academiaId={academiaId} academiaNombre={academiaNombre} grupos={grupos} grupoForzado={grupo?.id} />
      </section>
    </div>
  )
}
