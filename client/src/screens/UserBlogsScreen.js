import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const UserBlogsScreen = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const config = { headers: { 'x-auth-token': token } };
        const { data } = await axios.get('/api/blogs', config);
        const userData = await axios.get('/api/users/me', config);
        const userBlogs = data.blogs.filter(blog => blog.author._id === userData.data._id);
        setBlogs(userBlogs);
      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, [navigate]);

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      setIsDeleting(blogId);
      const token = localStorage.getItem('token');
      await axios.delete(`/api/blogs/${blogId}`, {
        headers: { 'x-auth-token': token }
      });
      setBlogs(blogs.filter(blog => blog._id !== blogId));
    } catch (err) {
      setError('Failed to delete post. Please try again.');
    } finally {
      setIsDeleting(null);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
        {error}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Posts</h1>
            <p className="mt-2 text-gray-600">
              {blogs.length} {blogs.length === 1 ? 'post' : 'posts'} published
            </p>
          </div>
          <Link
            to="/create"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            New Post
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-500 mb-6">Start writing your first post to share with the community</p>
            <Link
              to="/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Create Post
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {blogs.map((blog) => (
                <li key={blog._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <Link to={`/blog/${blog._id}`} className="block">
                        <h3 className="text-lg font-medium text-gray-900 truncate">{blog.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Published on {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                      </Link>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex space-x-4">
                      <Link
                        to={`/edit/${blog._id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        disabled={isDeleting === blog._id}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                        title="Delete"
                      >
                        {isDeleting === blog._id ? (
                          <svg className="animate-spin h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <FontAwesomeIcon icon={faTrash} />
                        )}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBlogsScreen;