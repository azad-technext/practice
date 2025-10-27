# Next.js Fullstack Application

A modern fullstack web application built with Next.js 14, TypeScript, and PostgreSQL. This project combines both frontend and backend functionality in a single Next.js application using API routes.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **PostgreSQL** database integration
- **API Routes** for backend functionality
- **Modern UI** with responsive design
- **Database scripts** for easy setup

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── data/route.ts      # Data CRUD operations
│   │   │   └── health/route.ts    # Health check endpoint
│   │   ├── globals.css            # Global styles
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Home page
│   └── lib/
│       └── database.ts            # Database configuration
├── database/
│   └── schema.sql                 # Database schema
├── scripts/
│   ├── setup-db.js               # Database setup script
│   └── check-db.js               # Database check script
├── .env.local                    # Environment variables
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

Make sure PostgreSQL is running on your system, then:

1. Copy the environment file and update with your database credentials:
```bash
cp .env.local.example .env.local
```

2. Update `.env.local` with your database configuration:
```env
DB_USER=your_db_user
DB_HOST=localhost
DB_DATABASE=your_database_name
DB_PASSWORD=your_db_password
DB_PORT=5432
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Run the database setup script:
```bash
npm run setup-db
```

4. Verify the database setup:
```bash
npm run check-db
```

### 3. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run setup-db` - Set up database tables
- `npm run check-db` - Check database connection and tables
- `npm run test-table` - Test database operations

## 📡 API Endpoints

### Health Check
- **GET** `/api/health` - Check API status

### Data Operations
- **GET** `/api/data` - Fetch all data items
- **POST** `/api/data` - Create a new data item
  ```json
  {
    "name": "Item name"
  }
  ```

## 🎨 Features Demonstrated

1. **Health Check** - Test API connectivity
2. **Data Fetching** - Retrieve data from PostgreSQL
3. **Data Creation** - Add new items to the database
4. **Error Handling** - Proper error messages and loading states
5. **TypeScript Integration** - Full type safety throughout the application

## 🔄 Migration from Express + React

This project was converted from a separate Express.js backend and React frontend to a unified Next.js application:

- Express routes → Next.js API routes
- React components → Next.js pages/components
- Separate servers → Single Next.js server
- Vite bundling → Next.js built-in bundling

## 🚀 Deployment

The application can be deployed to platforms like:
- Vercel (recommended for Next.js)
- Netlify
- Railway
- Heroku

Make sure to set up your environment variables in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
