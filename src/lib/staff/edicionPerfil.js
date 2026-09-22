// ============================================================
//  Edición del perfil desde recepción — qué se toca y qué queda registrado
// ------------------------------------------------------------
//  DÓNDE ESTÁ LA RAYA, y por qué está ahí.
//
//  Se pidió que recepción pudiera modificar «absolutamente todos» los datos del
//  alumno. Técnicamente se puede; la decisión tomada el 20-09-2026 fue otra, y
//  conviene dejar escrito el motivo para que nadie la revierta sin saberlo:
//
//   · `rol`      — con él, una recepcionista convierte a un alumno en profesor,
//                  y un profesor lee el temario completo de la academia.
//   · `estado`   — es la puerta de acceso a la plataforma.
//   · `academiaId` — mover a alguien de academia es un traslado, y arrastra su
//                  matrícula, su grupo y su historial.
//   · `matricula` — escribirla a mano salta el contador transaccional, que es
//                  lo único que impide dos personas con el mismo número.
//
//  Los cuatro se enseñan en la ficha, en LECTURA, con quién los cambia. No se
//  esconden: esconder un dato hace que se pregunte por teléfono.
//
//  LA GENERACIÓN NO ES UN CAMPO DEL ALUMNO. Vive en su grupo
//  (`grupos/{id}.generacion`), y es correcto que así sea: la generación es del
//  grupo, no de la persona. Cambiarle la generación a alguien es moverlo de
//  grupo, y eso sí se puede desde aquí. Crear un campo `generacion` en el
//  perfil daría dos verdades que se contradicen en cuanto una cambie.
//
//  TODA EDICIÓN DEJA RASTRO. `cambiosDe` produce el antes y el después campo a
//  campo, y eso es lo que se escribe en `historial`. Un registro que solo diga
//  «editó el perfil» no sirve para nada el día que haga falta.
//
//  Módulo PURO: sin React y sin Firebase.
// ============================================================
import { correoValido, normalizarTelefono, telefonoValido } from '../recepcionModelo.js'

/**
 * Los campos que recepción PUEDE escribir.
 *
 * Esta lista es la fuente única: el formulario se pinta desde ella, el parche
 * se construye desde ella y la regla de Firestore la repite (`hasOnly`). Añadir
 * un campo es una línea aquí y una en las reglas, nunca solo una de las dos.
 */
export const CAMPOS_EDITABLES = [
  {
    id: 'nombre',
    etiqueta: 'Nombre completo',
    tipo: 'text',
    ayuda: 'Como debe aparecer en listas, constancias y credencial.',
    autoComplete: 'name',
  },
  {
    id: 'email',
    etiqueta: 'Correo electrónico',
    tipo: 'email',
    ayuda: 'Cambiarlo aquí NO cambia el correo con el que inicia sesión: eso lo hace la persona desde su cuenta.',
    autoComplete: 'email',
  },
  {
    id: 'telefono',
    etiqueta: 'Teléfono',
    tipo: 'tel',
    ayuda: 'De aquí salen los mensajes de WhatsApp. Entre 10 y 15 dígitos.',
    autoComplete: 'tel',
  },
  {
    id: 'grupoId',
    etiqueta: 'Grupo',
    tipo: 'grupo',
    ayuda: 'El grupo decide su plan de estudios, su horario y su generación.',
  },
  {
    id: 'notaRecepcion',
    etiqueta: 'Nota de recepción',
    tipo: 'textarea',
    ayuda: 'Visible solo para el personal. Máximo 300 caracteres.',
  },
]

/** Campos que se ENSEÑAN pero no se editan, y quién los cambia. */
export const CAMPOS_EN_LECTURA = [
  { id: 'matricula', etiqueta: 'Matrícula', quien: 'La emite el contador de la academia; cambiarla es un traslado.' },
  { id: 'rol', etiqueta: 'Rol', quien: 'Lo cambia la dirección.' },
  { id: 'estado', etiqueta: 'Estado de la cuenta', quien: 'Lo cambia la dirección.' },
  { id: 'academiaId', etiqueta: 'Academia', quien: 'Cambiarla es un traslado: lo hace el super-admin.' },
]

/** Blindaje explícito. Si alguien amplía la lista de arriba, esto sigue en pie. */
export const CAMPOS_VETADOS = [
  'rol', 'estado', 'academiaId', 'matricula',
  'permisosEditor', 'grupoIds', 'puedeVerCodigos', 'modulosDesbloqueados',
  'esPrueba', 'pruebaHasta', 'codigoPrueba', 'terminos',
]

const IDS_EDITABLES = CAMPOS_EDITABLES.map((c) => c.id)

/** Lo que hay hoy, listo para meter en el formulario. Nunca `undefined`. */
export function valoresIniciales(alumno) {
  return {
    nombre: String(alumno?.nombre || ''),
    email: String(alumno?.email || ''),
    telefono: String(alumno?.telefono || ''),
    grupoId: String(alumno?.grupoId || ''),
    notaRecepcion: String(alumno?.notaRecepcion || ''),
  }
}

/** Lo mismo, pero ya normalizado como se va a guardar. */
export function valoresParaGuardar(valores) {
  return {
    nombre: String(valores?.nombre || '').trim(),
    email: String(valores?.email || '').trim().toLowerCase(),
    telefono: normalizarTelefono(valores?.telefono),
    grupoId: String(valores?.grupoId || '').trim() || null,
    notaRecepcion: String(valores?.notaRecepcion || '').trim().slice(0, 300),
  }
}

