# Guía para enriquecer los temas (videos, fuentes, imágenes, profundidad y actividades)

Esta guía explica **paso a paso** cómo dejar cualquier tema al nivel del prototipo ya hecho
(`biologia-celular-bioquimica`, Fase 1). El mecanismo (componentes, estilos, render) **ya está
construido**: solo hay que **agregar dos campos de datos** a cada tema y, si quieres, una sección
de contenido extra. No hay que tocar componentes ni CSS.

> Regla de oro: **nunca inventes URLs**. Los enlaces de videos/fuentes/imágenes deben venir de una
> búsqueda real (WebSearch) o de Wikimedia Commons. Un enlace muerto en una app médica es peor que
> no tener enlace.

---

## 1. Dónde se edita

Los temas viven en `src/data/`:

| Fase | Archivos | Nº temas |
|------|----------|----------|
| 1 | `fase1.js` (3) + `extraFase1.js` (9) | 12 |
| 2 | `fase2.js` + `extraFase2.js` | … |
| 3 | `fase3.js` + `extraFase3.js` | … |
| 4 | `fase4.js` + `extraFase4.js` | … |
| 5 | `fase5.js` + `extraFase5.js` | … |
| 6–7 | `fase6.js`, `fase7.js` (sin extra) | … |

Cada tema es un objeto con: `id`, `numero`, `titulo`, `icono`, `duracion`, `resumen`,
`objetivos`, `secciones`, `conceptosClave`, `flashcards`, `quiz`.
**Agregamos dos campos nuevos al final del objeto del tema: `recursos` y `actividades`.**

---

## 2. Campo `recursos` (videos + fuentes + imágenes)

Se renderiza con `src/components/Recursos.jsx` justo después del contenido del tema.

```js
recursos: {
  videos: [
    { titulo: 'Título del video', canal: 'Canal', url: 'https://www.youtube.com/watch?v=XXXX' },
  ],
  fuentes: [
    { titulo: 'Nombre del artículo', tipo: 'StatPearls', url: 'https://www.ncbi.nlm.nih.gov/books/NBKxxxxxx/' },
  ],
  imagenes: [
    // con src real (Wikimedia) → se ve la imagen; sin src → placeholder "pega el enlace aquí"
    { src: 'https://upload.wikimedia.org/wikipedia/commons/x/xx/Archivo.svg', caption: 'Pie (fuente, licencia)', busqueda: 'términos de respaldo' },
  ],
}
```

### Cómo conseguir VIDEOS reales (YouTube)
WebSearch limitando a YouTube y eligiendo canales serios (universidades, FOAMed/medicina de
urgencias en español):
```
WebSearch  query: "<tema> explicación"   allowed_domains: ["youtube.com"]
```
Copia el `url` tal cual del resultado (`https://www.youtube.com/watch?v=...`). 2–3 por tema.

### Cómo conseguir FUENTES reales
WebSearch a fuentes de autoridad (StatPearls/NCBI son ideales y en abierto):
```
WebSearch  query: "<tema en inglés> physiology StatPearls"   allowed_domains: ["ncbi.nlm.nih.gov"]
```
También sirven Khan Academy, MSD Manuals, guías oficiales (AHA, ERC). 2–3 por tema.

### Cómo conseguir IMÁGENES reales (Wikimedia Commons — libres y embebibles)
```
WebSearch  query: "<tema> diagram"   allowed_domains: ["commons.wikimedia.org"]
```
Del resultado toma el nombre de archivo (aparece como `File:Nombre_Del_Archivo.svg`). Úsalo en una
de estas dos URLs (ambas funcionan dentro de `<img>`):
- Estable: `https://commons.wikimedia.org/wiki/Special:FilePath/Nombre_Del_Archivo.svg`
- Directa: `https://upload.wikimedia.org/wikipedia/commons/x/xx/Nombre_Del_Archivo.svg`

> Wikimedia **sí** carga embebida (Google Drive no: el navegador/preview lo bloquea por ORB).
> Si no encuentras imagen, deja el objeto **sin `src`** (solo `caption` + `busqueda`): se mostrará
> un placeholder para que el usuario pegue su enlace de Drive.

---

## 3. Campo `actividades` (interactivo)

Se renderiza con `src/components/Actividades.jsx` después de "Conceptos clave".
Hay **4 actividades**; las tres con datos son opcionales:

