// ============================================================
//  Reporte imprimible del alumno — el DOCUMENTO como dato (lógica PURA)
// ------------------------------------------------------------
//  AQUÍ SE DECIDE QUÉ DICE LA HOJA; el componente solo la pinta. Esa separación
//  no es ceremonia: es lo que permite probar con `npm test` que un reporte sin
//  la casilla de pagos NO lleva importes, sin montar React ni abrir un PDF.
//
//  POR QUÉ NO HAY LIBRERÍA DE PDF. El proyecto tiene cuatro dependencias en
//  total y el temario ya se sacó del bundle a pulso (trabajo P2, de 3 037 kB a
//  712 kB). Añadir ~300 kB de generador de PDF para imprimir una hoja sería
//  desandar ese camino. El navegador ya sabe hacer PDF: `window.print()` con
//  una hoja `@media print` ofrece «Guardar como PDF» y, en un mostrador,
//  imprime directo. El logo entra como una imagen normal.
//
//  EL LOGO SALE DE LA CONFIGURACIÓN DE LA ACADEMIA (`academias/{id}.logo`), el
//  mismo campo que usa la portada de la academia. Si no hay logo la hoja se
//  imprime igual, con el nombre en letra grande: un reporte que no sale porque
//  falta un logo es un reporte que se acaba escribiendo a mano.
//
//  Módulo PURO: sin React y sin Firebase.
// ============================================================
import { etiquetaConcepto, etiquetaMetodo, fechaCorta, moneda } from './cajaModelo.js'
import { claveDeDia, comoFecha, diaLargo, horaCorta } from './asistenciaModelo.js'
import { etiquetaEstado, piezasDe } from './carritoModelo.js'

/**
 * Las secciones que se pueden imprimir.
 *
 * `porDefecto` marca las que vienen encendidas: identidad y contacto, porque un
 * documento sin decir de quién es no sirve para nada. El resto se elige.
 */
export const SECCIONES = [
  { id: 'identidad', etiqueta: 'Matrícula e identidad', descripcion: 'Nombre, matrícula, grupo y generación.', porDefecto: true },
  { id: 'contacto', etiqueta: 'Datos de contacto', descripcion: 'Correo y teléfono registrados.', porDefecto: true },
  { id: 'pagos', etiqueta: 'Estado de pagos', descripcion: 'Historial de cobros, totales por concepto y saldo.', porDefecto: true },
  { id: 'asistencias', etiqueta: 'Asistencias', descripcion: 'Días registrados y hora de entrada.', porDefecto: false },
  { id: 'compras', etiqueta: 'Compras y entregas', descripcion: 'Artículos apartados, pagados y entregados.', porDefecto: false },
  { id: 'academico', etiqueta: 'Trabajo del profesor', descripcion: 'Evaluaciones y tareas creadas para su grupo.', porDefecto: false },
]

export function seleccionPorDefecto() {
  return Object.fromEntries(SECCIONES.map((s) => [s.id, s.porDefecto]))
}

export function seccionesElegidas(seleccion) {
  return SECCIONES.filter((s) => seleccion?.[s.id])
}

export function problemasDelReporte(seleccion) {
  return seccionesElegidas(seleccion).length === 0
    ? ['Elige al menos un apartado para imprimir.']
    : []
}

/** `null` y `''` se imprimen igual: con una raya. Un hueco en blanco parece un error. */
const dato = (v) => {
  const s = String(v ?? '').trim()
  return s || '—'
}

/**
 * El documento, listo para pintar.
 *
 * @returns {{
 *   academia: {nombre: string, logo: string},
 *   alumno: {nombre: string, matricula: string},
 *   generado: string,
 *   bloques: Array<{id, titulo, tipo, pares?, columnas?, filas?, nota?, vacio?}>
 * }}
 *   `tipo` es 'pares' (etiqueta/valor) o 'tabla'. Dos formas y no más: una
 *   hoja impresa con cinco maquetaciones distintas se lee peor, no mejor.
 */
