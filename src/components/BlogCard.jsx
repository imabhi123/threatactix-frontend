import React from 'react'

const BlogCard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-300">
      <div className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">Blog Title Here</h1>
          <p className="text-gray-900 dark:text-gray-400">Published on April 4, 2023</p>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row">
          <div className="w-full md:w-3/4 px-4">
            <img
              src="https://images.unsplash.com/photo-1506157786151-b8491531f063"
              alt="Blog Featured Image"
              className="mb-8 rounded-lg"
            />
            <div className="prose prose-dark max-w-none">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                facilisi. Sed sit amet feugiat eros, eget eleifend dolor. Proin
                maximus bibendum felis, id fermentum odio vestibulum id. Sed ac
                ligula eget dolor consequat tincidunt. Nullam fringilla ipsum et
                ex lacinia, at bibendum elit posuere. Aliquam eget leo nec nibh
                mollis consectetur.
              </p>
              <p>
                Suspendisse potenti. Mauris euismod, magna sit amet aliquam
                dapibus, ex sapien porta nisl, vel auctor orci velit in risus.
                Fusce gravida bibendum dui, id volutpat felis dignissim a. Duis
                sagittis, arcu ac convallis bibendum, neque dolor suscipit
                dolor, non malesuada magna orci a mauris. Proin sollicitudin
                diam eu enim tincidunt dapibus. Aliquam pharetra purus mauris,
                id lacinia mi malesuada ut. Integer dignissim, urna nec
                scelerisque feugiat, lacus sapien tincidunt sem, sed luctus enim
                libero vel nunc.
              </p>
              <p>
                Nulla facilisi. Sed venenatis pretium ante, sed tempor turpis
                sagittis ac. Pellentesque habitant morbi tristique senectus et
                netus et malesuada fames ac turpis egestas.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/4 px-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-bold text-black dark:text-white mb-4">Recent Posts</h2>
              <ul className="list-none">
                <li className="mb-2">
                  <a href="#" className="text-gray-900 dark:text-gray-400 hover:text-gray-200">
                    Blog Post 1
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-900 dark:text-gray-400 hover:text-gray-200">
                    Blog Post 2
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-900 dark:text-gray-400 hover:text-gray-200">
                    Blog Post 3
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-900 dark:text-gray-400 hover:text-gray-200">
                    Blog Post 4
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 mt-4 rounded-lg">
              <h2 className="text-xl font-bold text-black dark:text-white mb-4">Categories</h2>
              <ul className="list-none">
                <li className="mb-2">
                  <a href="#" className="text-gray-900 dark:text-gray-400 hover:text-gray-200">
                    Category 1
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-900 dark:text-gray-400 hover:text-gray-200">
                    Category 2
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-900 dark:text-gray-400 hover:text-gray-200">
                    Category 3
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-gray-900 dark:text-gray-400 hover:text-gray-200">
                    Category 4
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