/**
 * Qué impide guardar.
 *
 * El grupo es obligatorio por la misma razón que en el alta: sin grupo el
 * alumno entra y no ve contenido, porque el plan de estudios cuelga del grupo.
 * Es el agujero que se cerró en las altas por directorio el 02-09-2026.
 */
export function problemasDeEdicion(valores) {
  const v = valoresParaGuardar(valores)
  const p = []
  if (!v.nombre) p.push('Escribe el nombre completo.')
  if (!correoValido(v.email)) p.push('El correo no tiene una forma válida.')
  // El teléfono puede quedar vacío en una edición —hay alumnos antiguos sin
  // él—, pero si se escribe algo tiene que ser un teléfono.
  if (v.telefono && !telefonoValido(v.telefono)) p.push('El teléfono debe tener entre 10 y 15 dígitos.')
  if (!v.grupoId) p.push('Elige el grupo al que pertenece: sin grupo no ve contenido.')
  return p
}

/**
 * El antes y el después, campo a campo. Vacío = no hay nada que guardar.
 *
 * @returns {Array<{campo: string, etiqueta: string, antes: any, despues: any}>}
 */
export function cambiosDe(alumno, valores) {
  const antes = valoresIniciales(alumno)
  const antesNorm = valoresParaGuardar(antes)
  const despues = valoresParaGuardar(valores)
  return CAMPOS_EDITABLES
    .filter((c) => (antesNorm[c.id] || '') !== (despues[c.id] || ''))
    .map((c) => ({
      campo: c.id,
      etiqueta: c.etiqueta,
      antes: antesNorm[c.id] || '',
      despues: despues[c.id] || '',
    }))
}

/**
 * El parche para Firestore: SOLO lo que cambió.
 *
 * Mandar el objeto entero haría que `affectedKeys()` incluyera campos que no se
 * tocaron, y la regla los contaría como modificados. Además de ser más barato,
 * es lo que hace que la regla pueda ser estrecha.
 */
export function parcheDeEdicion(alumno, valores) {
  const despues = valoresParaGuardar(valores)
  const parche = {}
  for (const { campo } of cambiosDe(alumno, valores)) parche[campo] = despues[campo]
  return parche
}

/**
 * Campos que viajan con el parche SIN ser editables a mano: los escribe el
 * sistema como consecuencia de otro cambio.
 *
 * Hoy solo la matrícula y su historial, y solo cuando en el mismo parche va el
 * grupo. Desde el 21-09-2026 la matrícula la dicta el grupo (generación, mes,
 * día y turno), así que mover a alguien de grupo la rehace — pero sigue sin
 * poder teclearse: si viene sin `grupoId`, este parche se rechaza aquí y la
 * regla de Firestore lo rechaza otra vez.
 */
export const CAMPOS_DERIVADOS = ['matricula', 'matriculasAnteriores']

/** ¿Este parche toca algo que recepción no debe tocar? Cinturón y tirantes. */
export function parcheSeguro(parche) {
  const claves = Object.keys(parche || {})
  const derivados = claves.filter((k) => CAMPOS_DERIVADOS.includes(k))
  // Un derivado suelto, sin el cambio de grupo que lo justifica, es exactamente
  // lo que no puede pasar: sería teclear una matrícula saltándose el contador.
  if (derivados.length && !claves.includes('grupoId')) return false
  return claves.length > 0
    && claves.every((k) => IDS_EDITABLES.includes(k) || CAMPOS_DERIVADOS.includes(k))
    && !claves.some((k) => CAMPOS_VETADOS.includes(k) && !CAMPOS_DERIVADOS.includes(k))
}

/**
 * La entrada de auditoría, en la forma que YA espera `registrarHistorial`.
 *
 * Va a `historial`, la misma colección que el resto de la aplicación usa para
 * altas, bajas, permisos y clonaciones, y con su mismo contrato
 * (`{academiaId, accion, coleccion, docId, antes, despues}`). No se inventa una
 * colección paralela ni una forma propia: un rastro repartido en dos sitios,
 * con dos formas distintas, no es un rastro.
 *
 * `usuario` —quién lo hizo— lo pone `registrarHistorial` desde la sesión, que
 * es donde no se puede falsear; la regla de Firestore exige que coincida con el
 * uid de quien escribe.
 */
export function entradaDeAuditoria({ alumno, cambios, academiaId }) {
  const antes = {}
  const despues = {}
  for (const c of cambios || []) {
    antes[c.campo] = c.antes
    despues[c.campo] = c.despues
  }
  return {
    accion: 'editar-alumno',
    academiaId: academiaId || alumno?.academiaId || null,
    coleccion: 'usuarios',
    docId: alumno?.uid || alumno?.id || null,
    antes: {
      ...antes,
      // Copiado a propósito: el historial se lee meses después y resolver un
      // uid a un nombre entonces cuesta una lectura por línea.
      _nombre: String(alumno?.nombre || '').trim(),
      _matricula: alumno?.matricula || null,
    },
    despues,
    detalle: (cambios || [])
      .map((c) => `${c.etiqueta}: «${c.antes || '—'}» → «${c.despues || '—'}»`)
      .join(' · '),
  }
}
