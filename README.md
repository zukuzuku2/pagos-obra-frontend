# Frontend - Pagos Construcción 🏗️

Aplicación web React para gestionar pagos de trabajos de construcción con interfaz moderna y generación de reportes PDF.

## 🚀 Tecnologías

- **React 18**
- **CSS Vanilla** (Glassmorphism)
- **jsPDF** + **jsPDF-AutoTable**
- **Google Fonts** (Inter)

## ✨ Características

- 🎨 **Diseño moderno** con efectos glassmorphism
- 📱 **Responsive** (iPhone 16 Pro, iPhone 12 Pro Max)
- 📊 **Reportes PDF** (completo y para albañil)
- ✏️ **CRUD completo** (crear, leer, actualizar, eliminar)
- 💰 **Resumen financiero** en tiempo real
- 🏷️ **Tipos de trabajo** predefinidos con iconos

## 🛠️ Instalación

```bash
npm install
```

## 🚀 Ejecución

```bash
# Desarrollo
npm start

# Build para producción
npm run build
```

## 📋 Funcionalidades

### Gestión de Trabajos
- ➕ **Agregar** trabajos con tipos predefinidos
- ✏️ **Editar** trabajos existentes
- ✅ **Marcar como pagado**
- 🗑️ **Eliminar** trabajos

### Tipos de Medición
- 🧱 **Ladrillo** - Metros cuadrados/lineales/unidad
- 🏗️ **Cerramento** - Metros cuadrados/lineales/unidad
- 🚪 **Puertas** - Por unidad
- 🪟 **Ventana** - Por unidad
- 🎨 **Salpicado** - Metros cuadrados

### Reportes PDF
- 📄 **Reporte Completo** - Toda la información
- 👷 **Reporte Albañil** - Solo trabajos pendientes sin precios

## 📱 Responsive Design

Optimizado para:
- 📱 **iPhone 16 Pro** (393x852px)
- 📱 **iPhone 12 Pro Max** (428x926px)
- 💻 **Desktop** (1200px+)
- 📟 **Tablets** (768px-1024px)

## 🎨 Diseño

- **Glassmorphism** con `backdrop-filter`
- **Gradientes** dinámicos
- **Animaciones** hover suaves
- **Tipografía** Inter de Google Fonts
- **Iconos** emoji nativos

## 🔗 API Connection

Se conecta al backend en `http://localhost:3001/api`

## 📦 Dependencias Principales

```json
{
  "react": "^18.2.0",
  "jspdf": "^2.5.1",
  "jspdf-autotable": "^3.5.31"
}
```