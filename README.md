# Timber

A full-stack web application designed to streamline project tracking, task assignments, and team collaboration.

---

## Demo Link

[Live Demo](https://peak-sprint.vercel.app/)  

---

## Login

> **Guest**  
> Email: `ryan@gmail.com`  
> Password: `Ryan@123`

---

## Quick Start

```
git clone https://github.com/mdmohsanul/PeakSprint.git
cd PeakSprint
npm install
npm run dev 
```

## Technologies
- React JS
- JavaScript
- React Router
- Node.js
- Express
- MongoDB
- JWT
- TailwindCSS

## Demo Video
Watch a walkthrough of all major features of this app:
[Loom Video Link](https://www.loom.com/share/74276578afd640bca354ba1b9d02cad7?sid=907f3a7f-6bab-49ac-b0fd-05e6645c0e3a)

## Features

**Dashboard**
- View a summary of active projects and their associated tasks.
- "Easily create new projects using the "Add Project" button.
- Quickly add tasks to specific projects with the "Add Task" button.

**Projects**
- Display all available projects in a structured layout.
- Supports URL-based filtering, preserving the selected state even after browser refresh.

**Teams**
- List all teams within the application.
- Use the "Add Team" button to create a new team, and manage team members by adding or removing users.

**Authentication**
- Implemented JWT-based authentication with email/password login for secure user access and protected routes.


## API Reference

### **GET /api/projects**<br>	 
Fetch all projects<br>	 
Sample Response:<br>
```[{ "_id": "proj123", "title": "Dashboard Redesign", "description": "...", ... }]
```

### **POST /api/projects**<br>	 
Create a new project<br>	 
Sample Response:<br>
```{ "title": "New Project", "description": "Project details here" }
```

### **GET /api/tasks**<br>	 
Get all tasks<br>	 
Sample Response:<br>
```[{ "_id": "task001", "title": "Setup frontend", "projectId": "proj123", ... }]
```

### **GET /api/tasks/:id**<br>	 
Get tasks for a specific project by project ID<br>	 
Sample Response:<br>
```[{ "_id": "task002", "title": "Integrate API", "projectId": "proj123" }]
```

### **GET /api/tasks/task/:id**<br>	 
Get a single task by task ID<br>	 
Sample Response:<br>
```{ "_id": "task003", "title": "Fix bugs", "status": "in-progress", ... }
```


### **GET /api/teams**<br>	 
Fetch all teams<br>	 
Sample Response:<br>
```[{ "_id": "team001", "name": "Frontend Team", "members": [...] }]
```


### **POST /api/teams**<br>	 
Create a new team<br>	 
Sample Response:<br>
```{ "name": "QA Team", "members": ["user123", "user456"] }
```

## Contact
For bugs or feature requests, please reach out to mdmohsan2407@gmail.com
