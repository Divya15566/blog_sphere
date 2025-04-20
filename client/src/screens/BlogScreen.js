import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const BlogScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`/api/blogs/${id}`);
        setBlog(data);
        
        const token = localStorage.getItem('token');
        if (token) {
          const config = { headers: { 'x-auth-token': token } };
          const { data: userData } = await axios.get('/api/users/me', config);
          setUserInfo(userData);
        }
      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching blog');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      setIsDeleting(true);
      const token = localStorage.getItem('token');
      await axios.delete(`/api/blogs/${id}`, {
        headers: { 'x-auth-token': token }
      });
      navigate('/');
    } catch (err) {
      setError('Failed to delete post. Please try again.');
    } finally {
      setIsDeleting(false);
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to posts
        </button>
        
        <article className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium mr-4">
                {blog.author.email.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900">{blog.author.email}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>
            
            <div className="prose max-w-none text-gray-700 mb-8">
              {blog.content.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
            
            {userInfo && userInfo._id === blog.author._id && (
              <div className="flex space-x-4 border-t pt-6">
                <Link
                  to={`/edit/${blog._id}`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  Edit Post
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faTrash} className="mr-2" />
                      Delete Post
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogScreen;