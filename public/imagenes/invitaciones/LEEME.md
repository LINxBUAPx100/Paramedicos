# Imágenes de invitación

La página **no diseña** la invitación: usa la imagen que dejes en esta carpeta y
escribe encima **solo el código**.

## Qué archivos poner

| Archivo | Se usa en |
|---|---|
| `invitacion-alumno.png` | invitaciones de alumno |
| `invitacion-profesor.png` | invitaciones de profesor |
| `invitacion-director.png` | invitaciones de dirección |
| `invitacion.png` | códigos de academia, de grupo y de prueba |

Si quieres **una sola imagen para todo**, deja solo `invitacion.png` y pon ese
mismo nombre en las cuatro claves de `IMAGENES`, en
`src/lib/tarjetaInvitacion.js`.

Mientras un archivo no exista, la pantalla lo dice con todas sus letras en vez
de inventarse un fondo: es lo que evita que salga a WhatsApp una imagen que
nadie diseñó.

## Cómo debe ser la imagen

- **PNG o JPG.** Formato apaisado o vertical, da igual: el código se coloca en
  proporción, así que funciona con cualquier medida.
- **Vertical 4:5 (por ejemplo 1080 × 1350 px)** es lo que WhatsApp muestra sin
  recortar en la vista previa del chat. Si es muy ancha, WhatsApp la recorta.
- **Deja libre el hueco del código.** Por defecto se escribe centrado a un 62 %
  de la altura. Si tu diseño lo quiere en otro sitio, se cambia en un único
  lugar: `POSICION_CODIGO`, en `src/lib/tarjetaInvitacion.js`.
- **Peso:** por debajo de 300 KB. La imagen viaja por WhatsApp y se publica con
  el sitio.

## Ajustar dónde va el código

Todo está en `POSICION_CODIGO` (`src/lib/tarjetaInvitacion.js`) y en
proporciones de 0 a 1, no en píxeles, para que valga con cualquier resolución:

```js
export const POSICION_CODIGO = {
  x: 0.5,        // 0 = izquierda, 0.5 = centro, 1 = derecha
  y: 0.62,       // 0 = arriba, 1 = abajo
  tam: 0.062,    // altura de la letra respecto al alto de la imagen
  maxAncho: 0.82,// si el código no cabe, se encoge solo
  color: '#ffffff',
  sombra: true,  // contorno oscuro: legible sobre fotos y fondos claros
}
```

## Cómo se envía

- **En el teléfono:** botón «Enviar imagen» → se abre el menú de compartir del
  sistema, con WhatsApp incluido.
- **En computadora:** WhatsApp **no acepta archivos por enlace** (`wa.me` solo
  transporta texto), así que el botón copia la imagen al portapapeles y se pega
  en el chat con `Ctrl+V`. Si el navegador no permite copiar imágenes, se
  descarga para adjuntarla a mano.
