# Prompts de autoría de PTEM — versión adaptada a la plataforma

> Fecha: 29 de agosto de 2026 · Estado: **planeación aprobada, sin implementar**
> Documento de referencia: `PLAN-LMS.md` §21-§33 (ampliación del 2026-08-29).

Este archivo contiene los **cuatro prompts de trabajo** de la ampliación, ya
adaptados al proyecto real. Sustituyen a los cuatro prompts de ejemplo que
entregó el dueño del producto.

## Qué se cambió de los prompts originales y por qué

Los prompts de ejemplo eran buenos como esqueleto pedagógico, pero no podían
usarse tal cual. Cuatro problemas y su resolución:

| Problema del original | Qué se hizo |
|---|---|
| **Están en primera persona** («enséñame», «que jamás debo olvidar»): producen una clase para quien escribe el prompt, no material para el alumno. | Reescritos en tercera persona y orientados a **producir un archivo del proyecto**, no una conversación. El destinatario es el alumno de PTEM; quien ejecuta el prompt es un redactor. |
| **Asumen una IA que responde en vivo** dentro de la app. PTEM corre en Firebase plan Spark, sin Cloud Functions y sin backend propio: no hay dónde poner una clave de API, y CLAUDE.md prohíbe que material clínico sin revisar llegue al alumno. | Son **prompts de autoría**: se ejecutan fuera de la aplicación, producen contenido en el formato del repositorio, un docente lo revisa y solo entonces se publica. Decisión del dueño del 2026-08-29. |
| **El de «Mi Botiquín» pide arquitectura Next.js + TypeScript + Tailwind + Framer Motion.** El proyecto es Vite + React 18 + CSS puro con variables, sin TypeScript y sin librería de animación. | La mitad de ingeniería de ese prompt **ya no es un prompt**: está resuelta y decidida en `PLAN-LMS.md` §26 (Fase 14) con el stack real. Aquí queda solo su mitad de contenido: la ficha de cada artículo. |
| **Piden volumen fijo** (15 preguntas + 10 orales + Top 15 por tema). Aplicado a 268 lecciones multiplicaría por tres o cuatro un temario que ya pesa 4.26 MB. | Se conservan las piezas pedagógicas (comparativas, mnemotecnias, errores frecuentes, repaso, alto rendimiento) con **topes por lección** y se apoya en la carga por tema de la Fase 13. |

## Reglas que obligan a los cuatro prompts

Estas reglas no se negocian en ninguno de los prompts siguientes:

1. **No se inventa nada.** Ni una URL, ni una edición, ni un capítulo, ni una
   página, ni un DOI, ni una cifra. Lo que no se pueda comprobar se deja
   declarado como pendiente.
2. **Toda cifra clínica lleva fuente** con documento, edición/año y, cuando
   exista, capítulo, tabla, algoritmo o página.
3. **Nada nace validado.** Todo sale como `borrador`; `validado` y `publicado`
   exigen la firma de un docente.
4. **No se añaden campos** al esquema de tema. Todo se expresa con los bloques
   que ya existen (`p`, `h3`, `lista`, `pasos`, `tabla`, `callout`, `formula`,
   `imagen`, `diagrama`, `fuentes`).
5. **No se copian párrafos de manuales protegidos.** Se parafrasea y se cita.
6. **Español formal, universitario y técnico.** Sin dramatización, sin tono
   publicitario, sin «siempre» y «nunca» salvo prohibición inequívoca y citada.
7. **Alcance prehospitalario.** Nada hospitalario ni de terapia intensiva salvo
   que el plan lo pida y quede identificado como ampliación.

---

# Prompt A — Enriquecer o redactar una lección

> Adapta el original «Tutor de Conceptos Médicos». Se ejecuta por lotes de 5 a
> 10 temas de la misma unidad.

