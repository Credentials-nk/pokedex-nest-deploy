# Pokedex API

API REST desarrollada con NestJS para gestionar un Pokédex con MongoDB. Enfocada en gestión de entornos y deploy containerizado.

## Requisitos Previos

- Node.js (v18 o superior)
- pnpm
- Docker y Docker Compose

## 🚀 Configuración de Entorno

### Variables de Entorno Disponibles

1. **Copiar archivo plantilla:**

```bash
cp .env.template .env
```

2. **Variables configurables** en [/.env](.env):

| Variable        | Descripción                      | Ejemplo                                                             |
| --------------- | -------------------------------- | ------------------------------------------------------------------- |
| `MONGODB`       | Cadena de conexión a MongoDB     | `mongodb://user:pass@localhost:27017/nest-pokedex?authSource=admin` |
| `PORT`          | Puerto de la API                 | `3000`                                                              |
| `DEFAULT_LIMIT` | Límite de paginación por defecto | `10`                                                                |

### Entornos

- **Desarrollo** (`.env`): Usa `docker-compose.yml`
- **Producción** (`.env.prod`): Usa `docker-compose.prod.yaml`

**Nota:** Los archivos `.env` y `.env.prod` son ignorados por git. Copia desde `.env.template`.

## 🐳 Deploy & Orquestación Docker

### Desarrollo

Levantar stack completo con MongoDB:

```bash
docker-compose up -d
pnpm install
pnpm start:dev
```

La API estará disponible en `http://localhost:3000`

### Producción

**Build y deploy:**

```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

**Solo run (con imagen ya construida):**

```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up
```

**Nota Importante:** Docker Compose utiliza automáticamente el archivo `.env` si no se especifica otra fuente. Si configuraste `.env` con variables de producción, simplemente ejecuta:

```bash
docker-compose -f docker-compose.prod.yaml up --build
```

## 📜 Scripts Disponibles

```bash
# Desarrollo
pnpm start:dev          # Modo desarrollo con hot-reload
pnpm start:debug        # Modo desarrollo con debugger

# Producción
pnpm build              # Compilar aplicación
pnpm start:prod         # Ejecutar en modo producción

# Docker
docker-compose up -d    # Levantar stack de desarrollo
docker-compose down     # Detener stack

# Testing
pnpm test               # Ejecutar tests
pnpm test:e2e           # Ejecutar tests e2e
pnpm test:cov           # Coverage de tests
```

## API Endpoints

### Pokémon

- `GET /api/v2/pokemon` - Listar pokémon (con paginación)
  - `?limit=20&offset=0` - Parámetros de paginación personalizados
- `GET /api/v2/pokemon/:term` - Obtener por ID, número o nombre
- `POST /api/v2/pokemon` - Crear pokémon
- `PATCH /api/v2/pokemon/:term` - Actualizar pokémon
- `DELETE /api/v2/pokemon/:id` - Eliminar pokémon

### Seed

- `GET /api/seed` - Cargar Pokédex completo (700+ Pokémon)

## MongoDB

**Conexión por defecto en `docker-compose.yml`:**

```
mongodb://mongo_user:mongo_password@localhost:27017/nest-pokedex?authSource=admin
```

**Credenciales:**

- Usuario: `mongo_user`
- Contraseña: `mongo_password`
- Base de datos: `nest-pokedex`

## Estructura del Proyecto

```
src/
├── config/              # Configuración de envs y validación
├── common/              # Utilidades y pipes personalizados
├── pokemon/             # Módulo de Pokémon
│   ├── dto/            # Data Transfer Objects
│   ├── entities/       # Entidades de Mongoose
│   ├── pokemon.controller.ts
│   ├── pokemon.service.ts
│   └── pokemon.module.ts
├── seed/                # Módulo de seed de datos
│   ├── seed.controller.ts
│   ├── seed.service.ts
│   └── seed.module.ts
├── app.module.ts       # Módulo principal
└── main.ts             # Entry point
```

## Referencias

- [Pokédex Data](https://gist.github.com/Klerith/e7861738c93712840ab3a38674843490)
