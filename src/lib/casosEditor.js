// ============================================================
//  Editor de escenarios del Modo llamada — lógica pura
// ------------------------------------------------------------
//  El editor (pages/panel/Escenarios.jsx) trabaja sobre un BORRADOR cómodo de
//  editar: todo texto, con los signos como cadenas tal cual se teclean. Antes
//  de validar, probar o guardar se pasa por `normalizarCaso`, que produce el
//  formato de casosModelo.js. Así el validador y el reproductor ven
//  exactamente lo que verá el alumno.
//
//  Módulo PURO (sin React ni Firebase): se prueba con `npm test`.
// ============================================================
import { SIGNOS } from './casosModelo.js'

const NUMERICOS = new Set(['fc', 'fr', 'spo2', 'glucosa', 'temp'])

export const TIPOS_OPCION = [
  { id: 'correcta', etiqueta: 'Correcta' },
  { id: 'aceptable', etiqueta: 'Aceptable' },
  { id: 'riesgo', etiqueta: 'De riesgo' },
]

export function opcionNueva() {
  return { texto: '', tipo: 'correcta', va: '', retro: '', tema: '', signos: {} }
}

export function casoNuevo() {
  return {
    id: '',
    titulo: '',
    resumen: '',
    estado: 'borrador',
    rol: 'tum',
    paciente: 'adulto',
    historia: '',
    testigos: '',
    temas: [],
    fuentes: [{ nombre: '', nota: '' }],
    signos: { avdi: 'A', fc: '', fr: '', spo2: '', ta: '' },
    inicio: 'n1',
    nodos: {
      n1: { texto: '', opciones: [opcionNueva(), opcionNueva()] },
      fin1: { texto: '', fin: true, desenlace: 'favorable' },
      fin2: { texto: '', fin: true, desenlace: 'desfavorable' },
    },
  }
}

/** Id corto y legible para un caso de academia, a partir del título. */
export function idDeCaso(titulo, academiaId, azar = Math.random) {
  const slug = String(titulo || 'escenario')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'escenario'
  const sufijo = Math.floor(azar() * 36 ** 4).toString(36).padStart(4, '0')
  const aca = String(academiaId || 'aca').toLowerCase().replace(/[^a-z0-9]+/g, '')
  return `caso-${aca}-${slug}-${sufijo}`
}

/** El siguiente id libre con ese prefijo: n1, n2… o fin1, fin2… */
export function siguienteIdNodo(nodos = {}, prefijo = 'n') {
  let i = 1
  while (nodos[`${prefijo}${i}`]) i += 1
  return `${prefijo}${i}`
}

/**
 * Quita un nodo. Las opciones que llevaban a él quedan SIN destino (no se
 * redirigen a otro): el validador lo señala y el autor decide a dónde van.
 */
export function eliminarNodo(caso, id) {
  if (!caso.nodos[id] || id === caso.inicio) return caso
  const nodos = {}
  for (const [k, n] of Object.entries(caso.nodos)) {
    if (k === id) continue
    nodos[k] = n.opciones
      ? { ...n, opciones: n.opciones.map((o) => (o.va === id ? { ...o, va: '' } : o)) }
      : n
  }
  return { ...caso, nodos }
}

/**
 * Signos tecleados → signos del modelo. Vacío = la decisión no lo toca
 * (se omite); «—» = no medible (null); un número en una clave numérica se
 * guarda como número; lo demás, como texto.
 */
export function normalizarSignos(signos = {}) {
  const out = {}
  for (const { clave } of SIGNOS) {
    if (!(clave in (signos || {}))) continue
    const crudo = signos[clave]
    if (crudo === null) { out[clave] = null; continue }
    const v = String(crudo ?? '').trim()
    if (!v) continue
    if (v === '—' || v === '-') { out[clave] = null; continue }
    if (clave === 'avdi') { out[clave] = v.toUpperCase(); continue }
    if (NUMERICOS.has(clave) && /^\d+([.,]\d+)?$/.test(v)) { out[clave] = Number(v.replace(',', '.')); continue }
    out[clave] = v
  }
  return out
}

const limpio = (t) => String(t ?? '').trim()

