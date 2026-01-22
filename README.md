# Pokedex API

API REST desarrollada con NestJS para gestionar un Pokédex con MongoDB.

## Características

- CRUD completo de Pokémon
- Validación de datos con `class-validator` y `class-transformer`
- Búsqueda flexible por ID de MongoDB, número de Pokédex o nombre
- **Seed de datos inicial** - Carga automática de Pokédex completo
- **Paginación** - Listados con límite y offset configurable
- Servicio de archivos estáticos
- MongoDB con Mongoose
- Pipes personalizados para validación de IDs

## Requisitos

- Node.js (v18 o superior)
- pnpm
- Docker y Docker Compose

## Instalación

1. Clonar el repositorio

2. Instalar dependencias:

```bash
pnpm install
```

## Configuración del entorno

1. Copiar el archivo de variables de entorno y renombrarlo:

```bash
cp .env.template .env
```

2. Completar los valores en [/.env](.env) según tu entorno. Las variables disponibles están definidas en [/.env.template](.env.template):
   - `MONGODB` - Cadena de conexión a MongoDB.
   - `PORT` - Puerto en el que se expondrá la API.
   - `DEFAULT_LIMIT` - Límite de paginación por defecto.

## Arrancar el proyecto

1. Levantar la base de datos MongoDB:

```bash
docker-compose up -d
```

2. Ejecutar la aplicación en modo desarrollo:

```bash
pnpm start:dev
```

La aplicación estará disponible en `http://localhost:3000`

## Poblar la base de datos

Para cargar los datos iniciales de Pokémon:

```bash
GET http://localhost:3000/api/seed
```

O acceder directamente desde el navegador: `http://localhost:3000/api/seed`

**Nota:** Esta operación es idempotente y puede ejecutarse múltiples veces sin afectar los datos existentes.

## Scripts disponibles

```bash
# Desarrollo
pnpm start:dev          # Modo desarrollo con hot-reload
pnpm start:debug        # Modo desarrollo con debugger

# Producción
pnpm build              # Compilar aplicación
pnpm start:prod         # Ejecutar en modo producción

# Base de datos
docker-compose up -d    # Levantar MongoDB
docker-compose down     # Detener MongoDB

# Testing
pnpm test               # Ejecutar tests
pnpm test:e2e           # Ejecutar tests e2e
pnpm test:cov           # Coverage de tests
```

## Endpoints

Todos los endpoints están bajo el prefijo `/api/v2`

### Pokémon

- `GET /api/v2/pokemon` - Listar todos los pokémon con paginación
- `GET /api/v2/pokemon?limit=20&offset=0` - Listar pokémon con parámetros de paginación personalizados
- `GET /api/v2/pokemon/:term` - Obtener un pokémon por ID de MongoDB, número o nombre
- `POST /api/v2/pokemon` - Crear un nuevo pokémon
- `PATCH /api/v2/pokemon/:term` - Actualizar un pokémon
- `DELETE /api/v2/pokemon/:id` - Eliminar un pokémon

### Seed

- `GET /api/seed` - Poblar la base de datos con datos iniciales (Pokédex completo)

## Sistema de Paginación

Los endpoints de listado soportan paginación mediante query parameters:

- `limit` - Número de resultados por página (por defecto: 10)
- `offset` - Número de registros a saltar (por defecto: 0)

Ejemplo:

```
GET /api/v2/pokemon?limit=20&offset=40
```

Retorna los Pokémon del 40 al 60.

## Seed de Datos

Para cargar el Pokédex completo en la base de datos, existe un endpoint de seed que puede ser ejecutado una sola vez:

```bash
GET http://localhost:3000/api/seed
```

O acceder directamente desde el navegador: `http://localhost:3000/api/seed`

Este proceso cargará aproximadamente 700+ Pokémon en la base de datos MongoDB.

La conexión a MongoDB se configura en `app.module.ts`:

```
mongodb://mongo_user:mongo_password@localhost:27017/nest-pokedex?authSource=admin
```

Credenciales (definidas en `docker-compose.yml`):

- Usuario: `mongo_user`
- Password: `mongo_password`
- Base de datos: `nest-pokedex`

## Estructura del proyecto

```
src/
├── common/              # Módulo común (pipes personalizados)
├── pokemon/             # Módulo de Pokémon
│   ├── dto/            # Data Transfer Objects
│   ├── entities/       # Entidades de Mongoose
│   ├── pokemon.controller.ts
│   ├── pokemon.service.ts
│   └── pokemon.module.ts
├── app.module.ts
└── main.ts
```
