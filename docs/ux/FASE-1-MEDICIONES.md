# Fase 1 — Mediciones y reproducciones

Ejecutar desde la raíz: `node docs/ux/medir-fase-1.mjs`. Usa dependencias ya instaladas. No conecta Firebase ni ejecuta handlers de escritura. Los casos sintéticos no representan alumnos reales.

## CSS: criterio

Se analiza todo index.css con PostCSS. Cada declaración cuenta aunque luego sea sobrescrita o pertenezca a un breakpoint. Los valores únicos son cadenas normalizadas, no valores computados equivalentes. «Con var» incluye valores mixtos con literales. No se cuentan definiciones --token dentro de estas familias. Colores incluye border completo; no es un conteo exclusivo de pigmentos.

## Resumen CSS

| Familia | Declaraciones | Valores distintos | Con var() | Sin var() |
|---|---|---|---|---|
| Tamaño de fuente | 666 | 46 | 630 | 36 |
| Familia de fuente | 195 | 10 | 180 | 15 |
| Altura de línea | 85 | 28 | 0 | 85 |
| Espaciado | 1643 | 200 | 1359 | 284 |
| Radios | 410 | 34 | 238 | 172 |
| Sombras | 68 | 26 | 57 | 11 |
| Colores de texto/fondo/borde | 2463 | 363 | 2039 | 424 |
| Transición/animación | 117 | 83 | 91 | 26 |

## Tamaño de fuente: 15 valores más frecuentes

| Valor | Declaraciones | Primera línea de index.css |
|---|---|---|
| var(--t-sm) | 258 | 248 |
| var(--t-xs) | 208 | 470 |
| var(--t-base) | 45 | 481 |
| var(--t-md) | 45 | 509 |
| var(--t-lg) | 29 | 694 |
| var(--t-xl) | 20 | 428 |
| var(--t-2xl) | 16 | 3131 |
| var(--t-3xl) | 7 | 2740 |
| .85rem | 1 | 1507 |
| .74rem | 1 | 1511 |
| clamp(2.6rem, 5.5vw, 4rem) | 1 | 2694 |
| clamp(1.6rem, 3vw, 2.1rem) | 1 | 2788 |
| clamp(1.6rem, 3.5vw, 2.2rem) | 1 | 2957 |
| clamp(1.4rem, 3vw, 2rem) | 1 | 3408 |
| clamp(2.8rem, 6vw, 5rem) | 1 | 3691 |

## Familia de fuente: 15 valores más frecuentes

| Valor | Declaraciones | Primera línea de index.css |
|---|---|---|
| var(--fuente-display) | 59 | 235 |
| var(--fuente-sub) | 58 | 303 |
| var(--fuente-cifra) | 49 | 593 |
| var(--fuente-cuerpo) | 10 | 225 |
| inherit | 8 | 750 |
| 'Cascadia Code' | 4 | 35 |
| var(--fuente-mono) | 3 | 5123 |
| 'JetBrains Mono', ui-monospace, monospace | 2 | 3298 |
| ui-monospace, SFMono-Regular, 'Cascadia Code', Consolas, monospace | 1 | 1072 |
| var(--fuente-cifra, monospace) | 1 | 4217 |

## Altura de línea: 15 valores más frecuentes

| Valor | Declaraciones | Primera línea de index.css |
|---|---|---|
| 1.5 | 14 | 1563 |
| 1 | 13 | 1033 |
| 1.25 | 7 | 2062 |
| 1.1 | 6 | 788 |
| 1.15 | 4 | 1699 |
| 1.35 | 4 | 2477 |
| 1.2 | 4 | 3408 |
| 1.45 | 4 | 5288 |
| 1.4 | 3 | 3479 |
| 1.55 | 3 | 4040 |
| 1.65 | 2 | 228 |
| 1.3 | 2 | 1511 |
| 1.02 | 2 | 2695 |
| 1.04 | 2 | 3719 |
| 1.6 | 2 | 8916 |

## Espaciado: 15 valores más frecuentes

