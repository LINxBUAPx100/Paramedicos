# PTEM

**Plataforma de estudio avanzada de Atención Prehospitalaria, Cuidados Críticos y Transición a Medicina** (enfoque México).

No es un cuestionario más: es una plataforma para **estudiar a profundidad** y **ponerte a prueba**, con teoría, tablas, fórmulas y correlación clínica que explican el *porqué* fisiológico de cada intervención. Multi-tenant: academias, grupos, roles y seguimiento del avance de cada alumno.

## ✨ Características

### Estudio
- **8 fases** y **68 temas** desarrollados a fondo, de la biología celular al marco normativo mexicano.
- **Contenido didáctico**: párrafos, listas, pasos, tablas, fórmulas, *callouts* (clave, clínico, alerta, dosis), conceptos clave y actividades.
- **Quizzes por tema**, **examen general** y **examen por fase** (aprobación al 70%).
- **Pantalla de fin de módulo**: al terminar el examen de fase, una vista de felicitación con **calificación combinada** (60% examen + 40% actividades), mensaje profesional según el rango, resumen de aprendizajes y botón para solicitar el siguiente módulo.
- **Atlas** anatómico/fisiológico (galería de imágenes que enlaza a su tema) y **galería de "Imágenes de referencia"** dentro de cada tema.
- **Flashcards** de repaso y **buscador** de temas y conceptos.
- **Seguimiento de progreso** sincronizado a Firestore, **modo claro/oscuro** y **diseño responsivo**.

### Plataforma multi-tenant
- **Cuentas y roles** (Firebase Auth + Firestore): `alumno`, `instructor` (profesor), `admin_escuela` (director), `superadmin`.
- **Academias y grupos**: alta por código, **personalización de marca** por academia (logo, lema, color en el Home) y **visibilidad de contenido por grupo** (el staff decide qué fases/temas ve cada grupo).
- **Códigos privados**: los códigos de academia/grupo solo los ven el director y el super-admin; alumnos y profesores ven el *nombre*. Un profesor puede *solicitar* verlos y el director aprueba.
- **Un profesor, varios grupos**: en el inicio elige el grupo activo con el que trabaja; la selección persiste hasta cambiarla.
- **Invitaciones**: comparte el acceso por WhatsApp o enlace con una tarjeta profesional (academia, grupo y código), con el enlace pre-llenado.
- **Solicitudes de acceso**: los alumnos piden el siguiente módulo; el staff acepta/rechaza (una por una o todas) o habilita/retrocede módulos por alumno.
- **Códigos de prueba** temporales para conocer la plataforma sin inscribirse.

### Paneles
- **Director / profesor**: avance por alumno y fase, estadísticas (promedio, aprobación, dominio por fase, alumnos en riesgo), gestión de miembros, grupos y solicitudes.
- **Super-admin**: dashboard global de todas las academias, gestión de usuarios, **facturación** (plan, renovación, estado, y edición de nombre y código de academia), anuncio global y reportes de problemas.

## 🛠️ Tecnologías

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + [React Router](https://reactrouter.com/) (HashRouter, compatible con GitHub Pages).
- [Firebase](https://firebase.google.com/) (Auth + Firestore; plan Spark). El SDK se carga con import dinámico para no engordar el bundle inicial.
- CSS puro con sistema de diseño y temas mediante variables CSS.

## 🚀 Desarrollo local

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción en /dist
npm run preview  # previsualizar el build
```

> El contenido de las fases vive en `src/data/`; `npm run gen:nav` (y el `prebuild`) regenera el índice de navegación.
>
> Las imágenes (Atlas y galerías de los temas) se cargan desde Google Drive: pega el enlace en `src/data/imagenes.js` (`ATLAS_TEMAS` para el Atlas; `IMAGENES_POR_TEMA` para reutilizarlas como referencia en cada tema). Comparte cada archivo en Drive como "Cualquier persona con el enlace".

## 🔥 Firebase

La configuración del cliente está incrustada en `src/lib/firebase/init.js` (es pública por diseño; la seguridad la dan las Security Rules de `firestore.rules`). Guía completa de roles, academias, códigos y reglas en **[FIREBASE.md](./FIREBASE.md)**.

> ⚠️ Tras cambios en `firestore.rules` hay que **publicarlas** en la consola de Firebase; si no, los paneles y las solicitudes fallan con *permission-denied*.

## 🌐 Despliegue en GitHub Pages

1. **Settings → Pages → Source: GitHub Actions**.
2. Cada *push* a `main` ejecuta `.github/workflows/deploy.yml`, que compila y publica.
3. Usa `HashRouter` y `base: './'`, así que funciona en cualquier subruta sin configuración extra.

## 📚 Temario

| Fase | Título |
|------|--------|
| 1 | Ciencias Básicas y Fundamentos |
| 2 | TUM-Básico |
| 3 | TUM-Intermedio |
| 4 | TUM-Avanzado y Cuidados Críticos |
| 5 | Transición a Medicina |
| 6 | Farmacología Prehospitalaria Avanzada |
| 7 | Poblaciones Especiales |
| 8 | Marco Normativo y Operaciones Especiales |

---

Hecho con dedicación para el estudio. 💚
