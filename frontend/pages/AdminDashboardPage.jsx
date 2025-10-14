import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Users, FileText, Award, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLeads: 0,
    totalExperts: 0,
    totalRevenue: 0
  });
  
  const [users, setUsers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error('No access token found');
        return;
      }

      // Fetch users
      const usersResponse = await fetch('http://localhost:8000/users/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(usersData);
        setStats(prev => ({ ...prev, totalUsers: usersData.length }));
      }

      // You can add more API calls here for leads, experts, etc.
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'إجمالي المستخدمين',
      value: stats.totalUsers,
      icon: <Users className="w-8 h-8 text-blue-600" />,
      color: 'bg-blue-50'
    },
    {
      title: 'الطلبات الجديدة',
      value: stats.totalLeads,
      icon: <FileText className="w-8 h-8 text-green-600" />,
      color: 'bg-green-50'
    },
    {
      title: 'الخبراء النشطون',
      value: stats.totalExperts,
      icon: <Award className="w-8 h-8 text-purple-600" />,
      color: 'bg-purple-50'
    },
    {
      title: 'الإيرادات الشهرية',
      value: `${stats.totalRevenue} ريال`,
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      color: 'bg-orange-50'
    }
  ];

  const getRoleBadge = (role) => {
    const variants = {
      admin: 'destructive',
      expert: 'default',
      user: 'secondary'
    };
    return <Badge variant={variants[role] || 'secondary'}>{role}</Badge>;
  };

  const getStatusIcon = (isActive) => {
    return isActive ? (
      <CheckCircle className="w-5 h-5 text-green-600" />
    ) : (
      <XCircle className="w-5 h-5 text-red-600" />
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">لوحة تحكم المسؤول</h1>
          <p className="text-gray-600">إدارة شاملة لجميع جوانب المنصة</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <Card key={index} className={`${stat.color} border-none`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">المستخدمون</TabsTrigger>
            <TabsTrigger value="leads">الطلبات</TabsTrigger>
            <TabsTrigger value="experts">الخبراء</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>إدارة المستخدمين</CardTitle>
                <CardDescription>عرض وإدارة جميع مستخدمي المنصة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right p-4">المعرف</th>
                        <th className="text-right p-4">اسم المستخدم</th>
                        <th className="text-right p-4">البريد الإلكتروني</th>
                        <th className="text-right p-4">الدور</th>
                        <th className="text-right p-4">الحالة</th>
                        <th className="text-right p-4">تاريخ الإنشاء</th>
                        <th className="text-right p-4">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length > 0 ? (
                        users.map((user) => (
                          <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="p-4">{user.id}</td>
                            <td className="p-4 font-medium">{user.username}</td>
                            <td className="p-4">{user.email}</td>
                            <td className="p-4">{getRoleBadge(user.role)}</td>
                            <td className="p-4">{getStatusIcon(user.is_active)}</td>
                            <td className="p-4">{new Date(user.created_at).toLocaleDateString('ar-SA')}</td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">تعديل</Button>
                                <Button size="sm" variant="destructive">حذف</Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center p-8 text-gray-500">
                            لا توجد بيانات متاحة
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الطلبات</CardTitle>
                <CardDescription>عرض ومتابعة جميع الطلبات الواردة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>لا توجد طلبات حالياً</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experts Tab */}
          <TabsContent value="experts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الخبراء</CardTitle>
                <CardDescription>عرض وإدارة الخبراء المسجلين في المنصة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>لا يوجد خبراء مسجلون حالياً</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات النظام</CardTitle>
                <CardDescription>تكوين إعدادات المنصة العامة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">تفعيل التسجيل الجديد</h3>
                      <p className="text-sm text-gray-600">السماح للمستخدمين الجدد بالتسجيل</p>
                    </div>
                    <Button variant="outline">تفعيل</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">وضع الصيانة</h3>
                      <p className="text-sm text-gray-600">تعطيل الوصول للمستخدمين مؤقتاً</p>
                    </div>
                    <Button variant="outline">إيقاف</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">الإشعارات البريدية</h3>
                      <p className="text-sm text-gray-600">إرسال إشعارات تلقائية للمستخدمين</p>
                    </div>
                    <Button variant="outline">تفعيل</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

