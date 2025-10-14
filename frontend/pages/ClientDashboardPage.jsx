import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { FileText, Clock, CheckCircle, XCircle, MessageSquare, Upload } from 'lucide-react';

const ClientDashboardPage = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      title: 'مشروع بحث في علم الحاسوب',
      service: 'كتابة أبحاث',
      status: 'in_progress',
      progress: 65,
      expert: 'د. محمد أحمد',
      deadline: '2025-10-20',
      createdAt: '2025-10-01'
    },
    {
      id: 2,
      title: 'تصميم عرض تقديمي',
      service: 'تصميم',
      status: 'completed',
      progress: 100,
      expert: 'أ. سارة علي',
      deadline: '2025-10-10',
      createdAt: '2025-09-25'
    },
    {
      id: 3,
      title: 'مراجعة بحث التخرج',
      service: 'مراجعة وتدقيق',
      status: 'pending',
      progress: 0,
      expert: 'لم يتم التعيين',
      deadline: '2025-10-25',
      createdAt: '2025-10-14'
    }
  ]);

  const [stats, setStats] = useState({
    totalOrders: 3,
    inProgress: 1,
    completed: 1,
    pending: 1
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'قيد الانتظار', variant: 'secondary' },
      in_progress: { label: 'قيد التنفيذ', variant: 'default' },
      completed: { label: 'مكتمل', variant: 'success' },
      cancelled: { label: 'ملغي', variant: 'destructive' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'in_progress':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const statsCards = [
    {
      title: 'إجمالي الطلبات',
      value: stats.totalOrders,
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      color: 'bg-blue-50'
    },
    {
      title: 'قيد التنفيذ',
      value: stats.inProgress,
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      color: 'bg-orange-50'
    },
    {
      title: 'مكتملة',
      value: stats.completed,
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      color: 'bg-green-50'
    },
    {
      title: 'قيد الانتظار',
      value: stats.pending,
      icon: <Clock className="w-8 h-8 text-yellow-600" />,
      color: 'bg-yellow-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">لوحة تحكم العميل</h1>
          <p className="text-gray-600">تابع طلباتك وتواصل مع الخبراء</p>
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

        {/* Main Content */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">جميع الطلبات</TabsTrigger>
            <TabsTrigger value="in_progress">قيد التنفيذ</TabsTrigger>
            <TabsTrigger value="completed">مكتملة</TabsTrigger>
            <TabsTrigger value="pending">قيد الانتظار</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {getStatusIcon(order.status)}
                      <div>
                        <CardTitle className="text-xl mb-2">{order.title}</CardTitle>
                        <CardDescription className="flex flex-col gap-1">
                          <span>الخدمة: {order.service}</span>
                          <span>الخبير: {order.expert}</span>
                          <span>الموعد النهائي: {new Date(order.deadline).toLocaleDateString('ar-SA')}</span>
                        </CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.status === 'in_progress' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>التقدم</span>
                          <span>{order.progress}%</span>
                        </div>
                        <Progress value={order.progress} className="h-2" />
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 ml-2" />
                        التواصل مع الخبير
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 ml-2" />
                        رفع ملفات
                      </Button>
                      <Button variant="outline" size="sm">
                        عرض التفاصيل
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="in_progress" className="space-y-4">
            {orders.filter(o => o.status === 'in_progress').map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {getStatusIcon(order.status)}
                      <div>
                        <CardTitle className="text-xl mb-2">{order.title}</CardTitle>
                        <CardDescription className="flex flex-col gap-1">
                          <span>الخدمة: {order.service}</span>
                          <span>الخبير: {order.expert}</span>
                          <span>الموعد النهائي: {new Date(order.deadline).toLocaleDateString('ar-SA')}</span>
                        </CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>التقدم</span>
                        <span>{order.progress}%</span>
                      </div>
                      <Progress value={order.progress} className="h-2" />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 ml-2" />
                        التواصل مع الخبير
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 ml-2" />
                        رفع ملفات
                      </Button>
                      <Button variant="outline" size="sm">
                        عرض التفاصيل
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {orders.filter(o => o.status === 'completed').map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {getStatusIcon(order.status)}
                      <div>
                        <CardTitle className="text-xl mb-2">{order.title}</CardTitle>
                        <CardDescription className="flex flex-col gap-1">
                          <span>الخدمة: {order.service}</span>
                          <span>الخبير: {order.expert}</span>
                          <span>تم الإنجاز في: {new Date(order.deadline).toLocaleDateString('ar-SA')}</span>
                        </CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      تحميل الملفات
                    </Button>
                    <Button variant="outline" size="sm">
                      تقييم الخدمة
                    </Button>
                    <Button variant="outline" size="sm">
                      عرض التفاصيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {orders.filter(o => o.status === 'pending').map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      {getStatusIcon(order.status)}
                      <div>
                        <CardTitle className="text-xl mb-2">{order.title}</CardTitle>
                        <CardDescription className="flex flex-col gap-1">
                          <span>الخدمة: {order.service}</span>
                          <span>الخبير: {order.expert}</span>
                          <span>الموعد النهائي: {new Date(order.deadline).toLocaleDateString('ar-SA')}</span>
                        </CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      عرض التفاصيل
                    </Button>
                    <Button variant="destructive" size="sm">
                      إلغاء الطلب
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDashboardPage;