export function construirReporte({
  alumno, academia, grupo = null, seleccion = seleccionPorDefecto(),
  cuenta = null, asistencias = [], ordenes = [], evaluaciones = [],
  ahora = new Date(),
} = {}) {
  const elegidas = seccionesElegidas(seleccion).map((s) => s.id)
  const bloques = []

  if (elegidas.includes('identidad')) {
    bloques.push({
      id: 'identidad',
      titulo: 'Identidad',
      tipo: 'pares',
      pares: [
        ['Nombre', dato(alumno?.nombre)],
        ['Matrícula', dato(alumno?.matricula)],
        ['Grupo', dato(grupo?.nombre || alumno?.grupoId)],
        ['Generación', dato(etiquetaGeneracion(grupo?.generacion))],
        ['Estado de la cuenta', dato(alumno?.estado || 'activo')],
      ],
    })
  }

  if (elegidas.includes('contacto')) {
    bloques.push({
      id: 'contacto',
      titulo: 'Contacto',
      tipo: 'pares',
      pares: [
        ['Correo', dato(alumno?.email)],
        ['Teléfono', dato(alumno?.telefono)],
      ],
    })
  }

  if (elegidas.includes('pagos')) {
    const pagos = cuenta?.pagos || []
    bloques.push({
      id: 'pagos-resumen',
      titulo: 'Estado de pagos',
      tipo: 'pares',
      pares: [
        ['Total pagado', moneda(cuenta?.pagado || 0)],
        ['Saldo pendiente', moneda(cuenta?.saldo || 0)],
        ['Movimientos', String(pagos.length)],
      ],
      // El alcance se imprime SIEMPRE con el saldo. Un cero sin esta línea se
      // lee como «está al corriente», y no es lo que significa.
      nota: cuenta?.alcance || '',
    })
    bloques.push({
      id: 'pagos',
      titulo: 'Movimientos',
      tipo: 'tabla',
      columnas: ['Fecha', 'Concepto', 'Método', 'Referencia', 'Importe'],
      filas: pagos.map((p) => [
        fechaCorta(p.fecha),
        etiquetaConcepto(p.concepto),
        etiquetaMetodo(p.metodo),
        dato(p.referencia),
        moneda(p.monto),
      ]),
      vacio: 'Sin pagos registrados.',
    })
  }

  if (elegidas.includes('asistencias')) {
    const filas = (asistencias || [])
      .map((a) => ({ ...a, _i: comoFecha(a?.inicio) }))
      .filter((a) => a._i)
      .sort((a, b) => b._i - a._i)
      .map((a) => [diaLargo(claveDeDia(a._i)), horaCorta(a._i), dato(a.medio === 'codigo' ? 'Credencial' : 'Mostrador')])
    bloques.push({
      id: 'asistencias',
      titulo: 'Asistencias registradas',
      tipo: 'tabla',
      columnas: ['Día', 'Entrada', 'Registro'],
      filas,
      nota: filas.length ? `${filas.length} día(s) con entrada registrada.` : '',
      vacio: 'Sin asistencias registradas.',
    })
  }

  if (elegidas.includes('compras')) {
    const filas = (ordenes || []).map((o) => [
      fechaCorta(o.creado),
      `${piezasDe(o.lineas)} artículo(s)`,
      (o.lineas || []).map((l) => `${l.cantidad}× ${l.nombre}`).join(', ') || '—',
      etiquetaEstado(o.estado),
      moneda(o.total),
    ])
    bloques.push({
      id: 'compras',
      titulo: 'Compras y entregas',
      tipo: 'tabla',
      columnas: ['Fecha', 'Piezas', 'Detalle', 'Estado', 'Total'],
      filas,
      vacio: 'Sin compras registradas.',
    })
  }

  if (elegidas.includes('academico')) {
    const filas = (evaluaciones || []).map((e) => [
      dato(e.titulo),
      dato(e.tipo || 'Evaluación'),
      e.entrega ? fechaCorta(e.entrega) : '—',
      dato(e.descripcion).slice(0, 80),
    ])
    bloques.push({
      id: 'academico',
      titulo: 'Trabajo asignado por el profesor',
      tipo: 'tabla',
      columnas: ['Título', 'Tipo', 'Entrega', 'Descripción'],
      filas,
      // Se dice en la hoja: recepción ve el trabajo, NO las calificaciones.
      nota: 'Listado informativo. Las calificaciones las consulta el alumno con su profesor.',
      vacio: 'El profesor no ha creado trabajo para este grupo.',
    })
  }

  return {
    ...cabecera({ academia, ahora }),
    titulo: 'Estado de cuenta',
    subtitulo: [alumno?.nombre, alumno?.matricula].filter(Boolean).join(' · '),
    // Se conserva `alumno` además del subtítulo: lo usa `nombreDeArchivo` y
    // quien quiera el dato suelto sin volver a partir una cadena.
    alumno: {
      nombre: alumno?.nombre || '',
      matricula: alumno?.matricula || '',
    },
    bloques,
  }
}

/**
 * La parte común de toda hoja impresa: de quién es y cuándo se generó.
 *
 * Está aparte porque ya hay tres documentos —estado de cuenta, padrón y corte
 * de caja— y los tres se imprimen con el MISMO componente. Si cada uno armara
 * su propia cabecera, acabarían con tres formatos de fecha distintos.
 */
function cabecera({ academia, ahora }) {
  return {
    academia: {
      nombre: academia?.nombre || academia?.id || '',
      logo: academia?.logo || '',
    },
    generado: (comoFecha(ahora) || new Date()).toLocaleString('es-MX', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
    }),
  }
}

/**
 * El PADRÓN imprimible: cuántos alumnos hay y quiénes son.
 *
 * `filas` llega ya ordenada y filtrada por `padronModelo`: se imprime EXACTAMENTE
 * lo que se está viendo en pantalla, no la lista entera. Imprimir algo distinto
 * de lo que se ve es la forma más rápida de que nadie vuelva a fiarse del botón.
 */