/** Borrador del editor → caso con el formato de casosModelo.js. */
export function normalizarCaso(b) {
  const nodos = {}
  for (const [id, n] of Object.entries(b.nodos || {})) {
    const signos = normalizarSignos(n.signos)
    const base = {
      texto: limpio(n.texto),
      ...(Object.keys(signos).length ? { signos } : {}),
      ...(limpio(n.historia) ? { historia: limpio(n.historia) } : {}),
      ...(limpio(n.testigos) ? { testigos: limpio(n.testigos) } : {}),
      ...(limpio(n.sinCambio) ? { sinCambio: limpio(n.sinCambio) } : {}),
    }
    if (n.fin) {
      nodos[id] = { ...base, fin: true, desenlace: n.desenlace }
      continue
    }
    nodos[id] = {
      ...base,
      opciones: (n.opciones || []).map((o) => {
        const so = normalizarSignos(o.signos)
        return {
          texto: limpio(o.texto),
          va: o.va || '',
          tipo: o.tipo,
          retro: limpio(o.retro),
          ...(o.tema ? { tema: o.tema } : {}),
          ...(Object.keys(so).length ? { signos: so } : {}),
        }
      }),
    }
  }
  const signos = normalizarSignos(b.signos)
  return {
    id: b.id,
    titulo: limpio(b.titulo),
    resumen: limpio(b.resumen),
    estado: b.estado || 'borrador',
    ...(b.rol ? { rol: b.rol } : {}),
    ...(b.paciente ? { paciente: b.paciente } : {}),
    ...(limpio(b.historia) ? { historia: limpio(b.historia) } : {}),
    ...(limpio(b.testigos) ? { testigos: limpio(b.testigos) } : {}),
    temas: [...new Set((b.temas || []).filter(Boolean))],
    fuentes: (b.fuentes || [])
      .map((f) => ({ nombre: limpio(f.nombre), ...(limpio(f.nota) ? { nota: limpio(f.nota) } : {}) }))
      .filter((f) => f.nombre),
    ...(Object.keys(signos).length ? { signos } : {}),
    inicio: b.inicio,
    nodos,
  }
}

/**
 * Avisos que el validador de forma no da pero que el autor necesita: una
 * opción que remite a una lección que el caso no cita, o una decisión sin
 * lección a la que remitir.
 */
export function avisosDeAutor(caso) {
  const avisos = []
  for (const [id, n] of Object.entries(caso.nodos || {})) {
    for (const [i, o] of (n.opciones || []).entries()) {
      if (!o.tema) avisos.push(`Opción ${i + 1} de «${id}»: elige la lección que la explica.`)
      else if (!caso.temas.includes(o.tema)) avisos.push(`Opción ${i + 1} de «${id}»: su lección no está en la lista del caso.`)
    }
  }
  return avisos
}

/** Caso de solo lectura (de PTEM o de otra fuente) → borrador editable nuevo. */
export function borradorDesde(caso, { titulo } = {}) {
  const texto = (v) => (v === null ? '—' : v === undefined ? '' : String(v))
  const signosTexto = (s) => Object.fromEntries(Object.entries(s || {}).map(([k, v]) => [k, texto(v)]))
  const nodos = {}
  for (const [id, n] of Object.entries(caso.nodos || {})) {
    const relato = { historia: n.historia || '', testigos: n.testigos || '', ...(n.sinCambio ? { sinCambio: n.sinCambio } : {}) }
    nodos[id] = n.fin
      ? { texto: n.texto, fin: true, desenlace: n.desenlace, signos: signosTexto(n.signos), ...relato }
      : {
          texto: n.texto,
          signos: signosTexto(n.signos),
          ...relato,
          opciones: (n.opciones || []).map((o) => ({
            texto: o.texto, tipo: o.tipo, va: o.va, retro: o.retro, tema: o.tema || '', signos: signosTexto(o.signos),
          })),
        }
  }
  return {
    id: '',
    titulo: titulo ?? caso.titulo,
    resumen: caso.resumen || '',
    estado: 'borrador',
    rol: caso.rol || 'tum',
    paciente: caso.paciente || 'adulto',
    historia: caso.historia || '',
    testigos: caso.testigos || '',
    temas: [...(caso.temas || [])],
    fuentes: (caso.fuentes || []).map((f) => ({ nombre: f.nombre || '', nota: f.nota || '' })),
    signos: signosTexto(caso.signos),
    inicio: caso.inicio,
    nodos,
  }
}
