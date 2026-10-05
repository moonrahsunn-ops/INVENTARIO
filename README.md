# 📦 Inventory App - Local

App de inventario completamente independiente, sin Base44, funciona 100% offline en Android.

## ✨ Características

- ✅ **Sin internet requerido** - Funciona completamente offline
- ✅ **Almacenamiento local** - Toda la data en tu teléfono
- ✅ **Sin login** - Usa la app inmediatamente
- ✅ **Bonita y moderna** - Radix UI + Tailwind CSS
- ✅ **Exporta/Importa** - Respaldos en JSON
- ✅ **Dashboard** - Estadísticas y gráficos en tiempo real
- ✅ **Gestor de productos** - CRUD completo
- ✅ **Registro de ventas** - Tracking automático

## 🚀 Quick Start

### Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

### Android

```bash
# Compilar y abrir en Android Studio
npm run android

# O paso a paso:
npm run build
npx cap sync android
npx cap open android
```

## 📱 Estructura de Carpetas

```
├── src/
│   ├── components/        # Componentes React
│   ├── context/          # Context API (estado global)
│   ├── lib/              # Base de datos local (Dexie)
│   ├── pages/            # Páginas principales
│   ├── App.jsx           # App principal
│   └── main.jsx          # Entry point
├── public/               # Archivos estáticos
├── index.html            # HTML principal
├── vite.config.js        # Config de Vite
├── tailwind.config.js    # Config de Tailwind
└── capacitor.config.json # Config de Capacitor (Android)
```

## 🗄️ Base de Datos Local

Utiliza **Dexie** (envoltorio sobre IndexedDB) para almacenamiento completamente local:

- **Products** - Gestión de productos
- **Accessories** - Gestión de accesorios
- **Sales** - Registro de ventas
- **Categories** - Categorías de productos
- **Locations** - Ubicaciones de almacén
- **Users** - Usuarios (sin login, local)
- **Works** - Trabajos/proyectos

## 🔄 Estado Global

Usa **Context API** en lugar de Redux. Archivos principales:

- `src/context/AppContext.jsx` - Estado de la app (productos, ventas, etc)
- `src/context/ThemeContext.jsx` - Temas claro/oscuro

## 📦 Dependencias Principales

- **React 18.2** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- **Radix UI** - Componentes accesibles
- **Dexie** - Base de datos local
- **Recharts** - Gráficos
- **React Router** - Navegación
- **Framer Motion** - Animaciones

## 🔐 Seguridad

- Los datos nunca salen de tu teléfono
- IndexedDB es privado del navegador/app
- No hay servidores remotos
- Haz respaldos regularmente con export

## 📥 Exportar/Importar

```javascript
// Exportar datos
exportData()  // Descarga JSON

// Importar datos
importData(jsonData)  // Carga desde JSON
```

## 🎨 Personalización

### Temas

Cambiar colores principales en `tailwind.config.js`:

```javascript
primary: {
  DEFAULT: '#0066ff',  // Tu color aquí
  foreground: '#ffffff'
}
```

### Componentes

Todos los componentes UI están en `src/components/ui/`

Puedes agregar más desde Radix UI o shadcn/ui

## 📝 Notas Importantes

- ⚠️ Si borras la app, se pierden datos (sin backup externo)
- 💾 Exporta regularmente para respaldos
- 🔋 La app funciona incluso con batería baja
- 📱 APK optimizado para Android 6+

## 🐛 Reportar Problemas

Abre un issue con:
- Versión de Android
- Pasos para reproducir
- Comportamiento esperado

## 📄 Licencia

Este proyecto es tuyo, úsalo como quieras.

---

**¡Disfruta tu app! 🚀**
