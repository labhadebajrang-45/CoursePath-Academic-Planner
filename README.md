# CoursePath – Academic Planner

A professional 5-page SE website project for managing courses, prerequisites, academic planning, and student tasks.

## Pages

1. `index.html` – Home / dashboard
2. `courses.html` – Course catalog and prerequisite graph
3. `planner.html` – Semester planner and study tasks
4. `about.html` – Project information
5. `contact.html` – Contact / feedback form

## Technologies

- HTML5
- CSS3
- JavaScript
- SVG for directed prerequisite graph
- LocalStorage for browser-side demo data
- Node.js + Express backend
- MySQL database

## Main Features

- Course search and filtering
- Course prerequisite visualization
- Add/remove courses from planner
- Semester planning
- Task management
- Progress statistics
- Contact/feedback form
- Responsive design
- MySQL-ready API

## Project Structure

```text
CoursePath_Academic_Planner/
├── index.html
├── courses.html
├── planner.html
├── about.html
├── contact.html
├── style.css
├── script.js
├── server.js
├── package.json
├── .env.example
├── database/
│   └── schema.sql
└── README.md
```

## 1. Frontend-only mode

You can open `index.html` directly in a browser. Planner data is saved using LocalStorage.

## 2. Full setup with Node.js + MySQL

Install Node.js and MySQL first.

Open PowerShell inside this project:

```powershell
npm install
```

Create `.env` from `.env.example` and edit the MySQL password if required.

Create the database:

```powershell
mysql -u root -p
```

Then inside MySQL:

```sql
SOURCE database/schema.sql;
```

Exit MySQL:

```sql
exit
```

Start the server:

```powershell
npm start
```

Open:

```text
http://localhost:3000
```

## Important

The frontend works without MySQL. The backend is included so the project can be demonstrated as a database-enabled SE project.

## Suggested SE submission title

CoursePath – Academic Planner: A Web-Based Course Prerequisite and Academic Planning System

## Suggested objectives

- Help students understand course prerequisites.
- Visualize dependencies using a directed graph.
- Help students plan semesters.
- Track academic tasks.
- Store student feedback in a database.

## Suggested future scope

- Student login
- Faculty/admin dashboard
- Authentication
- Cloud database
- Notifications
- AI-based course recommendations
