# Employee Management System (EmployeeMS)

A full-stack web application for managing employee information, built with React.js frontend and Node.js backend.

https://youtu.be/V6l3ELOMazc


## 🚀 Features

### Frontend (React.js)
- **Employee Management**: Add, edit, view, and delete employee records
- **Category Management**: Organize employees by categories/departments
- **User Authentication**: Secure login system for administrators
- **Profile Management**: Update user profiles and settings
- **Responsive Design**: Modern UI that works on desktop and mobile
- **Image Upload**: Upload and manage employee profile pictures
- **Real-time Updates**: Dynamic data updates without page refresh

### Backend (Node.js)
- **RESTful API**: Complete CRUD operations for employees and categories
- **Authentication**: JWT-based authentication system
- **File Upload**: Handle image uploads with proper validation
- **Database Integration**: MongoDB with Mongoose ODM
- **Error Handling**: Comprehensive error handling and validation
- **Security**: Input validation and sanitization

## 🛠️ Tech Stack

### Frontend
- **React.js** - Frontend framework
- **Axios** - HTTP client for API calls
- **React Router** - Client-side routing
- **Bootstrap** - CSS framework for responsive design
- **Vite** - Build tool and development server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Multer** - File upload middleware
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

## 📁 Project Structure

```
EmployeeMS/
├── EmployeeMS/          # Frontend React application
│   ├── src/
│   │   ├── Components/  # React components
│   │   ├── assets/      # Static assets
│   │   └── App.jsx      # Main application component
│   ├── public/          # Public assets
│   └── package.json     # Frontend dependencies
├── Server/              # Backend Node.js application
│   ├── models/          # Database models
│   ├── Routes/          # API routes
│   ├── Public/          # Uploaded files
│   └── index.js         # Server entry point
└── README.md           # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/Sushil811/Employee-Management.git
cd Employee-Management
```

### Step 2: Backend Setup
```bash
cd Server
npm install
```

Create a `.env` file in the Server directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/employeems
JWT_SECRET=your_jwt_secret_key_here
```

### Step 3: Frontend Setup
```bash
cd ../EmployeeMS
npm install
```

### Step 4: Start the Application

#### Start Backend Server
```bash
cd Server
npm start
```
The backend will run on `http://localhost:3000`

#### Start Frontend Development Server
```bash
cd EmployeeMS
npm run dev
```
The frontend will run on `http://localhost:5173`

## 📖 Usage

### Admin Login
1. Open the application in your browser
2. Navigate to the login page
3. Use the default admin credentials (or create a new admin account)
4. Access the dashboard to manage employees and categories

### Managing Employees
- **Add Employee**: Fill out the employee form with name, email, salary, address, and category
- **Edit Employee**: Click the edit button to modify employee information
- **Delete Employee**: Remove employees from the system
- **View Employees**: Browse all employees with search and filter options

### Managing Categories
- **Add Category**: Create new employee categories/departments
- **Edit Category**: Modify existing categories
- **Delete Category**: Remove categories (ensure no employees are assigned)

## 🔧 API Endpoints

### Authentication
- `POST /auth/admin_login` - Admin login
- `POST /auth/employee_login` - Employee login

### Employees
- `GET /auth/employee` - Get all employees
- `GET /auth/employee/:id` - Get employee by ID
- `POST /auth/add_employee` - Add new employee
- `PUT /auth/update_employee/:id` - Update employee
- `DELETE /auth/delete_employee/:id` - Delete employee

### Categories
- `GET /auth/category` - Get all categories
- `POST /auth/add_category` - Add new category
- `PUT /auth/update_category/:id` - Update category
- `DELETE /auth/delete_category/:id` - Delete category

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend:
   ```bash
   cd EmployeeMS
   npm run build
   ```
2. Deploy the `dist` folder to your preferred hosting service

### Backend Deployment (Railway/Render)
1. Set up environment variables in your hosting platform
2. Deploy the Server directory
3. Update the frontend API base URL to point to your deployed backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sushil** - [GitHub Profile](https://github.com/Sushil811)

## 🙏 Acknowledgments

- React.js community for the amazing framework
- MongoDB team for the excellent database
- Bootstrap team for the responsive CSS framework
- All contributors and supporters of this project

---

**Note**: Make sure to update the MongoDB connection string and JWT secret in the `.env` file before running the application. Also, ensure that MongoDB is running on your system or use a cloud database service like MongoDB Atlas. 
