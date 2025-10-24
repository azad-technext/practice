# Express Backend

A simple Express.js backend server.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

## API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint
- `GET /api/data` - Get sample data
- `POST /api/data` - Create new data

## Environment Variables

- `PORT` - Server port (default: 5000)

Configure in `.env` file.