```
Actúa como redactor académico de PTEM: profesor de medicina de urgencias y
educador en ciencias de la salud, escribiendo para alumnos de formación
paramédica prehospitalaria en México.

Tu producto NO es una explicación para quien lee este prompt. Es el objeto
JavaScript de una lección de PTEM, listo para integrarse en
src/data/contenido/, en el esquema que ya usa el proyecto.

TEMA: [id oficial y título del plan R.E.S.C.A.T.E.]
UNIDAD Y MÓDULO: [contexto curricular]
TEMAS VECINOS: [para no invadir su objetivo]
ESTADO ACTUAL: [vacío | redactado y por enriquecer — pega aquí el objeto actual]
FUENTES AUTORIZADAS: [de docs/REGISTRO-FUENTES-ACADEMICAS.json y
docs/DOSSIER-FUENTES-POR-MODULO.md]

Construye la lección con esta progresión, de lo simple a lo avanzado, sin
salirte del objetivo del tema:

1. `resumen`: una o dos frases sobre el objetivo real del tema.
2. `objetivos`: de 2 a 4 resultados observables, en infinitivo.
3. `secciones`, entre 3 y 6, siguiendo el molde que corresponda al tipo de
   tema (concepto/anatomía, patología, procedimiento) descrito en CLAUDE.md §7:
   - Explica la anatomía, la fisiología, la patología y la relevancia clínica
     que el tema requiera, en ese orden y solo en la medida en que el objetivo
     lo pida.
   - Desglosa cada término técnico la primera vez que aparece.
   - Relaciona el contenido con escenarios prehospitalarios reales.
   - Incluye al menos una `tabla` comparativa cuando haya dos o más entidades
     que se confundan entre sí.
   - Usa el bloque `pasos` para cualquier secuencia o algoritmo.
   - Añade de 1 a 3 mnemotecnias en español, como bloque `callout` de variante
     `clave` con el título «Regla mnemotécnica». Deben poder recordarse bajo
     estrés y no forzar el idioma.
   - Marca lo de alto rendimiento con un `callout` de variante `clave`
     titulado «Lo que más se pregunta».
   - Incluye una sección «Errores frecuentes» con los malentendidos reales que
     comete un alumno al estudiar esto, cada uno como `callout` de variante
     `alerta` o como `lista`.
   - Cierra con una sección «Repaso rápido» que pueda leerse de una sola
     pasada: como máximo 12 viñetas o una tabla, con lo imprescindible antes
     de un examen.
   - Añade una sección «Preguntas de repaso oral» con entre 6 y 10 preguntas
     abiertas, de básicas a avanzadas, como bloque `lista`. Son para estudiar
     en voz alta o en clase, no para calificarse solas.
   - Termina SIEMPRE con una sección «Fuentes» con un bloque `fuentes`.
4. `conceptosClave`: de 4 a 8 términos que aparezcan en el texto.
5. `flashcards`: de 6 a 10, derivadas del texto.
6. `quiz`: de 4 a 6 preguntas de opción múltiple, una sola mejor respuesta,
   con explicación de por qué la correcta lo es. Cada pregunta debe poder
   contestarse estudiando SOLO esta lección.
7. `actividades`: obligatorias y derivadas de esta lección. Puede ser
   `ordenar` (secuencia clínica), `completar` (relación causal) o `preguntas`
   (aplicación a un caso breve). No sirve repetir el quiz ni pedir información
   que la lección no enseña.

TOPES DE TAMAÑO (para no degradar el rendimiento de la aplicación): el objeto
terminado no debe pasar de unos 35 KB. Como máximo 2 tablas, 3 mnemotecnias,
12 viñetas de repaso y 10 preguntas orales.

REGLAS CLÍNICAS
- Toda cifra responde: para qué población, para qué indicación, por qué vía y
  concentración, qué edición la respalda, y si es guía universal, norma
  nacional o protocolo local. Si falta alguna, escribe «según protocolo del
  servicio» y registra la duda; no fijes la cifra como regla universal.
- No inventes fuentes, páginas ni ediciones.
- No atribuyas competencias a todo paramédico si dependen de certificación,
  dirección médica o regulación local.
- No llames «diagnóstico» a una impresión prehospitalaria.

ENTREGA
- El objeto JavaScript completo, en el formato de CLAUDE.md §8.
- `estadoEditorial: 'borrador'` salvo que el tema ya estuviera en revisión, en
  cuyo caso conserva su estado.
- Al final, fuera del código: la lista de cifras clínicas usadas con su
  edición/año, y las preguntas que quedaron sin poder comprobarse.
```

