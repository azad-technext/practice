# Backend Setup Instructions

## Prerequisites
- PostgreSQL installed and running
- Node.js installed

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the backend root directory with:
```env
DB_USER=your_postgres_username
DB_HOST=localhost
DB_DATABASE=your_database_name
DB_PASSWORD=your_postgres_password
DB_PORT=5432
PORT=5000
```

### 3. Setup Database
Run the database setup script to create tables:
```bash
npm run setup-db
```

### 4. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints
- `GET /api/health` - Health check
- `GET /api/data` - Get all items
- `POST /api/data` - Create new item (requires `name` in request body)

## Troubleshooting
- Make sure PostgreSQL is running
- Verify database credentials in `.env` file
- Check that the database exists
- Run `npm run setup-db` if tables are missing
