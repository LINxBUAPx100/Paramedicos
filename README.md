# La Guía de Lin 🩺

**Guía de estudio avanzada y exigente de Atención Prehospitalaria, Cuidados Críticos y Transición a Medicina** (enfoque México).

No es un simple cuestionario: es una plataforma para **estudiar a profundidad** y **ponerte a prueba**. Cada tema está redactado con teoría, tablas, fórmulas y correlación clínica para que comprendas el *porqué* fisiológico, bioquímico y anatómico de cada intervención.

## ✨ Características

- **5 fases progresivas** y **14 temas** desarrollados a fondo, desde la biología celular hasta el diagnóstico por imagen.
- **Contenido didáctico**: párrafos, listas, pasos numerados, tablas comparativas, fórmulas y *callouts* (clave, clínico, alerta).
- **Quizzes por tema** con explicación de cada respuesta y umbral de aprobación del 70%.
- **Examen general** aleatorio configurable (5, 10, 15, 20 o todas las preguntas).
- **Flashcards** de repaso activo, por tema o globales, con animación de volteo y modo barajar.
- **Seguimiento de progreso** (temas leídos, calificaciones, historial de exámenes) guardado en el navegador.
- **Buscador** de temas y conceptos clave.
- **Modo claro/oscuro** y **diseño responsivo** (móvil, tablet, escritorio).

## 🛠️ Tecnologías

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [React Router](https://reactrouter.com/) (HashRouter, compatible con GitHub Pages)
- CSS puro con sistema de diseño y temas mediante variables CSS.

## 🚀 Desarrollo local

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción en /dist
npm run preview  # previsualizar el build
```

## 🌐 Despliegue en GitHub Pages

El proyecto está listo para GitHub Pages mediante GitHub Actions:

1. En el repositorio: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Cada *push* a la rama de trabajo o a `main` ejecuta el workflow `.github/workflows/deploy.yml`, que compila el sitio y lo publica.
3. La app usa `HashRouter` y `base: './'`, por lo que funciona en cualquier subruta de GitHub Pages sin configuración adicional.

## 📚 Temario

| Fase | Título | Temas |
|------|--------|-------|
| 1 | Ciencias Básicas y Fundamentos | Bioquímica · Anatomía · Fisiología |
| 2 | TUM-Básico | Evaluación del paciente · Oxigenoterapia y vía aérea básica |
| 3 | TUM-Intermedio | Terapia IV/IO · Farmacología y toxicología |
| 4 | TUM-Avanzado y Cuidados Críticos | Vía aérea definitiva · Cardiología avanzada · Trauma crítico |
| 5 | Transición a Medicina | Fisiopatología e inmunología · Sepsis · Medicina interna · Imagen |

---

Hecho con dedicación para el estudio de Lin. 💚