| Valor | Declaraciones | Primera línea de index.css |
|---|---|---|
| var(--e-8) | 317 | 260 |
| var(--e-12) | 217 | 322 |
| var(--e-16) | 143 | 377 |
| 0 | 116 | 214 |
| var(--e-6) | 85 | 468 |
| var(--e-8) var(--e-12) | 61 | 262 |
| var(--e-24) | 60 | 401 |
| var(--e-4) | 60 | 510 |
| var(--e-20) | 44 | 491 |
| var(--e-32) | 34 | 1488 |
| 2px | 30 | 782 |
| var(--e-12) var(--e-16) | 29 | 450 |
| auto | 24 | 965 |
| 2px var(--e-8) | 16 | 639 |
| 0 auto | 15 | 417 |

## Radios: 15 valores más frecuentes

| Valor | Declaraciones | Primera línea de index.css |
|---|---|---|
| var(--radio-sm) | 142 | 264 |
| 999px | 87 | 638 |
| var(--radio) | 82 | 373 |
| 50% | 32 | 333 |
| var(--radio-lg) | 11 | 495 |
| 8px | 10 | 1507 |
| 12px | 6 | 2337 |
| 10px | 5 | 4831 |
| 22px | 3 | 3761 |
| 0 | 3 | 4130 |
| 14px | 2 | 1558 |
| 2px | 2 | 2317 |
| 18px | 2 | 2947 |
| 28px | 2 | 3577 |
| 24px | 2 | 3791 |

## Sombras: 15 valores más frecuentes

| Valor | Declaraciones | Primera línea de index.css |
|---|---|---|
| var(--sombra) | 18 | 2158 |
| var(--sombra-md) | 13 | 2135 |
| var(--sombra-lg) | 10 | 2612 |
| var(--sombra-color) | 3 | 2338 |
| none | 3 | 5037 |
| 0 16px 40px -10px rgba(0, 0, 0, 0.32) | 1 | 998 |
| 0 0 0 2px color-mix(in srgb, currentColor 22%, transparent) | 1 | 1868 |
| 0 10px 22px -10px rgba(0, 0, 0, 0.6) | 1 | 2621 |
| 0 16px 30px -12px rgba(0, 0, 0, 0.7) | 1 | 2622 |
| 0 10px 24px -8px color-mix(in srgb, var(--urgencia) 60%, transparent) | 1 | 2626 |
| 0 16px 34px -8px color-mix(in srgb, var(--urgencia) 70%, transparent) | 1 | 2628 |
| 0 10px 24px -10px color-mix(in srgb, var(--modulo-color) 70%, transparent) | 1 | 2632 |
| 0 26px 52px -12px color-mix(in srgb, var(--c, var(--primario)) 70%, transparent), inset -6px -8px 18px rgba(0, 0, 0, 0.28), inset 6px 8px 16px rgba(255, 255, 255, 0.25) | 1 | 3731 |
| 0 0 0 3px color-mix(in srgb, var(--primario) 28%, transparent) | 1 | 4050 |
| 0 6px 16px -4px color-mix(in srgb, var(--primario) 65%, transparent) | 1 | 4816 |

## Colores de texto/fondo/borde: 15 valores más frecuentes

| Valor | Declaraciones | Primera línea de index.css |
|---|---|---|
| var(--texto-2) | 246 | 266 |
| 1px solid var(--borde) | 193 | 496 |
| var(--texto-3) | 178 | 249 |
| var(--radio-sm) | 142 | 264 |
| var(--bg-2) | 126 | 478 |
| var(--texto) | 118 | 227 |
| var(--primario) | 110 | 301 |
| var(--bg-3) | 102 | 616 |
| 999px | 87 | 638 |
| var(--radio) | 82 | 373 |
| #fff | 62 | 302 |
| var(--urgencia) | 47 | 543 |
| none | 44 | 618 |
| var(--verde) | 43 | 542 |
| var(--modulo-color) | 42 | 2461 |

## Transición/animación: 15 valores más frecuentes

| Valor | Declaraciones | Primera línea de index.css |
|---|---|---|
| none | 10 | 3604 |
| var(--dur-rapida) | 6 | 3124 |
| transform var(--dur-media) var(--ease-out), box-shadow var(--dur-media) var(--ease-out) | 5 | 2725 |
| width var(--dur-lenta) var(--ease-out) | 4 | 2776 |
| opacity var(--dur-media) var(--ease-out) | 3 | 2832 |
| border-color var(--dur-rapida) ease, transform var(--dur-rapida) ease | 2 | 1249 |
| border-color var(--dur-rapida) var(--ease-out) | 2 | 1777 |
| var(--d, 0ms) | 2 | 2260 |
| 0.001ms | 2 | 2269 |
| background var(--dur-rapida) var(--ease-out), color var(--dur-rapida) var(--ease-out) | 2 | 2404 |
| transform var(--dur-rapida) var(--ease-out) | 2 | 2603 |
| transform var(--dur-media) var(--ease-out), box-shadow var(--dur-media) var(--ease-out), border-color var(--dur-media) var(--ease-out) | 2 | 2816 |
| var(--dur-media) var(--ease-out) | 2 | 2866 |
| transform var(--dur-media) var(--ease-out) | 2 | 4149 |
| border-color var(--dur-rapida), background var(--dur-rapida) | 2 | 4274 |

