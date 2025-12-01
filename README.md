# 🎓 Centro de Estudiantes - Sistema de Gestión Académica

![Angular](https://img.shields.io/badge/Angular-19.0-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![NgRx](https://img.shields.io/badge/NgRx-19.0-purple?style=for-the-badge&logo=ngrx)
![Material](https://img.shields.io/badge/Material-19.0-blue?style=for-the-badge&logo=material-ui)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Sistema completo de gestión académica desarrollado con Angular 19, NgRx para manejo de estado global, y Angular Material para una interfaz moderna y profesional.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Perfiles de Usuario](#-perfiles-de-usuario)
- [API Backend](#-api-backend)
- [Redux Store](#-redux-store)
- [Screenshots](#-screenshots)
- [Testing](#-testing)
- [Despliegue](#-despliegue)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

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
- 🛡️ **Guards & Interceptors**: Protección de rutas y manejo de tokens
- 📱 **Responsive Design**: Adaptado a todos los dispositivos
- 🚀 **Lazy Loading**: Carga optimizada de módulos
- 🎯 **Standalone Components**: Arquitectura moderna de Angular
- 💾 **json-server**: Backend mock para desarrollo

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

### Development

- **json-server** 0.17.4 - Backend mock
- **concurrently** 8.2.0 - Ejecutar múltiples comandos
- **Angular CLI** 19.0.0 - Herramientas de desarrollo

---

## 🏗️ Arquitectura

El proyecto sigue una arquitectura modular basada en:

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
└── environment/                 # Configuración de entornos
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
git clone https://github.com/tu-usuario/centro-estudiantes.git
cd centro-estudiantes
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

O ejecutarlos por separado:

```bash

npm start


npm run backend
```

### Acceder a la Aplicación

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000

### Credenciales de Prueba

#### Administrador
- Email: `admin@test.com`
- Password: `admin123`
- Permisos: Acceso completo a todas las funcionalidades

#### Usuario
- Email: `user@test.com`
- Password: `user123`
- Permisos: Solo lectura de alumnos y cursos, gestión de inscripciones

---

## 📁 Estructura del Proyecto

```
centro-estudiantes/
│
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   └── login/                    # Componente de login
│   │   │
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts         # Protección de rutas autenticadas
│   │   │   │   └── rol.guard.ts          # Protección por rol
│   │   │   ├── interceptors/
│   │   │   │   └── auth.interceptor.ts   # Interceptor para tokens
│   │   │   ├── models/                   # Interfaces TypeScript
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts       # Servicio de autenticación
│   │   │   │   └── usuario.service.ts    # Servicio de usuarios
│   │   │   └── layout/
│   │   │       ├── navbar/               # Barra de navegación
│   │   │       └── sidebar/              # Menú lateral
│   │   │
│   │   ├── features/
│   │   │   ├── alumnos/
│   │   │   │   ├── components/
│   │   │   │   │   ├── lista-alumnos/   # Lista con tabla Material
│   │   │   │   │   └── abm-alumnos/     # Formulario ABM
│   │   │   │   ├── services/
│   │   │   │   └── alumnos.routes.ts
│   │   │   │
│   │   │   ├── cursos/                   # Mismo patrón
│   │   │   ├── inscripciones/            # Mismo patrón
│   │   │   └── usuarios/                 # Mismo patrón
│   │   │
│   │   ├── shared/
│   │   │   ├── pipes/
│   │   │   │   └── nombre-completo.pipe.ts
│   │   │   └── directives/
│   │   │
│   │   └── store/                        # Redux Store
│   │       ├── auth/
│   │       │   ├── auth.actions.ts
│   │       │   ├── auth.reducer.ts
│   │       │   ├── auth.effects.ts
│   │       │   └── auth.selectors.ts
│   │       ├── alumnos/                  # Mismo patrón
│   │       ├── cursos/                   # Mismo patrón
│   │       ├── inscripciones/            # Mismo patrón
│   │       └── usuarios/                 # Mismo patrón
│   │
│   ├── environment/
│   │   └── environment.ts                # Variables de entorno
│   │
│   └── styles.scss                       # Estilos globales
│
├── db.json                               # Base de datos mock
├── angular.json                          # Configuración Angular
├── tsconfig.json                         # Configuración TypeScript
├── package.json                          # Dependencias
└── README.md
```

---

## 👤 Perfiles de Usuario

### Administrador

**Permisos:**
- ✅ Ver, crear, editar y eliminar alumnos
- ✅ Ver, crear, editar y eliminar cursos
- ✅ Ver, crear y eliminar inscripciones
- ✅ Ver, crear, editar y eliminar usuarios
- ✅ Acceso completo al sistema

**Funcionalidades exclusivas:**
- Gestión de usuarios
- Eliminación de inscripciones
- Visualización de todos los datos

### Usuario

**Permisos:**
- ✅ Ver listado de alumnos
- ✅ Ver listado de cursos
- ✅ Crear inscripciones
- ✅ Ver sus propias inscripciones
- ❌ No puede gestionar usuarios

---

## 🔌 API Backend

### Endpoints Disponibles

#### Usuarios
```
GET    /users              # Listar usuarios
GET    /users/:id          # Obtener usuario por ID
POST   /users              # Crear usuario
PATCH  /users/:id          # Actualizar usuario
DELETE /users/:id          # Eliminar usuario
```

#### Alumnos
```
GET    /alumnos            # Listar alumnos
GET    /alumnos/:id        # Obtener alumno por ID
POST   /alumnos            # Crear alumno
PATCH  /alumnos/:id        # Actualizar alumno
DELETE /alumnos/:id        # Eliminar alumno
```

#### Cursos
```
GET    /cursos             # Listar cursos
GET    /cursos/:id         # Obtener curso por ID
POST   /cursos             # Crear curso
PATCH  /cursos/:id         # Actualizar curso
DELETE /cursos/:id         # Eliminar curso
```

#### Inscripciones
```
GET    /inscripciones      # Listar inscripciones
GET    /inscripciones/:id  # Obtener inscripción por ID
POST   /inscripciones      # Crear inscripción
DELETE /inscripciones/:id  # Eliminar inscripción
```

### Filtros y Búsqueda

json-server soporta filtros por query params:

```bash

GET /users?email=admin@test.com


GET /users?rol=admin


GET /alumnos?q=Juan
```

---

## 🗄️ Redux Store

### Estado Global

```typescript
{
  auth: {
    user: Usuario | null,
    loading: boolean,
    error: string | null
  },
  alumnos: {
    alumnos: Alumno[],
    loading: boolean,
    error: string | null
  },
  cursos: {
    cursos: Curso[],
    loading: boolean,
    error: string | null
  },
  inscripciones: {
    inscripciones: Inscripcion[],
    loading: boolean,
    error: string | null
  },
  usuarios: {
    usuarios: Usuario[],
    loading: boolean,
    error: string | null
  }
}
```

### Acciones Disponibles

Cada entidad tiene el siguiente conjunto de acciones:

- `load[Entity]` - Cargar datos
- `load[Entity]Success` - Éxito al cargar
- `load[Entity]Failure` - Error al cargar
- `create[Entity]` - Crear registro
- `create[Entity]Success` - Éxito al crear
- `create[Entity]Failure` - Error al crear
- `update[Entity]` - Actualizar registro
- `update[Entity]Success` - Éxito al actualizar
- `update[Entity]Failure` - Error al actualizar
- `delete[Entity]` - Eliminar registro
- `delete[Entity]Success` - Éxito al eliminar
- `delete[Entity]Failure` - Error al eliminar

---

## 🧪 Testing

### Ejecutar Tests Unitarios

```bash
npm test
```

### Ejecutar Tests con Cobertura

```bash
npm run test:coverage
```

### Ejecutar Tests E2E

```bash
npm run e2e
```

---

## 📦 Build

### Build de Producción

```bash
npm run build
```

Los archivos compilados se generarán en `dist/`.

### Build con Análisis

```bash
npm run build -- --stats-json
npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer dist/stats.json
```

---

## 🚀 Despliegue

### Netlify

```bash
# 1. Build
npm run build

# 2. Deploy
netlify deploy --prod --dir=dist/centro-estudiantes
```

### Vercel

```bash
vercel --prod
```

### GitHub Pages

```bash
ng build --base-href /centro-estudiantes/
npx angular-cli-ghpages --dir=dist/centro-estudiantes
```

---

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea tu Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al Branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guía de Estilo

- Seguir las convenciones de Angular
- Usar TypeScript strict mode
- Comentar código complejo
- Escribir tests para nuevas features

---

## 📝 Mejoras Futuras

- [ ] Paginación en tablas
- [ ] Filtros avanzados y búsqueda
- [ ] Exportación a Excel/PDF
- [ ] Dashboard con gráficos
- [ ] Sistema de notificaciones
- [ ] Modo oscuro
- [ ] Internacionalización (i18n)
- [ ] PWA (Progressive Web App)
- [ ] Chat en tiempo real
- [ ] Reportes personalizables

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/EmanuelDiazOchoa)
- LinkedIn: [Tu Perfil](https://www.linkedin.com/in/hector-emanuel-diaz-ochoa/)
- Email: emagnr93@gmail.com

---

## 🙏 Agradecimientos

- [Angular Team](https://angular.io)
- [NgRx Team](https://ngrx.io)
- [Material Design](https://material.angular.io)
- [json-server](https://github.com/typicode/json-server)

---


<div align="center">

**⭐ Si te gustó este proyecto, dale una estrella en GitHub! ⭐**

Desarrollado con ❤️ usando Angular 19

</div>
