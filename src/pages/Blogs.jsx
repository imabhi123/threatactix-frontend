import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaRocket, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ExtremeBlogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState({});
  const navigation = useNavigate();

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-white dark:text-white overflow-hidden">
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
            {[0, 0, 0, 0, 0, 0].map((post, index) => (
              <article onClick={() => navigation('/blog-detail')} key={index} className="group cursor-pointer">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="w-full rounded-xl object-cover shadow-xl transition group-hover:grayscale-[50%]"
                />

                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <a href="#">
                    <h3 className="text-lg font-medium text-black dark:text-white">
                      Finding the Journey to Mordor
                    </h3>
                  </a>

                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Recusandae dolores, possimus pariatur animi temporibus
                    nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                    quidem, mollitia itaque minus soluta, voluptates neque
                    explicabo tempora nisi culpa eius atque dignissimos.
                    Molestias explicabo corporis voluptatem?
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
