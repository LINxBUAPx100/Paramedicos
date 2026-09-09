# Fotos del botiquín

El aspecto de cada artículo se declara en **`src/data/botiquin/piezas.js`**. Ese
es el archivo que se edita para cambiar cómo se ve una pieza; el catálogo
(`catalogoInicial.js`) no se toca, porque ahí vive el contenido docente.

```js
export const PIEZAS_BOTIQUIN = {
  "gasa-esteril": {
    imagen: "botiquin/gasa-esteril.png", // ruta bajo public/imagenes/
    tamanoCm: 10,                        // lado mayor REAL del objeto
    grosorCm: 1,                         // fondo real: le da volumen
    orientacion: "sigue",                // sigue | fija | acostada
    giro: 0,                             // grados sobre el eje vertical
  },
}
```

| Campo | Qué hace |
|---|---|
| `imagen` | Ruta bajo `public/imagenes/`. PNG, WebP o AVIF, **con fondo transparente** |
| `tamanoCm` | Proporción entre piezas. La referencia son 12 cm: `24` sale al doble de grande, `6` a la mitad. Tope en 3.4× para que una pieza grande no tape la bandeja |
| `grosorCm` | Grosor del sólido. Con `0` la pieza es una lámina y de canto desaparece |
| `orientacion` | `sigue` de pie girando hacia la cámara · `fija` de pie y quieta · `acostada` tendida en la bandeja, como al abrir el botiquín |
| `giro` | Grados sobre el eje vertical. En `acostada` gira dentro del plano de la bandeja; en `fija` decide hacia dónde mira. Se ignora en `sigue` |

Un artículo que no aparezca en la tabla se dibuja como siempre, con la forma
procedural de su `preset`. No hace falta declararlos todos para empezar.

## El grosor es real

No son dos planos pegados: se traza el **contorno del canal alfa** de la foto y
se extruye, así que el canto sigue la silueta del objeto y sus huecos internos
—el arco de un estetoscopio, el ojo de unas tijeras— siguen siendo agujeros. Lo
hace [`src/features/botiquin3d/relieveFoto.js`](../../../src/features/botiquin3d/relieveFoto.js).

Dos caídas, para que nada se quede en blanco: si la foto no da una silueta
usable, la pieza se dibuja como lámina; si el archivo no existe o no carga, cae
a su forma procedural.

**De ahí que el fondo transparente no sea un detalle estético.** Una foto con
fondo blanco no tiene silueta: su contorno es el rectángulo de la imagen, y se
extruiría como un ladrillo con una foto encima.

## Cómo debe ser la foto

| | |
|---|---|
| Fondo | **Transparente de verdad** (canal alfa), no blanco |
| Encuadre | El objeto solo, centrado, sin recortarse por los bordes |
| Tamaño | ~1024 px de lado mayor. Más grande solo engorda la descarga del alumno |
| Formato | PNG con alfa. WebP o AVIF si ya vienen optimizados |
| Proporción | La de la pieza real: el alto manda y el ancho sale de la proporción de la foto |
| Orientación | Como se ve el objeto al tomarlo del botiquín |

## Licencia — esto no es opcional

PTEM declara procedencia y licencia de cada uno de sus activos
(`docs/INVENTARIO-ACTIVOS-MEDICOS.md`, `npm run activos:importar`). **No se usan
fotos de producto de fabricantes ni imágenes tomadas de buscadores**: son
material con derechos y suelen llevar marca visible.

Lo correcto, y además lo mejor pedagógicamente, es **fotografiar el equipo real
de la academia**: la licencia es propia y el alumno reconoce el material que va
a tener en las manos.

## Estado

Esta carpeta está vacía todavía. La única pieza declarada es el estetoscopio y
usa `medical/smart/ic-estetoscopio.png` del catálogo sellado como
**calibración**. Es un icono de línea, no una foto: su silueta extruida sale
como un alambre. Sirve para comprobar tamaño, orientación y apoyo, no para
juzgar el acabado — eso se ve con la primera foto real.
