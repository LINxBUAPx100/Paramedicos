# Plan de integración masiva de imágenes — PTEM

Estado: **plan aprobado, sin ejecutar**. La decisión de hosting está tomada y la
capa técnica que la sostiene ya está escrita y probada; lo que falta es el
material. No se ha subido ninguna imagen todavía.

## 1. El problema que resuelve

Hoy las imágenes del temario viven en Google Drive (`src/data/imagenes.js`, 21
enlaces). Eso trae tres fallos que ya se notan:

1. **No se ven completas.** Los diagramas se pintaban dentro de una caja 16/10
   con recorte (`object-fit: cover`). *(Corregido: ver §5.)*
2. **Drive no es un hosting de imágenes.** El enlace directo no está garantizado
   —Google cambia dominios y limita el tráfico automatizado—, cada archivo hay
   que compartirlo a mano como «cualquiera con el enlace», y una imagen que
   alguien mueva de carpeta desaparece del temario sin aviso.
3. **No hay cobertura.** 21 imágenes para 287 temas. El objetivo es **al menos
   una imagen por tema**.

## 2. Dónde van a vivir: en el propio sitio

Las imágenes se guardan en **`public/imagenes/…`** del repositorio y se publican
con el sitio.

Por qué esta opción y no las otras:

| Opción | Funciona en GitHub Pages | Coste | Subida | Riesgo |
|---|---|---|---|---|
| **Carpeta del repo** | Sí, es el mismo origen | 0 | copiar archivos + push | tamaño del repo |
| Firebase Storage | Sí (URL externa) | requiere plan **Blaze** | botón en la app | hoy está **apagado** (`archivosModelo.js`: `STORAGE_ACTIVO`) |
| Drive / terceros | frágil | 0 | manual | enlaces que caducan, sin control |

Firebase Storage no se descarta a futuro: el código de subida y sus reglas están
escritos y se prueban en CI contra el emulador. El día que haya Blaze se
enciende con `VITE_STORAGE_ACTIVO=1` y convive con lo anterior — las rutas del
contenido no cambian, porque de eso se encarga la capa de §3.

### Presupuesto de peso

GitHub Pages admite hasta 1 GB por sitio y recomienda no pasar de 100 MB por
archivo. Con **287 imágenes a ≤200 KB** (WebP, 1200 px de ancho) el material
completo ocupa **~57 MB**: entra de sobra y el sitio sigue cargando rápido.
Regla práctica: ninguna imagen del temario debe superar **300 KB**.

## 3. La capa que hace posible migrar de hosting

**Ya implementada** en `src/lib/img.js` y probada en `tests/img.test.mjs`.

El contenido guarda **rutas relativas**, nunca URLs:

```js
{ tipo: 'imagen', src: 'imagenes/m2/nefrona.webp', alt: 'Nefrona', caption: '…' }
```

`rutaImagen()` es el **único** punto donde se decide de dónde se sirve:

- hoy antepone el `BASE_URL` que Vite calcula (GitHub Pages publica bajo
  `/Paramedicos/`, y por eso una ruta escrita a mano con `/` inicial se rompería);
- mañana, con otro hosting o un CDN, se define `VITE_IMAGENES_BASE` y **cambia
  esa función y nada más**: ni una ruta de los 287 temas se toca;
- una URL absoluta se respeta tal cual, así que el material que siga en Drive
  funciona mientras dure la migración.

`driveSrc()` reconoce las tres fuentes (propia, Drive, externa) y `driveSrcSet()`
no inventa un `srcset` falso para las propias: sin servidor que redimensione,
ofrecer cuatro veces la misma URL solo hace que el navegador descargue de más.

## 4. Convención de archivos

```
public/imagenes/
  m1/  propedeutico/…        ← una carpeta por módulo
  m2/  cuerpo-humano/…
  …
```

- **Nombre**: el id del tema, o el id del tema + sufijo si lleva varias.
  `m2-anatomia-cardiovascular.webp`, `m2-anatomia-cardiovascular-2.webp`.
- **Formato**: WebP (respaldo PNG solo para esquemas con texto fino).
- **Ancho**: 1200 px. Más no se aprovecha: el contenedor de lectura mide 720 px.
- **Sin texto quemado** cuando se pueda evitar: no se puede traducir ni leer con
  lector de pantalla. Lo que explica la imagen va en `caption` y en `alt`.

## 5. Lo que ya está corregido

- **Imágenes completas**: `Imagen` aceptaba `figura` y `rounded` pero **ignoraba
  `completa`**, la propiedad que los diagramas del temario venían pidiendo desde
  siempre (`Contenido.jsx` pinta `<Imagen … completa />`). Los estilos
  `.imagen--completa` existían y no los aplicaba nadie: por eso los diagramas
  salían recortados. Ahora la propiedad existe y con ella la imagen se muestra
  entera, a su proporción natural, con el pie debajo.
- **Rutas propias**: `rutaImagen()`, `esImagenPropia()` y sus pruebas.

## 6. Qué falta, en orden

1. **Reunir el material** (es lo único que no puede hacer el código). Fuentes
   admisibles: obra propia, dominio público, licencias libres con atribución
   (Wikimedia Commons, OpenStax, Servier Medical Art) o material con permiso
   escrito de la academia. **No** capturas de manuales protegidos: el temario ya
   arrastra deuda bibliográfica y una imagen copiada de PHTLS no se puede
   publicar.
2. **Convertir y pesar**: script `scripts/optimizar-imagenes.mjs` (pendiente,
   mismo patrón que `optimizar-hero.mjs`) → WebP 1200 px, ≤300 KB, informe de
   los que se pasen.
3. **Enganchar cada imagen a su tema**: bloque `imagen` en las secciones del
   tema, con `alt` y `caption` escritos, y la ficha de fuente cuando la licencia
   lo exija.
4. **Tablero de cobertura**: `npm run inventario` amplía su informe con «temas
   sin imagen», para que el avance se vea sin abrir 287 páginas.
5. **Prueba de regresión**: ningún tema publicado sin imagen, y ninguna ruta de
   imagen apuntando a un archivo que no exista en `public/imagenes/`. Es la
   misma clase de control que ya impide citar una fuente inexistente.

Los pasos 2 a 5 son mecánicos y se pueden ejecutar en cuanto haya material del
paso 1, que es el cuello de botella real.
