# The Student Hub Project

This project is a comprehensive student services platform, consisting of a Backend built with FastAPI and a Frontend built with React.

## Project Structure

The project is organized into two main directories:

-   `backend/`: Contains the FastAPI backend code.
-   `frontend/`: Contains the React frontend code.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

-   **Python 3.11+**
-   **pip** (Python package installer)
-   **Node.js** (LTS version recommended)
-   **pnpm** (Node.js package manager, install with `npm install -g pnpm`)
-   **PostgreSQL** (for the database, or SQLite for quick local development)
-   **Docker** and **Docker Compose** (for containerized deployment)

## Backend Setup and Running

Follow these steps to set up and run the backend:

1.  **Navigate to the backend directory:**
    ```bash
    cd student_hub/backend
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python3.11 -m venv venv
    source venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up environment variables (`.env` file):**
    Create a file named `.env` in the `student_hub/backend/` directory (at the same level as `main.py`) and add the following variables. You can use `sqlite:///./sql_app.db` for a local SQLite database for development, or configure PostgreSQL.
    ```
    DATABASE_URL="postgresql://user:password@db:5432/student_hub_db"
    SECRET_KEY="your-super-secret-key"
    ALGORITHM="HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES=30
    # SENTRY_DSN="your-sentry-dsn-if-any"
    ```
    **Note:** If using SQLite for development, change `DATABASE_URL` to `sqlite:///./sql_app.db`.

5.  **Run database migrations (Alembic):**
    ```bash
    alembic upgrade head
    ```
    This step will create the necessary tables in your database.

6.  **Run the FastAPI server:**
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ```
    The backend will be running at `http://localhost:8000`. You can access the interactive API documentation (Swagger UI) at `http://localhost:8000/docs`.

## Frontend Setup and Running

Follow these steps to set up and run the frontend:

1.  **Navigate to the frontend directory:**
    ```bash
    cd student_hub/frontend
    ```

2.  **Install dependencies using pnpm:**
    ```bash
    pnpm install
    ```

3.  **Run the React development server:**
    ```bash
    pnpm run dev
    ```
    The frontend will typically run on `http://localhost:5173`. Ensure the backend is running for the frontend to connect properly.

## Docker Deployment

For containerized deployment using Docker Compose:

1.  **Ensure Docker and Docker Compose are installed.**

2.  **Create a `docker-compose.yml` file** in the root of your `student_hub/` directory:
    ```yaml
    version: '3.8'

    services:
      db:
        image: postgres:13
        volumes:
          - postgres_data:/var/lib/postgresql/data/
        environment:
          POSTGRES_DB: student_hub_db
          POSTGRES_USER: user
          POSTGRES_PASSWORD: password
        ports:
          - "5432:5432"

      backend:
        build: ./backend
        command: uvicorn main:app --host 0.0.0.0 --port 8000
        volumes:
          - ./backend:/app
        ports:
          - "8000:8000"
        environment:
          DATABASE_URL: postgresql://user:password@db:5432/student_hub_db
          SECRET_KEY: "your-super-secret-key"
          ALGORITHM: "HS256"
          ACCESS_TOKEN_EXPIRE_MINUTES: 30
        depends_on:
          - db

      frontend:
        build: ./frontend
        ports:
          - "5173:5173"
        volumes:
          - ./frontend:/app
        depends_on:
          - backend

    volumes:
      postgres_data:
    ```

3.  **Create `Dockerfile` for backend** in `student_hub/backend/`:
    ```dockerfile
    FROM python:3.11-slim-buster

    WORKDIR /app

    COPY requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt

    COPY . .

    EXPOSE 8000

    CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
    ```

4.  **Create `Dockerfile` for frontend** in `student_hub/frontend/`:
    ```dockerfile
    FROM node:20-alpine

    WORKDIR /app

    COPY package.json pnpm-lock.yaml ./
    RUN pnpm install --frozen-lockfile

    COPY . .

    RUN pnpm build

    EXPOSE 5173

    CMD ["pnpm", "preview"]
    ```

5.  **Build and run the services:**
    ```bash
    docker-compose up --build
    ```
    This will build the Docker images and start the database, backend, and frontend services.

## Additional Services

The platform is designed to integrate with the following services:

-   **Email Notifications:** For user registration, password resets, and service updates.
-   **Analytics:** To track user behavior and platform performance.
-   **Telegram Notifications:** For real-time alerts and administrative messages.

Integration details for these services can be found in the respective backend service modules.

## Notes

-   **CORS:** The backend is configured to allow CORS requests from `http://localhost:5173` and `http://localhost:8000`. If you run the frontend on a different port or deploy it to a different domain, you will need to update the `origins` list in `student_hub/backend/main.py`.
-   **Environment:** Ensure all necessary environment variables (especially `SECRET_KEY` and `DATABASE_URL`) are correctly set in your `.env` file for the backend, or within the `docker-compose.yml` for Docker deployments.

--- 

We wish you a pleasant development experience!
