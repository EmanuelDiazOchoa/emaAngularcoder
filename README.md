# 🎓 Centro de Estudiantes - Sistema de Gestión Académica

![Angular](https://img.shields.io/badge/Angular-19.0-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![NgRx](https://img.shields.io/badge/NgRx-19.0-purple?style=for-the-badge&logo=ngrx)
![Material](https://img.shields.io/badge/Material-19.0-blue?style=for-the-badge&logo=material-ui)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Sistema completo de gestión académica desarrollado con Angular 19, NgRx para manejo de estado global, y Angular Material para una interfaz moderna y profesional.

## 🌐 Demo en vivo

👉 **[centro-estudiantes-ema.netlify.app](https://centro-estudiantes-ema.netlify.app)**

| Rol | Email | Password |
|-----|-------|----------|
| Administrador | admin@test.com | admin123 |
| Usuario | user@test.com | user123 |

> ⚠️ El backend está hosteado en Render (plan gratuito). El primer login puede tardar hasta 60 segundos mientras el servidor despierta.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Perfiles de Usuario](#-perfiles-de-usuario)
- [API Backend](#-api-backend)
- [Redux Store](#-redux-store)
- [Mejoras Futuras](#-mejoras-futuras)
- [Autor](#-autor)

---

## ✨ Características

### Funcionalidades Principales

- 🔐 **Autenticación y Autorización**: Sistema de login con roles (Admin/Usuario)
- 👨‍🎓 **Gestión de Alumnos**: CRUD completo con perfiles detallados
- 📚 **Gestión de Cursos**: Administración de cursos con profesores y horarios
- 📝 **Gestión de Inscripciones**: Registro de alumnos en cursos
- 👥 **Gestión de Usuarios**: Administración de usuarios del sistema (solo Admin)

### Características Técnicas

- ⚡ **Redux (NgRx)**: Manejo de estado global centralizado
- 🎨 **Material Design**: Interfaz moderna y responsive
- 🔄 **Reactive Forms**: Validación en tiempo real
- 🔒 **Guards**: AuthGuard, AdminGuard y RolGuard para protección de rutas
- 📱 **Responsive Design**: Sidebar colapsable en desktop, cards en mobile
- 🚀 **Lazy Loading**: Carga optimizada de módulos
- 🎯 **Standalone Components**: Arquitectura moderna de Angular

---

## 🛠️ Tecnologías

### Core
- **Angular** 19.0.0 - Framework principal
- **TypeScript** 5.6.2 - Lenguaje de programación
- **RxJS** 7.8.0 - Programación reactiva

### State Management
- **@ngrx/store** 19.0.0 - Redux para Angular
- **@ngrx/effects** 19.0.0 - Side effects
- **@ngrx/store-devtools** 19.0.0 - DevTools para debugging

### UI/UX
- **Angular Material** 19.0.0 - Componentes UI
- **Angular CDK** 19.0.0 - Component Dev Kit
- **SCSS** - Estilos

### Backend & Deploy
- **json-server** 0.17.4 - Backend mock REST API
- **Render** - Hosting del backend
- **Netlify** - Hosting del frontend

---

## 🏗️ Arquitectura
```
src/
├── app/
│   ├── auth/                    # Módulo de autenticación
│   ├── core/                    # Servicios core, guards, interceptors
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── models/
│   │   ├── services/
│   │   └── layout/
│   ├── features/                # Módulos de features
│   │   ├── alumnos/
│   │   ├── cursos/
│   │   ├── inscripciones/
│   │   └── usuarios/
│   ├── shared/                  # Componentes compartidos
│   │   ├── pipes/
│   │   └── directives/
│   └── store/                   # Redux store
│       ├── auth/
│       ├── alumnos/
│       ├── cursos/
│       ├── inscripciones/
│       └── usuarios/
└── environment/
```

### Patrones Implementados
- **Redux Pattern**: Estado centralizado e inmutable
- **Smart & Dumb Components**: Separación de lógica y presentación
- **Repository Pattern**: Abstracción de acceso a datos
- **Guard Pattern**: Protección de rutas
- **Interceptor Pattern**: Manejo de HTTP requests/responses

---

## 📦 Instalación

### Prerrequisitos
- **Node.js** >= 18.x
- **npm** >= 9.x
- **Angular CLI** 19.x
```bash
npm install -g @angular/cli@19
```

### Clonar el Repositorio
```bash
git clone https://github.com/EmanuelDiazOchoa/emaAngularcoder.git
cd emaAngularcoder
```

### Instalar Dependencias
```bash
npm install
```

---

## 🚀 Uso

### Modo Desarrollo

Ejecutar frontend y backend simultáneamente:
```bash
npm run dev
```

### Acceder a la Aplicación
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000

---

## 👤 Perfiles de Usuario

### Administrador
- ✅ Ver, crear, editar y eliminar alumnos
- ✅ Ver, crear, editar y eliminar cursos
- ✅ Ver, crear y eliminar inscripciones
- ✅ Ver, crear, editar y eliminar usuarios

### Usuario
- ✅ Ver listado de alumnos
- ✅ Ver listado de cursos
- ✅ Crear inscripciones
- ❌ No puede gestionar usuarios

---

## 🔌 API Backend

### Endpoints
```
GET    /users
GET    /alumnos
GET    /cursos
GET    /inscripciones

POST   /alumnos
POST   /cursos
POST   /inscripciones

PATCH  /alumnos/:id
PATCH  /cursos/:id

DELETE /alumnos/:id
DELETE /cursos/:id
DELETE /inscripciones/:id
```

---

## 🗄️ Redux Store
```typescript
{
  auth:          { user, loading, error },
  alumnos:       { alumnos, loading, error },
  cursos:        { cursos, loading, error },
  inscripciones: { inscripciones, loading, error },
  usuarios:      { usuarios, loading, error }
}
```

---

## 📝 Mejoras Futuras

- [ ] Paginación en tablas
- [ ] Filtros avanzados y búsqueda
- [ ] Exportación a Excel/PDF
- [ ] Dashboard con gráficos
- [ ] Sistema de notificaciones
- [ ] Modo oscuro
- [ ] PWA (Progressive Web App)

---

## 👨‍💻 Autor

**Hector Emanuel Diaz Ochoa**
- GitHub: [@EmanuelDiazOchoa](https://github.com/EmanuelDiazOchoa)
- LinkedIn: [Hector Emanuel Diaz Ochoa](https://www.linkedin.com/in/hector-emanuel-diaz-ochoa/)
- Email: emagnr93@gmail.com

---

## 🙏 Agradecimientos

- [Angular Team](https://angular.io)
- [NgRx Team](https://ngrx.io)
- [Material Design](https://material.angular.io)

---

<div align="center">

**⭐ Si te gustó este proyecto, dale una estrella en GitHub! ⭐**

Desarrollado con ❤️ usando Angular 19 + NgRx

</div>
