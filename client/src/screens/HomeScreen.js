import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Col, Card, Button, Pagination } from 'react-bootstrap';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';

const HomeScreen = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/blogs?page=${page}`);
        setBlogs(data.blogs);
        setPages(data.totalPages);
        setTotal(data.totalBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Discover Amazing Content
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Read the latest posts from our community
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <div 
                  key={blog._id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                          {blog.author.email.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{blog.author.email}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <Link to={`/blog/${blog._id}`} className="block">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-indigo-600 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3">
                        {blog.content.substring(0, 200)}...
                      </p>
                    </Link>
                    
                    <div className="mt-6">
                      <Link
                        to={`/blog/${blog._id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {pages > 1 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  {[...Array(pages).keys()].map((x) => (
                    <button
                      key={x + 1}
                      onClick={() => setPage(x + 1)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium ${page === x + 1 
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-600' 
                        : 'border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                    >
                      {x + 1}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;