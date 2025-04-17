
# Backend Server Setup

This is the backend server for the El Mejor Prompt application.

## Setup Instructions

1. Make sure you have PostgreSQL installed and running

2. Create a `.env` file in the backend directory with:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/prompts?schema=public"
OPENAI_API_KEY="your-openai-api-key"
PORT=3000
```

3. Replace the placeholder values with your actual database credentials and OpenAI API key

4. Initialize the database:

```
cd backend
npx prisma migrate dev --name init
```

5. Start the development server:

```
npm run dev
```

The server will be running on http://localhost:3000
