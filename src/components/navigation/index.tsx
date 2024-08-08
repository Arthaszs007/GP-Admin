import Link from "next/link";
import React from "react";

const Navigation = () => {
  return (
    <div className="navbar bg-indigo-200">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          GP Management
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
