const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage for todos
let todos = [
    { id: 1, task: 'Sample High Priority Task', priority: 'high', completed: false },
    { id: 2, task: 'Sample Medium Priority Task', priority: 'medium', completed: false },
    { id: 3, task: 'Sample Low Priority Task', priority: 'low', completed: true }
];

// Counter for generating unique IDs
let todoIdCounter = 4;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes

// GET - Render home page with todos
app.get('/', (req, res) => {
    const { priority } = req.query;
    let filteredTodos = todos;
    
    // Filter by priority if specified
    if (priority && priority !== 'all') {
        filteredTodos = todos.filter(todo => todo.priority === priority);
    }
    
    res.render('index', { 
        todos: filteredTodos, 
        selectedPriority: priority || 'all',
        totalCount: todos.length,
        filteredCount: filteredTodos.length
    });
});

// POST - Add new todo
app.post('/todos', (req, res) => {
    const { task, priority } = req.body;
    
    // Validate input
    if (!task || task.trim() === '') {
        return res.status(400).json({ 
            success: false, 
            message: 'Task cannot be empty!' 
        });
    }
    
    // Create new todo
    const newTodo = {
        id: todoIdCounter++,
        task: task.trim(),
        priority: priority || 'medium',
        completed: false
    };
    
    todos.push(newTodo);
    
    // Return JSON response for AJAX requests
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.json({ 
            success: true, 
            todo: newTodo,
            message: 'Task added successfully!' 
        });
    }
    
    // Redirect for form submissions
    res.redirect('/');
});

// PUT - Edit todo
app.put('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const { task, priority, completed } = req.body;
    
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
    
    if (todoIndex === -1) {
        return res.status(404).json({ 
            success: false, 
            message: 'Todo not found!' 
        });
    }
    
    // Validate task input
    if (!task || task.trim() === '') {
        return res.status(400).json({ 
            success: false, 
            message: 'Task cannot be empty!' 
        });
    }
    
    // Update todo
    todos[todoIndex].task = task.trim();
    todos[todoIndex].priority = priority || todos[todoIndex].priority;
    
    if (completed !== undefined) {
        todos[todoIndex].completed = completed === 'true' || completed === true;
    }
    
    res.json({ 
        success: true, 
        todo: todos[todoIndex],
        message: 'Task updated successfully!' 
    });
});

// DELETE - Remove todo
app.delete('/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
    
    if (todoIndex === -1) {
        return res.status(404).json({ 
            success: false, 
            message: 'Todo not found!' 
        });
    }
    
    const deletedTodo = todos.splice(todoIndex, 1)[0];
    
    res.json({ 
        success: true, 
        todo: deletedTodo,
        message: 'Task deleted successfully!' 
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!' 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Todo List Server running on http://localhost:${PORT}`);
    console.log(`📝 Total todos in memory: ${todos.length}`);
});