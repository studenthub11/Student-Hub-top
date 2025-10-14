import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">The Student Hub</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-gray-300">الرئيسية</Link></li>
            <li><Link to="/dashboard" className="hover:text-gray-300">لوحة التحكم</Link></li>
            <li><Link to="/admin/dashboard" className="hover:text-gray-300">لوحة تحكم المسؤول</Link></li>
            <li><Link to="/client/dashboard" className="hover:text-gray-300">لوحة تحكم العميل</Link></li>
            <li><Link to="/login" className="hover:text-gray-300">تسجيل الدخول</Link></li>
            <li><Link to="/register" className="hover:text-gray-300">التسجيل</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

