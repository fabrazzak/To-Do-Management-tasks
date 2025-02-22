# Task Management Application

A simple yet powerful Task Management Application where users can add, edit, delete, and reorder tasks using a drag-and-drop interface. This app is fully integrated with Firebase Authentication and MongoDB for real-time synchronization of tasks.

## Live Demo

You can view the live application here:  
[**Task Management App Live Demo**](https://sensational-starlight-993275.netlify.app/)

## Technologies Used

- **Frontend**: React, Vite.js, react-beautiful-dnd (or similar drag-and-drop library)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase Authentication (Google Sign-In)
- **Real-time Updates**: MongoDB Change Streams or WebSockets

## Features

1. **Authentication**:  
   Only authenticated users can access the app using Google Sign-In.  
   User details (User ID, email, display name) are stored in the database after the first login.

2. **Task Management**:  
   Users can add, edit, delete, and reorder tasks.  
   Tasks are categorized into three sections: **To-Do**, **In Progress**, and **Done**.  
   Tasks can be moved across categories, and reordered within a category.

3. **Real-Time Data Sync**:  
   All changes (task add, edit, delete, reorder) are synced instantly with the database.  
   MongoDB Change Streams or WebSockets push real-time updates to the frontend.

4. **Frontend**:  
   A clean, minimalistic, and responsive UI using React and Vite.js.  
   Drag-and-drop functionality is powered by **react-beautiful-dnd** or an equivalent library.  
   Modern design with a maximum of four colors for a clean and minimalistic appearance.  

5. **Responsiveness**:  
   The app is responsive and works seamlessly on both desktop and mobile devices, ensuring a smooth drag-and-drop experience on mobile.

6. **Backend API**:  
   Express.js API handles CRUD operations:
   - `POST /tasks`: Add a new task
   - `GET /tasks`: Retrieve all tasks for the logged-in user
   - `PUT /tasks/:id`: Update task details (title, description, category)
   - `DELETE /tasks/:id`: Delete a task

## Bonus Features (Optional)

- Dark Mode Toggle
- Task Due Dates with color indicators (e.g., red for overdue tasks)
- Activity Log to track task changes (e.g., "Task moved to Done")

## Installation

To get started with the app, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-management-app.git
