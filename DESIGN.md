# DESIGN.md — La Guía de Lin

Especificación visual del rediseño "orgánico y soñador". Construye sobre la base
actual (React + Vite, CSS con variables, tema claro/oscuro, fuente Space Grotesk + Inter).

## 1. Visual Theme & Atmosphere
**Filosofía:** clínico pero humano. Menos rejilla rígida, más formas que respiran.
**Atmósfera:** suave, aireada, con luz difusa y blobs orgánicos que flotan despacio.
**Definición en una frase:** "Un cuaderno de estudio que se siente como aire y agua: redondo, fluido y sin esquinas duras."
**Inspiración (referencias del usuario):** degradados soñadores tipo nube (ActiveHop, Everest), blobs cálidos y círculos flotantes (UI/UX peach), profundidad flotante. Se descarta el look "cajas cuadradas".

## 2. Color Palette & Roles
Marca teal/esmeralda + washes atmosféricos cian/lavanda/durazno muy tenues.
```css
--primario:#0d9488; --primario-claro:#2dd4bf; --primario-oscuro:#0f766e;
--cian:#06b6d4; --azul:#0ea5e9; --morado:#8b5cf6;
/* washes atmosféricos (muy baja opacidad en uso) */
--wash-a: 13 148 136;   /* teal  */
--wash-b: 6 182 212;    /* cian  */
--wash-c: 139 92 246;   /* lavanda */
--wash-d: 251 191 156;  /* durazno suave */
/* claro */ --bg:#eef2f7; --bg-2:#fff; --bg-3:#f4f7fb; --texto:#0b1220; --texto-2:#475569;
/* oscuro */ --bg:#070b14; --bg-2:#0f1726; --texto:#e9eef6;
```
Roles: `primario`=marca/CTA; washes=fondo atmosférico (radial-gradients, no filter:blur en movimiento); color de fase=acento por tarjeta.

## 3. Typography Rules
- Display/títulos: **Space Grotesk** (600/700), `letter-spacing:-0.018em`.
- Cuerpo: **Inter** (400/500/600), `line-height 1.65`.
- Mono: JetBrains Mono (fórmulas/código).
- `@import` vía Google Fonts en index.html (display=swap). Escala: 12/14/16/18/24/32/48/64.
- Prohibido: fuentes serif decorativas, pesos <400 en cuerpo.

## 4. Component Stylings (estados completos)
- **Botón primario:** gradiente teal→cian, radio pill (`--radio` 16px+), sombra de color; hover `translateY(-2px)`+sombra; active `scale(.97)`; focus anillo 2px `--primario-claro`; disabled opacidad .5.
- **Tarjeta (fase/modo/stat):** radio grande (24–30px), superficie `--bg-2`, sombra suave; **sin borde duro** (borde 1px casi invisible); hover: elevar + **spotlight** que sigue el cursor (`radial-gradient at var(--mx) var(--my)`); focus-visible anillo.
- **Nav item:** activo = fondo teal tenue + barra-acento izquierda; hover suave; transición 180ms.
- **Link:** color `--primario-claro`, subrayado al hover.

## 5. Layout Principles
- Rejilla fluida `auto-fill minmax(290px,1fr)`, pero **romper la uniformidad**: stats flotan con offsets verticales alternos; blobs orgánicos detrás.
- Contenedor máx ~1100px centrado, gutters `clamp(18px,4vw,56px)`.
- Espaciado base 4/8; ritmo de secciones 24/40/64.
- Esquinas: nada menor a 14px; héroe/tarjetas 24–30px; botones/píldoras 999px.

## 6. Depth & Elevation
Sombras suaves en capas + sombra teñida por color de fase. Escala: `--sombra` (sutil), `--sombra-md`, `--sombra-lg`, `--sombra-color` (glow de marca/fase). Sin bordes marcados; la profundidad la da la sombra y el fondo.

## 7. Animation & Interaction — nivel **L2** (fluido)
- **Fondo:** aurora/mesh de blobs que derivan lento (`transform`, sin `filter:blur` en movimiento; el suavizado viene de radial-gradients). 1 capa, GPU-cheap.
- **Entrada por scroll:** `IntersectionObserver` → fade+rise (28px, 700ms, `cubic-bezier(.22,1,.36,1)`), con **stagger** 60–90ms.
- **Hero H1:** acento con flujo de gradiente (`background-position`).
- **Hover:** tarjetas elevan + **spotlight** que sigue el cursor (`--mx/--my`, 1 repaint).
- **Press:** `scale(.97)`.
- **Scroll:** nativo `scroll-behavior:smooth`.
- **Reduced motion:** `prefers-reduced-motion` desactiva derivas/reveals (todo visible, sin transform).
- Reglas de rendimiento: sin blur en elementos animados; `backdrop-filter ≤12px`; `pointermove` con guarda rAF; 0 WebGL.

## 8. Do's and Don'ts
**Do:** ✓ esquinas generosas; ✓ fondo atmosférico suave; ✓ animaciones que comunican (entrada/jerarquía); ✓ stagger; ✓ spotlight sutil; ✓ contraste AA (4.5:1); ✓ degradado teal→cian solo en acentos; ✓ reduced-motion completo.
**Don'ts:** ✗ cajas rectangulares de borde duro; ✗ `filter:blur` en elementos que se mueven; ✗ más de 1–2 efectos "wow" por pantalla; ✗ animar `width/height/top/left`; ✗ emojis como iconos estructurales en Home; ✗ degradados saturados sobre texto largo; ✗ animaciones >500ms en microinteracciones.

## 9. Responsive Behavior
- Breakpoints: 375 / 768 / 1024 / 1440.
- Móvil: hero a 1 columna (texto arriba, stats en fila scrollable o 2x2 compacto); blobs reducidos; sin spotlight en `(hover:none)`.
- Touch targets ≥44px; sin scroll horizontal; `min-h-dvh` donde aplique.
- Atmósfera y reveals se mantienen; en móvil se simplifican los blobs.
