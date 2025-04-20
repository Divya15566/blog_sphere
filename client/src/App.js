import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import BlogScreen from './screens/BlogScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CreateBlogScreen from './screens/CreateBlogScreen';
import UserBlogsScreen from './screens/UserBlogsScreen';
import EditBlogScreen from './screens/EditBlogScreen';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/blog/:id" element={<BlogScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/create" element={<CreateBlogScreen />} />
            <Route path="/myblogs" element={<UserBlogsScreen />} />
            <Route path="/edit/:id" element={<EditBlogScreen />} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;