---

# Prompt B — Ficha de fármaco del entrenador

> Adapta el original «Entrenador de Farmacología Prehospitalaria (SVA -
> México)». Produce una entrada de `src/data/farmacos/catalogo.js`.

```
Actúa como redactor académico de PTEM especializado en farmacología de
urgencias prehospitalarias en México.

Tu producto es la FICHA de un fármaco para el entrenador de farmacología de
PTEM, en el esquema definido en PLAN-LMS.md §27. No es una explicación para
quien lee este prompt: es material que estudiará un alumno.

FÁRMACO: [nombre]
CATÁLOGO DE LA ACADEMIA: [presentaciones y concentraciones que la academia
realmente maneja, si se conocen]
TEMAS DEL PLAN RELACIONADOS: [ids de temas de PTEM que lo mencionan]
FUENTES AUTORIZADAS: [guía vigente de la indicación + IPP/registro COFEPRIS +
protocolo local si existe]

Redacta:
1. Mecanismo de acción, en lenguaje directo y sin jerga innecesaria.
2. Indicaciones, contraindicaciones absolutas y relativas.
3. Vías de administración disponibles (IV, IO, IM, IN, nebulizada, etc.).
4. Dosis, una entrada por combinación de indicación + población + vía. Cada
   entrada lleva OBLIGATORIAMENTE su fuente con documento, edición, año y
   capítulo, tabla, algoritmo o página. Una dosis sin esa fuente completa NO
   se escribe: se deja como pendiente declarado.
5. Efectos adversos críticos e interacciones que importen en emergencia.
6. Farmacocinética (inicio, pico, duración) solo en lo que cambie una decisión
   dentro de la ambulancia.
7. Comparación con sus alternativas de urgencia, como tabla.
8. Una o dos mnemotecnias en español, recordables bajo estrés.
9. Puntos de alto rendimiento para exámenes de certificación.
10. De 8 a 12 preguntas de opción múltiple con explicación de cada respuesta.
11. De 5 a 8 escenarios breves de decisión clínica, de básico a avanzado.
12. Una hoja de repaso de una sola pantalla.
13. Los datos que no deben olvidarse antes de administrarlo a un paciente
    crítico, en un máximo de 10 viñetas.

AVISO OBLIGATORIO EN TODA FICHA
Cada bloque de dosis se acompaña del aviso de que la presentación, la
concentración, el equipo disponible y el alcance profesional dependen del
protocolo del servicio, y que la cifra citada procede de la guía indicada, no
del cuadro básico de su unidad. La dosis se enseña; la autorización para
administrarla no la da esta plataforma.

ENTREGA
- La entrada del catálogo, con `estadoEditorial: 'borrador'`.
- La tabla de cifras con su edición/año.
- Lo que no pudo comprobarse, como pendiente explícito.
```

---

# Prompt C — Escena simulada

> Nuevo. Produce una entrada de `src/data/escenas/` en el esquema de grafo de
> `PLAN-LMS.md` §28.

