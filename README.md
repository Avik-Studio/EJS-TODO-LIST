# 📝 Dynamic Todo List Application

A modern, responsive Todo List web application built with **Node.js**, **Express**, and **EJS**. Features include task management with priority levels, inline editing, real-time updates, and a beautiful responsive design.

🌐 **[Live Demo](https://ejs-todo-list-cum3.vercel.app/)**

## ✨ Features

### Core Functionality
- ✅ **Add Tasks** - Create new todos with priority levels
- ✏️ **Edit Tasks** - Inline editing with modal popup
- 🗑️ **Delete Tasks** - Remove tasks with confirmation
- 📋 **Task Completion** - Mark tasks as completed/incomplete
- 🎯 **Priority Filters** - Filter tasks by High, Medium, Low priority
- 📱 **Responsive Design** - Works perfectly on all devices

### User Experience
- 🎨 **Modern UI** - Beautiful gradient backgrounds and animations
- ⚡ **Real-time Updates** - Dynamic UI updates without page refresh
- 🔔 **Toast Notifications** - Success and error messages
- ⏰ **Live Clock** - Current time display in header
- 🎭 **Smooth Animations** - Engaging micro-interactions

### Technical Features
- 🛡️ **Input Validation** - Client and server-side validation
- 🔄 **CRUD Operations** - Complete Create, Read, Update, Delete functionality
- 📊 **Task Statistics** - Task count and filtering stats
- 🎯 **Error Handling** - Comprehensive error management
- 📚 **Clean Code** - Well-organized, commented, and modular code

## 🚀 Quick Start

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. **Clone or create the project directory:**
```bash
mkdir dynamic-todo-list
cd dynamic-todo-list
```

2. **Create the project structure:**
```
dynamic-todo-list/
├── index.js
├── package.json
├── README.md
├── views/
│   ├── index.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
└── public/
    ├── styles.css
    └── script.js
```

3. **Install dependencies:**
```bash
npm install
```

4. **Start the application:**
```bash
# Production
npm start

# Development (with nodemon)
npm run dev
```

5. **Open your browser:**
Navigate to `http://localhost:3000`

## 📁 Project Structure

```
dynamic-todo-list/
├── index.js              # Express server and API routes
├── package.json           # Project dependencies and scripts
├── README.md             # Project documentation
├── views/                # EJS templates
│   ├── index.ejs         # Main todo list page
│   └── partials/         # Reusable components
│       ├── header.ejs    # Header component
│       └── footer.ejs    # Footer component
└── public/               # Static assets
    ├── styles.css        # Complete CSS styles
    └── script.js         # Frontend JavaScript
```

## 🎨 Features Overview

### Task Management
- **Add Tasks**: Enter task description, select priority, and add
- **Edit Tasks**: Click edit button to modify task inline
- **Delete Tasks**: Click delete button with confirmation dialog
- **Mark Complete**: Checkbox to mark tasks as completed
- **Priority Levels**: High (red), Medium (orange), Low (green)

### Filtering & Search
- **All Tasks**: View all tasks regardless of priority
- **Priority Filter**: Filter by High, Medium, or Low priority
- **Real-time Counts**: See total and filtered task counts

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Adapts to tablet screen sizes
- **Desktop Experience**: Full-featured desktop layout
- **Touch-Friendly**: Large tap targets for mobile users

