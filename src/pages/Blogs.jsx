import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaRocket, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ExtremeBlogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState({});
  const navigation = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/blogs");
      console.log(response.data);
      setBlogs(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const backgrounds = [
    "https://source.unsplash.com/1600x900/?cyberpunk",
    "https://source.unsplash.com/1600x900/?futuristic",
    "https://source.unsplash.com/1600x900/?neon",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI",
      content:
        "Exploring the cutting-edge advancements in artificial intelligence and their potential impact on society.",
    },
    {
      id: 2,
      title: "Cybersecurity in 2024",
      content:
        "Unveiling the latest trends and threats in the ever-evolving landscape of digital security.",
    },
    {
      id: 3,
      title: "Web3 Revolution",
      content:
        "Diving deep into the decentralized web and how it's reshaping the internet as we know it.",
    },
  ];

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-[50px] dark:bg-gray-900 text-white dark:text-white overflow-hidden">
      {/* Dynamic Background */}
      <motion.div
        className="fixed inset-0 z-0"
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 1 }}
        key={currentBgIndex}
      >
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm"
          style={{ backgroundImage: `url(${backgrounds[currentBgIndex]})` }}
        />
        <div className="absolute inset-0 bg-black opacity-60 dark:bg-black dark:opacity-60" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-8">
          <AnimatePresence>
            {blogs?.map((post, index) => (
              <article
                onClick={() => navigation("/blog-detail", { state: post })}
                key={index}
                className="group cursor-pointer"
              >
                <img
                  alt=""
                  src={post?.image}
                  className="h-[350px] rounded-xl rounded-bl-none rounded-br-none object-cover shadow-xl transition group-hover:grayscale-[50%]"
                />
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg rounded-tl-none rounded-tr-none">
                  <a href="#">
                    <h3 className="text-lg font-medium text-black dark:text-white">
                      {post?.title}
                    </h3>
                  </a>
                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
                    {post?.description}
                  </p>
                </div>
              </article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ExtremeBlogs;
