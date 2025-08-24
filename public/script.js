// DOM Elements
const addTodoForm = document.getElementById('addTodoForm');
const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const todoList = document.getElementById('todoList');
const editModal = document.getElementById('editModal');
const editTodoForm = document.getElementById('editTodoForm');
const editTaskInput = document.getElementById('editTaskInput');
const editPrioritySelect = document.getElementById('editPrioritySelect');
const closeBtn = document.querySelector('.close-btn');
const cancelEditBtn = document.getElementById('cancelEdit');
const toast = document.getElementById('toast');
const currentTimeElement = document.getElementById('currentTime');

// Global variables
let currentEditId = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    setupEventListeners();
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // Focus on task input
    if (taskInput) {
        taskInput.focus();
    }
    
    // Add loading animation to existing todos
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        setTimeout(() => {
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Add todo form submission
    if (addTodoForm) {
        addTodoForm.addEventListener('submit', handleAddTodo);
    }
    
    // Task input enter key
    if (taskInput) {
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTodo(e);
            }
        });
    }
    
    // Edit todo form submission
    if (editTodoForm) {
        editTodoForm.addEventListener('submit', handleEditTodo);
    }
    
    // Modal close events
    if (closeBtn) {
        closeBtn.addEventListener('click', closeEditModal);
    }
    
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', closeEditModal);
    }
    
    // Close modal on outside click
    window.addEventListener('click', function(e) {
        if (e.target === editModal) {
            closeEditModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && editModal.style.display === 'block') {
            closeEditModal();
        }
    });
    
    // Todo list event delegation
    if (todoList) {
        todoList.addEventListener('click', handleTodoListClick);
        todoList.addEventListener('change', handleTodoListChange);
    }
}

/**
 * Update current time display
 */
function updateCurrentTime() {
    if (currentTimeElement) {
        const now = new Date();
        const options = { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true
        };
        currentTimeElement.textContent = now.toLocaleTimeString('en-US', options);
    }
}

/**
 * Handle add todo form submission
 */
async function handleAddTodo(e) {
    e.preventDefault();
    
    const task = taskInput.value.trim();
    const priority = prioritySelect.value;
    
    // Validate input
    if (!task) {
        showAlert('Please enter a task!', 'error');
        taskInput.focus();
        return;
    }
    
    if (task.length > 200) {
        showAlert('Task must be less than 200 characters!', 'error');
        taskInput.focus();
        return;
    }
    
    try {
        // Show loading state
        const addBtn = addTodoForm.querySelector('.add-btn');
        const originalText = addBtn.innerHTML;
        addBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
        addBtn.disabled = true;
        
        const response = await fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ task, priority })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert(result.message, 'success');
            taskInput.value = '';
            prioritySelect.value = 'medium';
            
            // Reload page to show updated list
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            showAlert(result.message || 'Failed to add task', 'error');
        }
    } catch (error) {
        console.error('Error adding todo:', error);
        showAlert('Failed to add task. Please try again.', 'error');
    } finally {
        // Reset button state
        const addBtn = addTodoForm.querySelector('.add-btn');
        addBtn.innerHTML = '<i class="fas fa-plus"></i> Add Task';
        addBtn.disabled = false;
        taskInput.focus();
    }
}

/**
 * Handle todo list clicks (edit and delete buttons)
 */
function handleTodoListClick(e) {
    const target = e.target;
    const todoItem = target.closest('.todo-item');
    
    if (!todoItem) return;
    
    const todoId = todoItem.dataset.id;
    
    // Handle edit button click
    if (target.closest('.edit-btn')) {
        e.preventDefault();
        openEditModal(todoId, todoItem);
    }
    
    // Handle delete button click
    if (target.closest('.delete-btn')) {
        e.preventDefault();
        handleDeleteTodo(todoId, todoItem);
    }
}

/**
 * Handle todo list changes (checkbox changes)
 */
async function handleTodoListChange(e) {
    if (e.target.classList.contains('complete-checkbox')) {
        const todoItem = e.target.closest('.todo-item');
        const todoId = todoItem.dataset.id;
        const completed = e.target.checked;
        
        await updateTodoCompletion(todoId, completed, todoItem);
    }
}

/**
 * Update todo completion status
 */
