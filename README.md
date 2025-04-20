# BlogSphere

BlogSphere is a full-stack blogging platform featuring user authentication, blog creation, editing, and deletion, built with React for the frontend and Node.js/Express for the backend.

## Features
- User registration and login
- Create, edit, and delete blog posts
- View all blogs and user-specific posts
- Responsive design with Tailwind CSS and Bootstrap

## Technologies Used
- React
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- Tailwind CSS
- Bootstrap
- Axios

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm
- MongoDB database (local or Atlas)

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd blog_sphere
   ```
2. Install backend dependencies:
   ```sh
   cd server
   npm install
   ```
3. Install frontend dependencies:
   ```sh
   cd ../client
   npm install
   ```
4. Create a `.env` file in the `server` directory with the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

### Running Locally
- Start the backend:
  ```sh
  cd server
  npm start
  ```
- Start the frontend:
  ```sh
  cd ../client
  npm start
  ```

## Deployment
- Deploy the backend as a web service (e.g., Render, Heroku) and set environment variables.
- Deploy the frontend as a static site (e.g., Render, Vercel) and configure the API base URL to point to the backend service.
- Update CORS settings in the backend to allow requests from the frontend URL.



