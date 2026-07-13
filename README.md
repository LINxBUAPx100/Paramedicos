# PTEM

**Plataforma de estudio avanzada de Atención Prehospitalaria, Cuidados Críticos y Transición a Medicina** (enfoque México).

No es un cuestionario más: es una plataforma para **estudiar a profundidad** y **ponerte a prueba**, con teoría, tablas, fórmulas y correlación clínica que explican el *porqué* fisiológico de cada intervención. Multi-tenant: academias, grupos, roles y seguimiento del avance de cada alumno.

## ✨ Características

- **8 fases** y **68 temas** desarrollados a fondo, de la biología celular al marco normativo mexicano.
- **Contenido didáctico**: párrafos, listas, pasos, tablas, fórmulas, *callouts* (clave, clínico, alerta, dosis), conceptos clave y actividades.
- **Quizzes por tema**, **examen general** y **examen por fase** (aprobación al 70%), con pantalla de fin de módulo que da una **calificación combinada** (examen + actividades) y felicitación personalizada.
- **Flashcards** de repaso, **Atlas** de imágenes y **buscador** de temas y conceptos.
- **Cuentas y roles** (Firebase Auth + Firestore): `alumno`, `instructor`, `admin_escuela` (director), `superadmin`.
- **Academias y grupos**: alta por código, personalización de marca por academia, visibilidad de contenido por grupo, códigos de prueba temporales.
- **Paneles**: avance por alumno y fase, estadísticas, gestión de miembros, solicitudes de acceso al siguiente módulo y dashboard global del super-admin.
- **Seguimiento de progreso** sincronizado a Firestore, **modo claro/oscuro** y **diseño responsivo**.

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
