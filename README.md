
# Task Manager Application

A full-stack task management application built with **React**, **Express**, and **PostgreSQL**. The application allows users to manage tasks across different columns, assign tags, and track logs for various task actions.

---

Here is a quick demo of the application in action:

<video src="./frontend/public/video/demo.mp4" controls="controls" style="max-width: 100%; height: auto;">
Your browser does not support the video tag.
</video>
## Features

### 1. **Task Management**
   - **Create Tasks**: Add new tasks with a title, description, and tag.
   - **Update Tasks**: Move tasks between columns or reorder them within the same column.
   - **View Tasks**: Tasks are organized into columns (`Backlog`, `To Do`, `Done`).

### 2. **Tag Management**
   - **Create Tags**: Create tags with a name and color to categorize tasks.
   - **View Tags**: Fetch all available tags for task assignment.

### 3. **Logs**
   - Tracks task movements and actions, including:
     - Moving tasks between columns.
     - Reordering tasks within columns.

---

## Project Structure

### Backend
```
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── logController.js
│   ├── tagController.js
│   └── taskController.js
├── models/
│   ├── Log.js
│   ├── Tag.js
│   └── Task.js
├── routes/
│   ├── logRoutes.js
│   ├── tagRoutes.js
│   └── taskRoutes.js
├── .env
├── server.js
└── package.json
```

### Frontend
```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Column.js
│   │   ├── CreateTagModal.js
│   │   ├── CreateTaskModal.js
│   │   └── Task.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   └── LogsPage.js
│   ├── services/
│   │   ├── logService.js
│   │   ├── tagService.js
│   │   └── taskService.js
│   ├── styles/
│   │   ├── Column.css
│   │   ├── CreateTagModal.css
│   │   ├── CreateTaskModal.css
│   │   ├── LogPage.css
│   │   ├── LogsPage.css
│   │   └── Task.css
│   ├── App.js
│   ├── index.js
│   └── reportWebVitals.js
├── .gitignore
└── package.json
```

---

## How to Run

### Backend
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file with the following variables:
   ```env
   DB_NAME=task_manager
   DB_USER=your_username
   DB_PASS=your_password
   DB_HOST=localhost
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```


## Database Setup

1. Export your database schema:
   ```bash
   pg_dump -U postgres -s -d task_manager > schema.sql
   ```

2. Import the schema to a new database:
   ```bash
   psql -U postgres -d new_task_manager < schema.sql
   ```

---

## Usage

1. Open the application in your browser at `http://localhost:3000`.
2. Use the columns to manage your tasks.
3. Assign tags to tasks and track actions through logs.

---