async function updateTodoCompletion(todoId, completed, todoItem) {
    try {
        const todoText = todoItem.querySelector('.todo-text').textContent.trim();
        const priorityBadge = todoItem.querySelector('.priority-badge');
        const priority = priorityBadge.classList.contains('high') ? 'high' : 
                        priorityBadge.classList.contains('medium') ? 'medium' : 'low';
        
        const response = await fetch(`/todos/${todoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                task: todoText, 
                priority: priority, 
                completed: completed 
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Update UI
            if (completed) {
                todoItem.classList.add('completed');
            } else {
                todoItem.classList.remove('completed');
            }
            
            showAlert('Task updated successfully!', 'success');
        } else {
            // Revert checkbox state
            const checkbox = todoItem.querySelector('.complete-checkbox');
            checkbox.checked = !completed;
            showAlert(result.message || 'Failed to update task', 'error');
        }
    } catch (error) {
        console.error('Error updating todo completion:', error);
        
        // Revert checkbox state
        const checkbox = todoItem.querySelector('.complete-checkbox');
        checkbox.checked = !completed;
        showAlert('Failed to update task. Please try again.', 'error');
    }
}

/**
 * Open edit modal with todo data
 */
function openEditModal(todoId, todoItem) {
    currentEditId = todoId;
    
    const todoText = todoItem.querySelector('.todo-text').getAttribute('data-original');
    const priorityBadge = todoItem.querySelector('.priority-badge');
    const priority = priorityBadge.classList.contains('high') ? 'high' : 
                    priorityBadge.classList.contains('medium') ? 'medium' : 'low';
    
    editTaskInput.value = todoText;
    editPrioritySelect.value = priority;
    
    editModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Focus on input
    setTimeout(() => {
        editTaskInput.focus();
        editTaskInput.select();
    }, 100);
}

/**
 * Close edit modal
 */
function closeEditModal() {
    editModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentEditId = null;
    editTodoForm.reset();
}

/**
 * Handle edit todo form submission
 */
async function handleEditTodo(e) {
    e.preventDefault();
    
    if (!currentEditId) return;
    
    const task = editTaskInput.value.trim();
    const priority = editPrioritySelect.value;
    
    // Validate input
    if (!task) {
        showAlert('Please enter a task!', 'error');
        editTaskInput.focus();
        return;
    }
    
    if (task.length > 200) {
        showAlert('Task must be less than 200 characters!', 'error');
        editTaskInput.focus();
        return;
    }
    
    try {
        // Show loading state
        const saveBtn = editTodoForm.querySelector('.save-btn');
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        saveBtn.disabled = true;
        
        const response = await fetch(`/todos/${currentEditId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ task, priority })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert(result.message, 'success');
            closeEditModal();
            
            // Reload page to show updated list
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            showAlert(result.message || 'Failed to update task', 'error');
        }
    } catch (error) {
        console.error('Error editing todo:', error);
        showAlert('Failed to update task. Please try again.', 'error');
    } finally {
        // Reset button state
        const saveBtn = editTodoForm.querySelector('.save-btn');
        saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
        saveBtn.disabled = false;
    }
}

/**
 * Handle delete todo with confirmation
 */
async function handleDeleteTodo(todoId, todoItem) {
    const todoText = todoItem.querySelector('.todo-text').textContent.trim();
    
    // Show confirmation dialog
    if (!confirm(`Are you sure you want to delete "${todoText}"?`)) {
        return;
    }
    
    try {
        // Add deleting animation
        todoItem.style.transition = 'all 0.3s ease';
        todoItem.style.opacity = '0.5';
        todoItem.style.transform = 'scale(0.95)';
        
        const response = await fetch(`/todos/${todoId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Animate removal
            todoItem.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                showAlert(result.message, 'success');
                
                // Reload page to show updated list
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }, 300);
        } else {
            // Reset animation
            todoItem.style.opacity = '1';
            todoItem.style.transform = 'scale(1)';
            showAlert(result.message || 'Failed to delete task', 'error');
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
        // Reset animation
        todoItem.style.opacity = '1';
        todoItem.style.transform = 'scale(1)';
        showAlert('Failed to delete task. Please try again.', 'error');
    }
}

/**
 * Show alert/toast notification
 */
function showAlert(message, type = 'info') {
    // Remove existing toast classes
    toast.className = 'toast';
    
    // Add type class
    if (type === 'success') {
        toast.classList.add('success');
    } else if (type === 'error') {
        toast.classList.add('error');
    }
    
    toast.textContent = message;
    toast.classList.add('show');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Utility function to debounce function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Add smooth scrolling for better UX
 */
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleAddTodo,
        handleEditTodo,
        handleDeleteTodo,
        showAlert,
        debounce
    };
}