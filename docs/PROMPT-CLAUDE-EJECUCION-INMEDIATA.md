# Prompt de ejecución inmediata para Claude Code

> **Sustituido el 17 de agosto de 2026.** Respiratorio y gastrointestinal ya fueron integrados. Para la siguiente ejecución usa `docs/PROMPT-CLAUDE-MODULO-2-Y-ACTIVIDADES.md`; no vuelvas a ejecutar este lote.

Trabaja directamente en `C:\Users\PC\Documents\Paramedicos`.

No respondas con un plan. No crees más infraestructura salvo que una regresión comprobada impida integrar contenido. El objetivo de esta ejecución es **aumentar el número real de lecciones con material estudiable**.

Lee completos y obedece, en este orden:

1. `CLAUDE.md`
2. `docs/PROMPT-CLAUDE-CONTENIDO-FALTANTE.md`
3. `docs/BIBLIOTECA-DRIVE-PTEM.md`
4. `docs/REGISTRO-FUENTES-ACADEMICAS.json`
5. `docs/DOSSIER-FUENTES-POR-MODULO.md`
6. `docs/AUDITORIA-ACADEMICA-PTEM.md`
7. `docs/CONTENIDO-PENDIENTE.md`
8. `docs/MATRIZ-DECISIONES.md`
9. `scripts/seed/plan-rescate.json`
10. El PDF oficial señalado en `CLAUDE.md`

La biblioteca aportada por el usuario está en:

`https://drive.google.com/drive/folders/1RFD2pQ20vKK8syU0Y-JbXGBDcrYa7TwV`

Su inventario académico ya está clasificado en `docs/BIBLIOTECA-DRIVE-PTEM.md`. No vuelvas a inventariarlo. Consulta los archivos concretos cuando aporten fundamento y respeta estas decisiones:

- PHTLS 9 en español quedó identificado y puede consultarse para capítulo/página exactos.
- PHTLS 10 y NALS declaran traducción automática: no se citan.
- Tortora no está en la carpeta; no atribuyas a Tortora contenido de AAOS, Guyton o Moore.
- Bibiano 3 no es el “Manual de Urgencias Jiménez”.
- Katzung 12 sirve para principios, no para dosis actuales.
- Diapositivas, flashcards, imágenes, apuntes anónimos y archivos ambiguos no son autoridad clínica.
- No copies ni incorpores los PDF al repositorio.

Primero revisa de manera acotada los seis controles ya implementados. Si pasan, no los reescribas. Corrige únicamente regresiones. Aplica después las correcciones focalizadas ya documentadas en epidemiología/farmacología, sin convertirlas en otra auditoría general.

Inmediatamente después redacta e integra **los ocho temas respiratorios completos**:

1. `m4-resp-exploracion-torax`
2. `m4-resp-insuficiencia`
3. `m4-resp-epoc`
4. `m4-resp-edema-pulmon`
5. `m4-resp-neumotorax-espontaneo`
6. `m4-resp-tep`
7. `m4-resp-neumonia-bronquitis`
8. `m4-resp-asma`

Usa el mapa por tema del registro: OMS 2026/BEC para evaluación y estabilización prehospitalaria; GINA 2026 para asma; GOLD 2026 para EPOC; AHA/ACC/HFSA para edema pulmonar cardiogénico; BTS para neumotórax espontáneo; ESC para TEP; ATS/IDSA para neumonía adulta. Los libros de la biblioteca son apoyo explicativo, no sustituyen la actualización.

Si terminas ese lote, continúa sin pedir autorización con los nueve temas gastrointestinales:

1. `m4-gi-exploracion-abdominal`
2. `m4-gi-apendicitis`
3. `m4-gi-pancreatitis`
4. `m4-gi-gastritis-colitis`
5. `m4-gi-colelitiasis`
6. `m4-gi-deshidratacion`
7. `m4-gi-oclusion-intestinal`
8. `m4-gi-sangrado-tubo`
9. `m4-gi-cirrosis-hepatitis`

Para gastrointestinal usa Bibiano 3 y Zubirán 7 solo como apoyo secundario. Las diapositivas del Drive pueden señalar términos de búsqueda, pero no deben aparecer como fuentes. Mantén el ámbito prehospitalario: reconocimiento, gravedad, estabilización, reevaluación y destino; no simules diagnóstico definitivo ni traslades manejo hospitalario a la ambulancia.

Cada lección debe cumplir el contrato completo de `CLAUDE.md`: resumen, duración, objetivos observables, secciones sustantivas, conceptos clave, flashcards, preguntas con explicación, actividad solo si es auténtica, fuentes específicas y ficha de revisión. Todo reactivo debe poder contestarse exclusivamente con lo enseñado en esa misma lección.

No inventes dosis, concentraciones, competencias o procedimientos. Toda medicación o intervención dependiente del servicio requiere guía vigente, IPP/COFEPRIS, protocolo local y alcance profesional. Si falta una de esas piezas, limita el texto al principio seguro, registra un bloqueo concreto y sigue con el siguiente tema. Nunca detengas toda la unidad por un solo dato bloqueado.

Integra el contenido en los archivos que consume la aplicación y actualiza sus importaciones reales. Mantén cada tema como `borrador` o `en_revision`; nunca como `validado` o `publicado`.

Después de cada unidad ejecuta generación, pruebas, build, inventario y matriz. Si algo falla, corrige la regresión y vuelve a ejecutar. No despliegues, no escribas en Firebase, no migres producción, no hagas commits y no borres el legado.

Tu respuesta final debe comenzar exactamente con este resumen cuantitativo:

- Lecciones nuevas integradas: N
- IDs terminados: ...
- Lecciones con material: antes → después
- Temas sin contenido: antes → después
- Pruebas: N pasan
- Build: pasa/falla

Después enumera correcciones clínicas, fuentes efectivamente consultadas y bloqueos reales. No presentes como avance haber leído archivos, actualizado planes o creado infraestructura.
