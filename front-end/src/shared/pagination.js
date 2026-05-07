import React from "react";

export default function Pagination({
  postsPerPage,
  totalPosts,
  paginateFront,
  paginateBack,
  currentPage,
}) {
  return (
    <div className="py-2">
      {/* {console.log(totalPosts)} */}
      <div className="ml-2">
        <p className="text-sm text-gray-700">
          نمایش
          <span className="font-medium mx-1">
            {/* {currentPage * postsPerPage - 3} */}
            {currentPage * postsPerPage - 3 < totalPosts
              ? currentPage * postsPerPage - 3
              : totalPosts}
          </span>
          تا
          <span className="font-medium mx-1">
            {currentPage * postsPerPage < totalPosts
              ? currentPage * postsPerPage
              : totalPosts}
          </span>
          از
          <span className="font-medium"> {totalPosts} </span>
          نتیجه
        </p>
      </div>
      <nav className="block" />
      <div>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <a
            onClick={() => {
              paginateBack();
            }}
            href="#/admin"
            className={`relative inline-flex items-center px-6 py-2 caret-transparent 
            rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 
            ${
              currentPage * postsPerPage - 3 <= 1 &&
              "pointer-events-none bg-gray-200"
            }
            `}
          >
            <span>قبلی</span>
          </a>

          <a
            onClick={() => {
              paginateFront();
            }}
            href="#/admin"
            className={`relative inline-flex items-center px-6 py-2 caret-transparent rounded-r-md border
             border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50
             ${
               currentPage * postsPerPage + 3 >= totalPosts &&
               "pointer-events-none bg-gray-200"
             }
             `}
          >
            <span>بعدی</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
