import React, { useState } from "react";

export const FaildMessage = () => {
  //default to display
  const [isVisible, setVisible] = useState(true);
  //after animation end to invoke this to make unvisible
  const HandleAnimationEnd = () => {
    setVisible(false);
  };
  return (
    <>
      {isVisible && (
        <div
          role="alert"
          className="alert alert-error fixed right-0 transition-transform duration-500 transform translate-x-0"
          onAnimationEnd={HandleAnimationEnd}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! Task failed successfully.</span>
        </div>
      )}
    </>
  );
};