## Literales y condiciones

Literales hex distintos: 78. Condiciones @media distintas: 19. Los hex abreviados no se equiparan a los largos.

| Condiciones @media |
|---|
| (prefers-reduced-motion: no-preference) |
| (prefers-reduced-motion: reduce) |
| (max-width: 640px) |
| (max-width: 880px) |
| (max-width: 720px) |
| (max-width: 560px) |
| (max-width: 620px) |
| (hover: none) |
| print |
| (max-width: 1024px) |
| (hover: none), (max-width: 768px) |
| (max-width: 768px) |
| (max-width: 480px) |
| (min-width: 881px) |
| (min-width: 861px) |
| (min-width: 769px) |
| (min-width: 1500px) |
| (max-width: 600px) |
| (max-width: 900px) |

## Reglas comparables: lector, botones, formularios y tablas

Extracto de declaraciones fuente; conserva overrides y condiciones para no confundir la primera regla con el resultado final.

| Línea | Selector | Condición | Declaraciones |
|---|---|---|---|
| 484 | .acceso-restringido .btn btn--pildora | global | margin-top: var(--e-6) |
| 596 | .panel-tabla | global | width: 100%; font-size: var(--t-sm); min-width: 640px |
| 597 | .panel-tabla thead th | global | padding: var(--e-8) var(--e-12); font-family: var(--fuente-sub); font-size: var(--t-xs); color: var(--texto-3) |
| 609 | .panel-tabla td, .panel-tabla tbody th | global | padding: var(--e-8) var(--e-12); font-weight: 400 |
| 616 | .panel-tabla tbody tr:hover, .panel-tabla tbody tr.abierto | global | background: var(--bg-3) |
| 862 | .pc-form | global | gap: var(--e-12); padding: var(--e-12) var(--e-16); border-radius: var(--radio) |
| 871 | .pc-form label | global | gap: var(--e-4); font-size: var(--t-xs); font-weight: 600; color: var(--texto-2) |
| 879 | .pc-form select, .pc-form input | global | padding: var(--e-8) var(--e-8); border-radius: var(--radio-sm); background: var(--bg-2); color: var(--texto); font: inherit; font-size: var(--t-sm) |
| 1444 | .admin-form | global | gap: var(--e-12); margin-top: var(--e-8); padding: var(--e-16) var(--e-16); border-radius: var(--radio); background: var(--bg-2) |
| 1455 | .admin-form label | global | gap: var(--e-4); font-size: var(--t-xs); font-weight: 600; color: var(--texto-2); min-width: 150px |
| 1465 | .admin-form input, .admin-form select | global | padding: var(--e-8) var(--e-8); border-radius: var(--radio-sm); background: var(--bg-3); color: var(--texto); font: inherit; font-size: var(--t-sm); width: 100%; min-width: 0 |
| 1478 | .admin-form input[type='checkbox'] | global | width: auto; min-width: 0 |
| 2159 | .cuenta-form, .cuenta-unir | global | gap: var(--e-12) |
| 2160 | .cuenta-form label, .cuenta-unir label | global | gap: var(--e-6); font-family: var(--fuente-sub); font-size: var(--t-sm); font-weight: 600; color: var(--texto-2) |
| 2169 | .cuenta-form input, .cuenta-unir input | global | padding: var(--e-12) var(--e-12); border-radius: var(--radio-sm); background: var(--bg); color: var(--texto); font-family: var(--fuente-cuerpo); font-size: var(--t-base) |
| 2178 | .cuenta-form input:focus, .cuenta-unir input:focus | global | outline: none |
| 2557 | .btn | global | gap: var(--e-8); padding: var(--e-12) var(--e-20); border-radius: var(--radio-sm); font-family: inherit; font-size: var(--t-base); font-weight: 600 |
| 2607 | .btn--primario | global | background: linear-gradient(135deg, var(--primario), var(--primario-claro)); color: #fff |
| 2989 | .aviso-editorial | global | gap: var(--e-12); padding: var(--e-16); border-radius: var(--radio); background: var(--bg-2); margin-bottom: var(--e-24); max-width: 800px |
| 3206 | .c-parrafo | global | margin-bottom: var(--e-16); color: var(--texto) |
| 3236 | .c-tabla | global | width: 100%; font-size: var(--t-sm); background: var(--bg-2) |
| 3242 | .c-tabla th | global | background: var(--modulo-color); color: #fff; padding: var(--e-12) var(--e-12); font-weight: 600; font-size: var(--t-sm) |
| 3250 | .c-tabla td | global | padding: var(--e-12) var(--e-12); color: var(--texto-2) |
| 3256 | .c-tabla tbody tr:nth-child(even) | global | background: var(--bg-3) |
| 4790 | .tema-acciones .btn | @media (max-width: 480px) | width: 100% |
| 5578 | .curso-tarjeta .btn | global | margin-top: var(--e-8) |
| 6684 | .editor-guardar-fila .btn btn--pildora | global | gap: var(--e-6) |
| 6703 | .editor-acciones .btn btn--pildora, .editor-mover .btn btn--pildora | global | gap: var(--e-6); min-height: 40px |
| 6771 | .previa-fila .btn btn--pildora | global | gap: var(--e-6) |
| 7131 | .rp-tabla | global | width: 100%; font-size: var(--t-sm) |
| 7132 | .rp-tabla th, .rp-tabla td | global | padding: var(--e-8) var(--e-12) |
| 7138 | .rp-tabla thead th | global | font-size: var(--t-xs); color: var(--texto-3) |
| 7479 | .lp-via .btn | global | margin-top: var(--e-8) |
| 7905 | .cal-input | global | width: 56px; padding: var(--e-6); font-family: var(--fuente-cifra); font-size: var(--t-base); font-weight: 700; border-radius: var(--radio-sm); background: var(--bg-2); color: var(--texto) |
| 7917 | .cal-input:focus | global | outline: 2px solid color-mix(in srgb, var(--primario) 35%, transparent) |
| 7918 | .cal-input.ok | global | color: var(--verde) |
| 7919 | .cal-input.mal | global | color: var(--rojo) |
| 7920 | .cal-input.vacia | global | color: var(--texto-3) |
| 8225 | .revdoc-form | global | margin-top: var(--e-12); padding-top: var(--e-12); gap: var(--e-8) |
| 10165 | .rec-form | global | gap: var(--e-20) |
| 10302 | .rec-acciones .btn | @media (max-width: 900px) | width: 100% |

