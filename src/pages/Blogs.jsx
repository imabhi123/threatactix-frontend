import React, { useEffect, useState } from "react";
import { Tag } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogPostListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState({});
  const navigation = useNavigate();
  const [categories,setCategories]=useState([]);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/blogs");
      const response2 = await axios.get("http://localhost:5000/api/v1/blogs/get-top-ten-categories");
      setCategories(response2.data);
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

  const extractFirstImageSrc = (jsxString) => {
    const imgTagRegex = /<img\s+[^>]*src="([^"]+)"[^>]*>/i;
    const match = imgTagRegex.exec(jsxString);

    if (match && match[1]) {
      return match[1]; // Return the value of the `src` attribute
    }

    return null; // Return null if no image is found
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const blogPosts = [
    {
      id: 1,
      category: "FASHION",
      title: "Fashionable Man With Sunglasses",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
      isNew: true,
    },
    {
      id: 2,
      category: "SPORTS",
      title: "Cyclist Riding a Mountain",
      description:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever...",
      image:
        "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
      isNew: false,
    },
    {
      id: 3,
      category: "BUSINESS",
      title: "Young Businessman Rejoicing for His Success",
      description:
        "Lorem ipsum dolor has veniam elaboraret constituam, est nibh posidonium vel. Has id equidem constitam, malis abhorreant eam no, quid minim...",
      image:
        "https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75",
      isNew: false,
    },
  ];

  // const categories = [
  //   "Database",
  //   "Design",
  //   "Education",
  //   "Entertainment",
  //   "Health",
  //   "Travel",
  //   "Network",
  //   "Nature",
  //   "Sports",
  //   "Technology",
  //   "Tutorial",
  //   "Video",
  // ];

  function extractTextFromHTML(htmlString) {
    // Remove all HTML tags using regex
    const text = htmlString.replace(/<[^>]*>/g, '');
    return text.trim(); // Trim whitespace from the result
  }

  return (
    <div className="flex gap-8 p-6 pt-16 bg-gray-100 min-h-screen">
      {/* Main Content */}
      <div className="w-2/3">
        {blogs.map((post) => (
          <div
            key={post.id}
            className="mb-8 bg-white rounded-lg flex flex-wrap overflow-hidden shadow-md"
          >
            <div className="relative min-w-[300px] max-w-[300px]">
              <img
                src={extractFirstImageSrc(post?.jsxcode)}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-red-500 text-white px-3 py-1 text-sm font-semibold">
                  {post.category||'Category'}
                </span>
                {post.isNew && (
                  <span className="ml-2 bg-blue-500 text-white px-3 py-1 text-sm font-semibold">
                    New
                  </span>
                )}
              </div>
            </div>
            <div className="p-6 flex-1">
              <h2 className="text-xl font-bold mb-3">{post.title}</h2>
              <p className="text-gray-600 mb-4">{extractTextFromHTML(post?.jsxcode)?.substring(0,200)}...</p>
              <button onClick={() => navigation("/blog-detail", { state: post })} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                READ MORE
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div className="w-1/3">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-lg font-bold mb-4 border-b pb-2">CATEGORIES</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category,index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-gray-200 hover:bg-gray-300 transition-colors px-3 py-1 rounded text-sm cursor-pointer"
              >
                <Tag size={14} />
                {category?._id}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4 border-b pb-2">
            FOLLOW US ON FACEBOOK
          </h3>
          <div className="bg-gray-100 h-48 flex items-center justify-center">
            Facebook Plugin Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostListing;
