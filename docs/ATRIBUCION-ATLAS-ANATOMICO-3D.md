# Atribución del Atlas anatómico 3D de PTEM

## Datos anatómicos

El modelo anatómico procede de **BodyParts3D 4.0**, publicado por The Database
Center for Life Science (DBCLS).

- Obra: BodyParts3D
- Titular indicado por la fuente: © The Database Center for Life Science
- Licencia: Creative Commons Attribution 4.0 International (CC BY 4.0)
- Sitio del conjunto: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/
- Licencia del conjunto: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html

PTEM utiliza una referencia anatómica masculina adulta. El conjunto no representa
todas las estructuras, edades, sexos, variaciones anatómicas ni condiciones
clínicas.

## Adaptación web utilizada como base

La preparación y optimización de la geometría para navegador se basa en el
proyecto abierto **Human Atlas**, de Ashe Magalhaes:

- Repositorio: https://github.com/ashemag/human-atlas
- Revisión fijada: `1c38bf35c254a891200d3cedecfd57abebe83d8d`
- Licencia del código: MIT

Fijar la revisión evita que un cambio posterior del proyecto original altere sin
revisión el atlas que reciben los alumnos de PTEM.

## Cambios realizados por PTEM / Riders.Media

La adaptación de PTEM incorpora, entre otros cambios:

- integración dentro de Vite, React 18, React Router y el sistema visual de PTEM;
- ruta protegida y carga diferida independiente del paquete inicial;
- interfaz, ayudas, errores y sistemas anatómicos en español;
- diccionario inicial de estructuras prioritarias para atención prehospitalaria;
- selección, aislamiento, búsqueda, capas, vistas, rotación y separación 3D;
- controles táctiles y diseño adaptable para computadora y teléfono;
- rebasing seguro de archivos a una revisión inmutable alojada por jsDelivr;
- avisos visibles de alcance educativo, procedencia y licencia.

Los nombres originales se conservan como referencia cuando existe una traducción,
y las estructuras aún no traducidas permanecen con la nomenclatura de la fuente.

## Alcance educativo

El atlas es una herramienta de estudio y orientación espacial. No es un producto
diagnóstico, no sustituye bibliografía revisada ni validación docente, y no debe
utilizarse para planear procedimientos clínicos o quirúrgicos.

Ni DBCLS, ni BodyParts3D, ni los autores del proyecto Human Atlas respaldan PTEM,
su contenido académico o las academias que utilizan la plataforma.

## Aviso de licencia MIT del proyecto Human Atlas

```text
MIT License

Copyright (c) 2026 ashemag

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