```
Actúa como instructor de simulación clínica prehospitalaria de PTEM.

Tu producto es una ESCENA simulada en el esquema de grafo del proyecto: nodos
con decisiones, ramas y varios finales posibles. No es una narración libre.

MÓDULO: [módulo del plan]
TEMAS QUE DEBE EJERCITAR: [ids de temas ya redactados]
NIVEL: [básico | intermedio | avanzado]
LÍMITES: máximo 12 nodos, máximo 3 opciones por nodo, máximo 4 finales,
profundidad máxima 6 decisiones.

Construye:
1. `despacho`: lo que la central le informa a la unidad, con hora y lugar.
2. `paciente`: edad, sexo y motivo aparente. Nada más: el resto lo descubre el
   alumno preguntando o evaluando.
3. `nodos`: cada uno con el texto de la situación, los signos vitales que el
   alumno vería SI los busca, y de 2 a 3 opciones. Cada opción lleva:
   - si es correcta, aceptable o incorrecta;
   - si es un ERROR CRÍTICO (omitir seguridad de la escena, no controlar una
     hemorragia exanguinante, movilizar sin control cervical cuando procede,
     administrar algo contraindicado);
   - la retroalimentación que verá el alumno al elegirla, explicando el porqué;
   - a qué nodo lleva.
4. `finales`: entre 2 y 4, con desenlaces distintos y honestos. Un final malo
   describe la consecuencia clínica sin dramatizar ni culpabilizar.
5. `fuentes`: qué guía sostiene lo que la escena considera correcto.

REGLAS
- Todo camino debe terminar en un final. Ningún nodo huérfano, ningún ciclo
  infinito.
- Solo se puede exigir lo que los temas indicados YA enseñan y citan.
- Ninguna decisión puede depender de una dosis o un procedimiento que el plan
  no haya cubierto todavía en ese módulo.
- La escena debe poder resolverse en 5 a 10 minutos.
- Nada de casos morbosos, gore ni pacientes identificables. La escena forma,
  no impresiona.

ENTREGA
- La escena completa, con `estadoEditorial: 'borrador'` y
  `origen: 'curado' | 'generado'`.
- Qué temas cubre cada decisión, para que el docente lo verifique.
```

---

# Prompt D — Artículo del botiquín

> Adapta la mitad de contenido del original «Arquitecto de Funciones —
> Pantalla Mi Botiquín Virtual». Su mitad de ingeniería está resuelta en
> `PLAN-LMS.md` §26 con el stack real del proyecto, y por eso no se pregunta
> aquí.

```
Actúa como instructor de equipamiento prehospitalario de PTEM.

Tu producto es la FICHA de un artículo del botiquín, en el esquema de
PLAN-LMS.md §26. La escribe alguien que ha revisado unidades de verdad, para
un alumno que todavía no.

ARTÍCULO: [nombre exacto de la lista de la academia]
COMPARTIMENTO: [vía aérea | circulatorio y hemorragias | inmovilización |
curación | medicamentos | monitoreo | protección personal | otros]
TEMA QUE LO ENSEÑA: [id del tema de PTEM]
DOTACIÓN: [lo que la norma exija para el tipo de unidad, si aplica]

Redacta:
1. Qué es y para qué sirve, en una o dos frases que un alumno de primer módulo
   entienda.
2. Cuándo se usa: las indicaciones reales, no una lista teórica.
3. Cuándo NO se usa, si hay contraindicación o alternativa mejor.
4. Cómo se revisa antes del turno: qué se mira, qué caduca, qué se repone,
   qué invalida la pieza (empaque abierto, sello roto, batería, fecha).
5. Errores frecuentes al usarlo o al guardarlo.
6. Con qué se confunde, si se parece a otro artículo del mismo compartimento.
7. Fuentes: la norma o guía que sostiene su presencia y su uso.

REGLAS
- No inventes cantidades de dotación: si la norma no lo dice para ese tipo de
  unidad, decláralo como pendiente.
- No conviertas la ficha en una lección: el desarrollo vive en el tema
  enlazado, y aquí se resume y se enlaza.
- Nada de marcas comerciales salvo que el nombre genérico no exista.

ENTREGA
- La entrada del catálogo, con `estadoEditorial: 'borrador'` y `foto: null`
  si todavía no hay fotografía (la interfaz mostrará la silueta).
```
