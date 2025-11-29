# SGFI - Desktop

## 🧩 Arquitectura General del Proyecto

El proyecto sigue una arquitectura **modular**, basada en:

* **Feature Modules**
* **Standalone Components**
* **Clean Architecture ligera** (Domain / Core)

Este enfoque permite:

* Separación clara de roles (**admin / vendedor**)
* **Lazy loading** eficiente
* Reutilización de lógica de negocio
* Escalabilidad para integración futura con **Electron**
* Compatibilidad con el modo offline de la aplicación móvil

---

## 📂 Estructura de Carpetas

```
src/
└── app/
    ├── core/                         # Lógica global y reutilizable
    │   ├── auth/
    │   │   ├── guards/               # AuthGuard, RoleGuard
    │   │   ├── interceptors/         # JwtInterceptor, OfflineInterceptor
    │   │   ├── services/             # auth.service, token.service
    │   │   └── models/               # User, Role, JwtResponse
    │   ├── services/                 # api.service, websocket.service
    │   ├── utils/                    # Helpers, constants, pipes
    │   └── interceptors/
    │
    ├── shared/                       # Componentes reutilizables
    │   ├── components/               # header, sidebar, modals, dialogs
    │   ├── models/                   # Producto, Venta, Métricas, etc.
    │   ├── pipes/                    # currency, stock-alert
    │   └── material.module.ts        # Import centralizado de Angular Material
    │
    ├── features/                     # Módulos principales lazy-loaded
    │   ├── auth/                     # Login, register, change-password
    │   ├── dashboard/                # Métricas principales
    │   ├── inventory/                # Gestión de productos (solo admin)
    │   ├── sales/                    # Punto de venta en tiempo real
    │   ├── reports/                  # Reportes y exportación (solo admin)
    │   └── settings/                 # Configuración de la cuenta
    │
    ├── app.component.ts
    ├── app.routes.ts                 # Rutas principales
    └── main.ts

assets/
environments/
styles/
```

---

## ✨ Características Destacadas

* **Modularidad total** para crecimiento limpio
* **Optimización de rendimiento** con lazy loading
* **Seguridad integrada** (JWT, guards por rol)
* **Interfaz homogénea** con Shared Components
* **Integración con WebSocket** para ventas en tiempo real
* **Compatibilidad futura con escritorio (Electron)**

---

## 🛡️ Seguridad

* Autenticación con **JWT**
* Guards por rol (**admin / vendedor**)
* Interceptor para manejo de sesión
* Interceptor **Offline** para tolerancia a fallos

---

## 🧮 Módulos Principales

### **Sales**

* Punto de venta en tiempo real
* Integración con escáner móvil
* Historial de ventas

### **Dashboard** (Admin)

* Métricas
* Productos más vendidos
* Ventas del día

### **Inventory** (Admin)

* CRUD de productos
* Alertas de stock
* Gestión detallada del inventario


### **Reports** (Admin)

* Reportes de ventas
* Exportación a Excel
* Filtros avanzados

---

## 🔧 Core Services

* `api.service` → Wrapper de HttpClient
* `websocket.service` → Conexión en tiempo real
* `auth.service` → Manejo de sesiones

---

## 🧱 Shared Layer

### Componentes reutilizables

* Sidebar
* Header
* Diálogos de confirmación

### Pipes

* Formato moneda
* Indicadores de stock

---

## 🚀 Próximos pasos

* Integración con **Electron**
* Optimización de animaciones y tema visual
* Conexión profunda con la app móvil

---

## 📌 Notas finales

Este Readme resume la estructura completa del proyecto y sirve como guía para la arquitectura, escalabilidad y mantenimiento general del sistema.
