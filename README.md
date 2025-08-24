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

## 🛠️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Render home page with todos |
| GET | `/?priority=high\|medium\|low` | Filter todos by priority |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/:id` | Update an existing todo |
| DELETE | `/todos/:id` | Delete a todo |

### API Request Examples

**Create Todo:**
```javascript
POST /todos
Content-Type: application/json

{
  "task": "Complete project documentation",
  "priority": "high"
}
```

**Update Todo:**
```javascript
PUT /todos/1
Content-Type: application/json

{
  "task": "Updated task description",
  "priority": "medium",
  "completed": false
}
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

## 🔧 Customization

### Styling
The application uses custom CSS with:
- CSS Grid and Flexbox for layout
- CSS Variables for consistent theming
- Smooth animations and transitions
- Responsive design patterns

### Adding New Priority Levels
1. Update the priority options in `views/index.ejs`
2. Add corresponding CSS classes in `public/styles.css`
3. Update the filter buttons and logic in the frontend
4. Modify the server-side validation in `index.js`

### Customizing Colors
Edit the CSS variables or gradient values in `public/styles.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #27ae60;
  --warning-color: #f39c12;
  --danger-color: #e74c3c;
}
```

### Database Integration
To replace array storage with a database:
1. Install database driver (e.g., `npm install mongodb` or `npm install mysql2`)
2. Replace the `todos` array with database operations
3. Update CRUD functions to use database queries
4. Add connection handling and error management

## 🧪 Testing

### Manual Testing Checklist
- [ ] Add task with empty input (should show error)
- [ ] Add task with valid input (should succeed)
- [ ] Edit task with valid input (should update)
- [ ] Delete task (should show confirmation and remove)
- [ ] Toggle task completion (should update status)
- [ ] Filter by different priorities (should show correct tasks)
- [ ] Test responsive design on different screen sizes
- [ ] Verify all animations and transitions work smoothly

### Browser Compatibility
Tested on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables
Create a `.env` file for environment-specific settings:
```env
PORT=3000
NODE_ENV=production
```

### Docker Deployment
Create a `Dockerfile`:
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Cloud Deployment
The application can be deployed to:
- **Heroku**: Add `Procfile` with `web: npm start`
- **Vercel**: Configure `vercel.json` for serverless deployment
- **Netlify**: Use Netlify Functions for backend
- **AWS EC2**: Standard Node.js deployment
- **Google Cloud**: App Engine or Compute Engine

## 📚 Code Structure

### Backend (index.js)
- **Express Setup**: Server configuration and middleware
- **Routes**: RESTful API endpoints for CRUD operations
- **Data Storage**: In-memory array for todos
- **Error Handling**: Comprehensive error management
- **Validation**: Server-side input validation

### Frontend (script.js)
- **Event Handling**: Form submissions and user interactions
- **AJAX Requests**: Asynchronous API calls
- **DOM Manipulation**: Dynamic UI updates
- **Animations**: Smooth transitions and feedback
- **Validation**: Client-side input validation

### Templates (EJS)
- **Modular Design**: Reusable header and footer components
- **Dynamic Content**: Server-side rendering with EJS
- **Responsive Layout**: Mobile-first responsive design
- **Accessibility**: Semantic HTML and ARIA attributes

## 🔒 Security Features

- **Input Validation**: Both client and server-side validation
- **XSS Prevention**: EJS auto-escaping prevents script injection
- **Length Limits**: Task input limited to 200 characters
- **Error Handling**: Secure error messages without sensitive data
- **Content Security**: No eval() or unsafe dynamic content

## 🎯 Performance Optimizations

- **Efficient DOM Updates**: Minimal DOM manipulation
- **Debounced Events**: Prevent excessive API calls
- **CSS Animations**: Hardware-accelerated transitions
- **Optimized Assets**: Minified CSS and compressed images
- **Lazy Loading**: Progressive enhancement patterns

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

**Module Not Found:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Tasks Not Updating:**
- Check browser console for JavaScript errors
- Verify API endpoints are responding correctly
- Clear browser cache and reload

### Debug Mode
Add debug logging by setting environment variable:
```bash
DEBUG=todo:* npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit changes: `git commit -am 'Add new feature'`
5. Push to branch: `git push origin feature-name`
6. Submit a pull request

### Code Style
- Use 2 spaces for indentation
- Follow ESLint recommendations
- Add comments for complex logic
- Use meaningful variable names

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Font Awesome** - Icons used throughout the application
- **CSS Grid & Flexbox** - Modern layout techniques
- **EJS Template Engine** - Server-side rendering
- **Express.js** - Fast, unopinionated web framework
- **Node.js** - JavaScript runtime environment

## 📞 Support

For support, please:
1. Check the troubleshooting section above
2. Review the code comments and documentation
3. Create an issue on the repository
4. Contact the development team

---

**Happy Coding!** 🎉

Built with ❤️ using Node.js, Express, and EJS