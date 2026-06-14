# Ilustraciones — Fase 6: Farmacología Prehospitalaria Avanzada

Cada bloque de tipo `imagen` en `src/data/fase6.js` reserva un espacio para una ilustración
externa (foto, algoritmo, ECG…). Los esquemas conceptuales propios se dibujan en SVG dentro de
`src/components/Diagramas.jsx` (bloques de tipo `diagrama`).

## Cómo insertar una imagen

Tienes **dos opciones** para cada bloque `imagen`:

### Opción A — Archivo local
1. Descarga la imagen (p. ej. desde el botón «Buscar en Google Imágenes» del placeholder).
2. Guárdala en esta carpeta: `public/img/farmacologia/`
3. En `src/data/fase6.js`, busca el bloque y rellena `src`:
   ```js
   { tipo: 'imagen', src: '/img/farmacologia/algoritmo-bradicardia.png', caption: '...', fuente: '...', fuenteUrl: '...' }
   ```

### Opción B — Enlace (URL)
Pega directamente la URL de la imagen en `src`:
```js
{ tipo: 'imagen', src: 'https://upload.wikimedia.org/...png', caption: '...', fuente: 'Wikimedia Commons', fuenteUrl: 'https://...' }
```

## Mientras no haya imagen
El bloque muestra un **placeholder** con un botón que busca el término sugerido (`busqueda`)
en Google Imágenes. Si una URL se rompe, vuelve a mostrar el placeholder automáticamente.

> Usa imágenes de **dominio público / Creative Commons** (Wikimedia Commons, StatPearls/NCBI,
> guías de acceso abierto) y respeta la atribución en el campo `fuente`.
