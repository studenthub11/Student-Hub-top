import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { User, Settings, LogOut, BookOpen, Award } from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    // In a real app, you would decode the JWT token to get user info
    // For now, we'll use mock data
    setUser({
      username: 'مستخدم تجريبي',
      email: 'user@example.com',
      role: 'user'
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    navigate('/login');
  };

  const quickActions = [
    {
      title: 'طلب خدمة جديدة',
      description: 'اطلب خدمة أكاديمية من خبرائنا',
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      action: () => navigate('/services')
    },
    {
      title: 'طلباتي',
      description: 'تابع حالة طلباتك الحالية',
      icon: <Award className="w-8 h-8 text-green-600" />,
      action: () => navigate('/client/dashboard')
    },
    {
      title: 'الملف الشخصي',
      description: 'عرض وتعديل معلوماتك الشخصية',
      icon: <User className="w-8 h-8 text-purple-600" />,
      action: () => navigate('/profile')
    },
    {
      title: 'الإعدادات',
      description: 'إدارة إعدادات حسابك',
      icon: <Settings className="w-8 h-8 text-orange-600" />,
      action: () => navigate('/settings')
    }
  ];

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              مرحباً، {user.username}
            </h1>
            <p className="text-gray-600">نتمنى لك يوماً مثمراً</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>

        {/* User Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>معلومات الحساب</CardTitle>
            <CardDescription>بيانات حسابك الشخصية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">اسم المستخدم</p>
                <p className="font-medium">{user.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">البريد الإلكتروني</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">نوع الحساب</p>
                <p className="font-medium">{user.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">حالة الحساب</p>
                <p className="font-medium text-green-600">نشط</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">الإجراءات السريعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={action.action}
              >
                <CardHeader>
                  <div className="mb-4">{action.icon}</div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{action.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>النشاط الأخير</CardTitle>
            <CardDescription>آخر الأنشطة على حسابك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <p>لا توجد أنشطة حديثة</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;

