# Temario legado — archivo, no contenido

Aquí vive el **temario anterior de PTEM** (cuando el proyecto se llamaba «La
Guía de Lin»), más el corpus que se intentó repartir automáticamente sobre el
plan oficial de R.E.S.C.A.T.E.

**Nada de esta carpeta llega al alumno, y nada de aquí se importa desde `src/`.**
Hasta el 5 de septiembre de 2026 estos archivos vivían mezclados con el código
vivo, en `src/data/` y `src/data/contenido/`: 1,8 MB de material en cuarentena
en las dos carpetas donde más se trabaja. Se movieron aquí sin tocar una línea
de su contenido.

## Qué hay

| Archivo | Qué es |
|---|---|
| `fase1.js` … `fase7.js` | Las siete fases del temario anterior |
| `extraFase1.js` … `extraFase5.js` | Temas ampliados que se anexaban a cada fase |
| `registro.js` | El registro que ordenaba y numeraba esas fases |
| `temarioOficial.js` | Un primer volcado del plan oficial, superado por `scripts/seed/plan-rescate.json` |
| `crear.js` | Ayudante de autoría del temario anterior |
| `reutilizado.js` | El corpus legado repartido sobre los 287 temas oficiales **por coincidencia de palabras** |

## Por qué no se borra

Dos razones, y las dos importan:

1. **Trazabilidad.** `reutilizado.js` es la prueba de qué se llegó a mostrar al
   alumno antes de la cuarentena. La auditoría midió que 85 de 202 temas
   poblados mezclaban piezas de tres o más lecciones de origen; borrar el
   corpus borra la evidencia.
2. **Material aprovechable.** Las fases contienen 374 preguntas y 457
   flashcards redactadas a mano. Sirven de **borrador** para quien reescriba un
   tema, nunca de contenido publicable.

`CLAUDE.md` §4 lo prohíbe expresamente hasta que el dueño del proyecto autorice
la eliminación.

## Cómo se usa (y cómo no)

- ✅ Abrir un archivo y leerlo como punto de partida al redactar un tema.
- ✅ `src/data/contenido/index.js` lo exporta como `BORRADORES_LEGADO` y
  `tieneBorradorLegado(temaId)`, que usan el inventario y el panel docente para
  priorizar.
- ❌ Volver a repartirlo por similitud de palabras, IDF o embeddings. Eso es lo
  que causó el problema. El script que lo hacía (`scripts/mapear-legado.mjs`) se
  retiró del repositorio el 5 de septiembre de 2026 por ser exactamente el tipo
  de herramienta que alguien vuelve a ejecutar «solo para ver».
- ❌ Importarlo desde `src/`. `tests/limpieza.test.mjs` lo impide.
