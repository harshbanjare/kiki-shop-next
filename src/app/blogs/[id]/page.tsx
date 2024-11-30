"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  img: string;
  content: string;
  author: string;
  DateTime?: { _seconds: number; _nanoseconds: number };
}

const BlogPage: React.FC = () => {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchBlogAndRelated = async () => {
      try {
        const [blogResponse, relatedBlogsResponse] = await Promise.all([
          axios.get(`https://api-sac6b737pq-uc.a.run.app/blogs/${id}/get`),
          axios.get("https://api-sac6b737pq-uc.a.run.app/blogs/fetch?page=1"),
        ]);

        console.log(blogResponse.data);
        setBlog(blogResponse.data);
        setRelatedBlogs(
          relatedBlogsResponse.data
            .filter((relatedBlog: Blog) => relatedBlog.id !== id)
            .slice(0, 5)
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setLoading(false);
      }
    };

    fetchBlogAndRelated();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-12"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return <div className="container mx-auto px-4 py-8">Blog not found</div>;
  }

  const formattedDate = blog.DateTime
    ? new Date(blog.DateTime._seconds * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date unavailable";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <article className="lg:w-2/3">
          <img
            src={blog.img}
            alt={blog.title}
            className="w-full h-auto rounded-lg shadow-lg mb-8"
          />
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-600 mb-2">By {blog.author}</p>
          <p className="text-gray-500 mb-8">{formattedDate}</p>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </article>
        <aside className="lg:w-1/3">
          <h2 className="text-2xl font-bold mb-4">More Blogs</h2>
          <div className="space-y-4">
            {relatedBlogs.map((relatedBlog) => (
              <Link
                key={relatedBlog.id}
                href={`/blog/${relatedBlog.id}`}
                className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center">
                  <img
                    src={relatedBlog.img}
                    alt={relatedBlog.title}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {relatedBlog.DateTime
                        ? new Date(
                            relatedBlog.DateTime._seconds * 1000
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Date unavailable"}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPage;
