import React from "react";
import { useLocation } from "react-router-dom";

const BlogCard = () => {
  const location = useLocation();
  console.log(location.state);
  function formatDate(isoString) {
    const date = new Date(isoString); // Convert the ISO string to a Date object

    // Get the components of the date
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options); // Format the date
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-300">
      <div className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto ">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
            {location.state.title}
          </h1>
          <p className="text-gray-900 dark:text-gray-400">
            Published on {formatDate(location.state?.createdAt)}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="overflow-auto md:w-[80%]">
          {location.state?.jsxcode && (
            <div
              className="overflow-auto"
              dangerouslySetInnerHTML={{
                __html: location.state?.jsxcode,
              }}
            />
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default BlogCard;