```js
actividades: {
  // 1) ORDENAR: los pasos van en ORDEN CORRECTO; el componente los baraja solo.
  ordenar: {
    titulo: 'nombre del proceso',
    pasos: ['Paso 1…', 'Paso 2…', 'Paso 3…', 'Paso 4…', 'Paso 5…'],
  },
  // 2) COMPLETAR: cloze. El hueco se marca con '___' (tres guiones bajos).
  completar: [
    { texto: 'La frase con un ___ que falta.', opciones: ['correcta', 'distractor', 'distractor'], correcta: 0, explicacion: 'Por qué.' },
  ],
  // 3) PREGUNTAS extra (aparte del quiz oficial)
  preguntas: [
    { pregunta: '¿…?', opciones: ['A', 'B', 'C', 'D'], correcta: 1, explicacion: 'Por qué.' },
  ],
}
```

> **4) UNIR PALABRAS** no necesita datos: se genera automáticamente desde `conceptosClave`
> (término ↔ definición). Por eso conviene que cada tema tenga 4–6 conceptos clave buenos.

Recomendado por tema: `ordenar` (5 pasos) + 2–3 `completar` + 2–3 `preguntas`.
Todo debe salir del contenido del propio tema (no inventes datos clínicos).

---

## 4. Profundizar el contenido

Añade 1 sección nueva al array `secciones` del tema (al final, antes de `conceptosClave`).
Tipos de bloque disponibles (los renderiza `src/components/Contenido.jsx`):

- `{ tipo: 'p', texto }` — párrafo
- `{ tipo: 'h3', texto }` — subtítulo
- `{ tipo: 'lista', titulo?, items: [...] }`
- `{ tipo: 'pasos', titulo?, items: [...] }` — lista numerada
- `{ tipo: 'tabla', titulo?, headers: [...], filas: [[...], ...] }`
- `{ tipo: 'callout', variante: 'clave'|'clinico'|'alerta'|'dosis', titulo?, texto }`
- `{ tipo: 'formula', texto, nota? }`
- `{ tipo: 'diagrama', clave }` — reutiliza la imagen del Atlas por `clave` (ver `ATLAS_TEMAS`)
- `{ tipo: 'imagen', src, caption?, busqueda?, ratio? }`

Una buena sección de profundidad: 1 `p` que explique el "porqué", 1 `tabla` comparativa y 1–2
`callout` clínicos (cómo se aplica en prehospitalario). Suma 1–2 `conceptosClave` nuevos.

---

## 5. Dónde pegar (ejemplo real)

En el objeto del tema, **después del array `quiz: [ … ]`** y antes de cerrar el tema con `},`:

```js
      quiz: [ /* … ya existe … */ ],
      recursos: { videos: [...], fuentes: [...], imagenes: [...] },
      actividades: { ordenar: {...}, completar: [...], preguntas: [...] },
    },   // <- cierre del tema
```

El tema `biologia-celular-bioquimica` en `src/data/fase1.js` es el **ejemplo completo** a copiar.

---

## 6. Verificar

```bash
npm run build      # debe compilar sin errores
npm run dev        # y revisar el tema en el navegador
```

Checklist por tema:
- [ ] 2–3 videos (URLs reales de YouTube, abren bien)
- [ ] 2–3 fuentes (URLs reales, StatPearls/NCBI u oficiales)
- [ ] 1–2 imágenes (Wikimedia con `src`, o placeholder sin `src`)
- [ ] 4–6 `conceptosClave` (alimentan "unir palabras")
- [ ] `ordenar` con 5 pasos en orden correcto
- [ ] 2–3 `completar` (hueco `___`)
- [ ] 2–3 `preguntas`
- [ ] (opcional) 1 sección nueva de profundidad

---

## 7. Resumen del flujo por tema (para repetir rápido)

1. WebSearch videos (`allowed_domains: youtube.com`) → 2–3 URLs.
2. WebSearch fuentes (`allowed_domains: ncbi.nlm.nih.gov`) → 2–3 URLs.
3. WebSearch imágenes (`allowed_domains: commons.wikimedia.org`) → nombre de archivo → `Special:FilePath`.
4. Redactar `ordenar`, `completar`, `preguntas` desde el contenido del tema.
5. (Opcional) Redactar 1 sección de profundidad + 1–2 conceptos clave.
6. Pegar `recursos` y `actividades` tras el `quiz` del tema.
7. `npm run build` y revisar.

Repetir tema por tema. Una fase a la vez para que rindan los tokens.
