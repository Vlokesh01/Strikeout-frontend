import React from "react";

function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3f434f] px-4">
      <div className="bg-[#d3e0fb] rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-purple-200">
        <h1 className="text-3xl font-bold text-red-500 mb-4 font-SourGummy">
          Login Required
        </h1>
        <p className="text-[#3f434f] mb-6 font-medium">
          You need to be logged in to access this page.
        </p>
        <a
          href="/login"
          className="inline-block px-6 py-3 bg-[#a18aff] text-white font-semibold rounded-full shadow-md hover:bg-[#8c75f0] transition"
        >
          Go to Login Page
        </a>
      </div>
    </div>
  );
}

export default ErrorPage;