## Reproducciones aisladas

Render de servidor del componente real Quiz, no simulación de sus funciones. No comprueba eventos de navegador, foco, CSS calculado ni persistencia. La reproducción del error no modifica ni relaja las pruebas existentes.

| Sonda | Salida |
|---|---|
| Mismo borrador, dos caminos reales | {"bancoUnidad":0,"agregadoModulo":1,"agregadoGeneral":1} |
| Quiz vacío | TypeError: Cannot read properties of undefined (reading 'pregunta') |
| Quiz de control, no clínico | Render correcto; 575 caracteres; aria-pressed=false; aria-checked=false |
| Selección sin banco | [] |
| Banco vacío y motivo de unidad | {"banco":[],"motivo":{"clave":"sin-material","texto":"Los temas de este examen todavía no tienen preguntas redactadas. El examen se activará cuando su alcance tenga material aprobado."}} |
| 200 alumnos sintéticos sin intentos | {"total":200,"activos":0,"enRiesgo":0,"promedio":null} |

## Pares de contraste de referencia

Se calcula luminancia sRGB de colores opacos. El extremo claro de un degradado no demuestra por sí solo el contraste bajo cada glifo: es un candidato a verificar en navegador. No se certifica ninguna pantalla ni marca personalizada.

| Texto | Fondo | Ratio |
|---|---|---|
| #ffffff | #3f8ef0 | 3.31 |
| #ffffff | #0c5fc4 | 6.09 |
| #475569 | #ffffff | 7.58 |
| #b45309 | #fef3c7 | 4.51 |
| #10b981 | #ffffff | 2.54 |
| #ef4444 | #ffffff | 3.76 |
