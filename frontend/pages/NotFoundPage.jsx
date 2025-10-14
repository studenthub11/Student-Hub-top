import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">الصفحة غير موجودة</h2>
        <p className="text-lg text-gray-600 mb-8">عذرًا، الصفحة التي تبحث عنها غير موجودة.</p>
        <Link to="/" className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300">
          العودة إلى الرئيسية
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

