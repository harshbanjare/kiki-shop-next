"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import { Blog } from "@/types/global_types";

const BlogSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col mb-8 break-inside-avoid">
    <div className="relative overflow-hidden pb-[56.25%]">
      <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
    </div>
    <div className="p-6 flex flex-col justify-between flex-grow">
      <div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-3 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
      </div>
      <div className="mt-6">
        <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
      </div>
    </div>
  </div>
);

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastBlogElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchBlogs = async (pageNum: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api-sac6b737pq-uc.a.run.app/blogs/fetch?page=${pageNum}`
      );

      // Add new blogs while preventing duplicates
      setBlogs((prevBlogs) => {
        const newBlogs = response.data;
        const uniqueBlogs = newBlogs.filter(
          (newBlog: Blog) =>
            !prevBlogs.some((prevBlog) => prevBlog.id === newBlog.id)
        );
        return [...prevBlogs, ...uniqueBlogs];
      });

      setHasMore(response.data.length > 0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  // Reset blogs when component mounts
  useEffect(() => {
    setBlogs([]);
    setPage(1);
    setHasMore(true);
  }, []);

  // Fetch blogs when page changes
  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Blogs</h1>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8">
        {blogs.map((blog, index) => (
          <div
            key={blog.id}
            ref={index === blogs.length - 1 ? lastBlogElementRef : null}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col mb-8 break-inside-avoid transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="relative overflow-hidden">
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800 line-clamp-2 hover:line-clamp-none transition-all duration-300">
                  {blog.title}
                </h2>
                <p className="text-gray-500 text-sm mb-3">
                  {blog.DateTime
                    ? new Date(
                        blog.DateTime._seconds * 1000
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Date unavailable"}
                </p>
                <div
                  className="text-gray-600 text-sm line-clamp-3 hover:line-clamp-none transition-all duration-300"
                  dangerouslySetInnerHTML={{ __html: blog.shortContent }}
                />
              </div>
              <div className="mt-6">
                <Link
                  href={`/blogs/${blog.id}`}
                  className="inline-block px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-300 border-2 border-black hover:border-gray-800 transform hover:-translate-y-1"
                >
                  Read more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading && (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <BlogSkeleton key={index} />
          ))}
        </div>
      )}
      {!hasMore && (
        <div className="text-center mt-8 text-gray-600">
          No more blogs to load
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
