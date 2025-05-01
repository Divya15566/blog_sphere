# BlogSphere

BlogSphere is a full-stack blogging platform that allows users to create, edit, and delete blog posts. It features user authentication, responsive design, and a seamless user experience.

## Features
- User registration and login
- Create, edit, and delete blog posts
- View all blogs and user-specific posts
- Responsive design with Tailwind CSS and Bootstrap

## Technologies Used
- **Frontend**: React, Axios, Tailwind CSS, Bootstrap
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT (JSON Web Tokens), bcryptjs

## Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)
- MongoDB database (local or Atlas)

## Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd blog-app
```

### 2. Install dependencies
#### Backend
```bash
cd server
npm install
```
#### Frontend
```bash
cd ../client
npm install
```

### 3. Set up environment variables
Create a `.env` file in the `server` directory with the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Run the application
#### Start the backend server
```bash
cd server
npm start
```
The backend will run on [http://localhost:5000](http://localhost:5000).

#### Start the frontend React app
```bash
cd ../client
npm start
```
The frontend will run on [http://localhost:3000](http://localhost:3000).

## API Endpoints
### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and get a token

### Blogs
- `GET /api/blogs` - Get all blogs with pagination
- `GET /api/blogs/:id` - Get a single blog by ID
- `POST /api/blogs` - Create a new blog (requires authentication)
- `PUT /api/blogs/:id` - Update a blog (requires authentication and ownership)
- `DELETE /api/blogs/:id` - Delete a blog (requires authentication and ownership)

### Users
- `GET /api/users/me` - Get the current logged-in user's details