export function construirPadron({ academia, filas = [], resumen = null, columnas = null, ahora = new Date() } = {}) {
  const cols = columnas || { matricula: true, grupo: true, contacto: true }
  const cabeceras = ['Nombre']
  if (cols.matricula) cabeceras.push('Matrícula')
  if (cols.grupo) cabeceras.push('Grupo')
  if (cols.contacto) cabeceras.push('Correo', 'Teléfono')

  const bloques = []
  if (resumen) {
    bloques.push({
      id: 'resumen',
      titulo: 'Resumen',
      tipo: 'pares',
      pares: [
        ['Alumnos activos', String(resumen.total)],
        ['Sin grupo', String(resumen.sinGrupo.length)],
        ['Sin matrícula', String(resumen.sinMatricula.length)],
        ['Suspendidos o dados de baja', String(resumen.suspendidos)],
      ],
      nota: resumen.sinGrupo.length > 0
        ? 'Quien no tiene grupo no ve contenido: el plan de estudios cuelga del grupo.'
        : '',
    })
    if (resumen.porGrupo.length) {
      bloques.push({
        id: 'grupos',
        titulo: 'Por grupo',
        tipo: 'tabla',
        columnas: ['Grupo', 'Alumnos'],
        filas: resumen.porGrupo.map((g) => [g.nombre, String(g.total)]),
        vacio: 'Sin grupos.',
      })
    }
  }

  bloques.push({
    id: 'padron',
    titulo: 'Listado',
    tipo: 'tabla',
    columnas: cabeceras,
    filas: filas.map((f) => {
      const fila = [dato(f.nombre)]
      if (cols.matricula) fila.push(dato(f.matricula))
      if (cols.grupo) fila.push(dato(f.grupo))
      if (cols.contacto) fila.push(dato(f.email), dato(f.telefono))
      return fila
    }),
    nota: `${filas.length} persona(s) en este listado.`,
    vacio: 'Ningún alumno coincide con el filtro.',
  })

  return {
    ...cabecera({ academia, ahora }),
    titulo: 'Padrón de alumnos',
    subtitulo: `${filas.length} persona(s)`,
    bloques,
  }
}

/**
 * El CORTE DE CAJA imprimible: lo cobrado en un periodo, y por quién.
 *
 * `porMetodo` va primero porque es lo que se cuadra contra el dinero que hay
 * en el cajón; el detalle está debajo para poder buscar un asiento concreto.
 */
export function construirCorte({ academia, pagos = [], desde = null, ahora = new Date() } = {}) {
  const porMetodo = new Map()
  let total = 0
  for (const p of pagos) {
    total += Number(p.monto) || 0
    const clave = p.metodo || 'otro'
    const fila = porMetodo.get(clave) || { metodo: clave, total: 0, veces: 0 }
    fila.total += Number(p.monto) || 0
    fila.veces += 1
    porMetodo.set(clave, fila)
  }

  return {
    ...cabecera({ academia, ahora }),
    titulo: 'Corte de caja',
    subtitulo: desde
      ? `Desde ${(comoFecha(desde) || new Date()).toLocaleString('es-MX', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}`
      : 'Del día',
    bloques: [
      {
        id: 'totales',
        titulo: 'Totales',
        tipo: 'pares',
        pares: [
          ['Cobrado', moneda(total)],
          ['Movimientos', String(pagos.length)],
        ],
      },
      {
        id: 'metodos',
        titulo: 'Por método de pago',
        tipo: 'tabla',
        columnas: ['Método', 'Movimientos', 'Importe'],
        filas: [...porMetodo.values()]
          .sort((a, b) => b.total - a.total)
          .map((m) => [etiquetaMetodo(m.metodo), String(m.veces), moneda(m.total)]),
        vacio: 'Sin cobros en el periodo.',
      },
      {
        id: 'detalle',
        titulo: 'Detalle',
        tipo: 'tabla',
        columnas: ['Hora', 'Matrícula', 'Concepto', 'Método', 'Importe'],
        filas: pagos.map((p) => [
          fechaCorta(p.fecha),
          dato(p.matricula),
          etiquetaConcepto(p.concepto),
          etiquetaMetodo(p.metodo),
          moneda(p.monto),
        ]),
        nota: 'Un cobro registrado no se edita ni se borra: una corrección se hace con otro asiento.',
        vacio: 'Sin cobros en el periodo.',
      },
    ],
  }
}

/**
 * `{numero: 3, anio: 2026}` → `3ª generación · 2026`.
 *
 * Duplica a propósito lo mínimo de `horarioGrupos.etiquetaDeGeneracion` para no
 * arrastrar ese módulo entero —y su tabla de días— dentro de la hoja impresa.
 */
export function etiquetaGeneracion(generacion) {
  const numero = generacion?.numero
  const anio = generacion?.anio
  if (!numero && !anio) return ''
  if (numero && anio) return `${numero}ª generación · ${anio}`
  return numero ? `${numero}ª generación` : String(anio)
}

/** El nombre del archivo que propone el navegador al guardar como PDF. */
export function nombreDeArchivo({ alumno, ahora = new Date() } = {}) {
  const base = String(alumno?.matricula || alumno?.nombre || 'alumno')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase()
  return `estado-de-cuenta-${base}-${claveDeDia(ahora)}`
}
