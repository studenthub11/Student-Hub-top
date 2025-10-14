import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { BookOpen, Users, Award, TrendingUp, CheckCircle, Star } from 'lucide-react';

const HomePage = () => {
  const services = [
    {
      icon: <BookOpen className="w-12 h-12 text-blue-600" />,
      title: 'خدمات أكاديمية متنوعة',
      description: 'مساعدة في الأبحاث، المشاريع، والواجبات الدراسية من خبراء متخصصين'
    },
    {
      icon: <Users className="w-12 h-12 text-green-600" />,
      title: 'خبراء معتمدون',
      description: 'فريق من الخبراء المؤهلين في مختلف التخصصات الأكاديمية'
    },
    {
      icon: <Award className="w-12 h-12 text-purple-600" />,
      title: 'جودة مضمونة',
      description: 'نضمن لك جودة عالية في جميع الخدمات المقدمة'
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-orange-600" />,
      title: 'تتبع التقدم',
      description: 'تابع تقدم مشاريعك وطلباتك من خلال لوحة التحكم الخاصة بك'
    }
  ];

  const features = [
    'دعم على مدار الساعة',
    'أسعار تنافسية',
    'تسليم في الوقت المحدد',
    'سرية تامة',
    'مراجعات مجانية',
    'ضمان الاسترجاع'
  ];

  const testimonials = [
    {
      name: 'أحمد محمد',
      role: 'طالب هندسة',
      rating: 5,
      comment: 'خدمة ممتازة ساعدتني كثيراً في إنجاز مشروع التخرج'
    },
    {
      name: 'سارة علي',
      role: 'طالبة إدارة أعمال',
      rating: 5,
      comment: 'الخبراء محترفون والتسليم كان في الوقت المحدد'
    },
    {
      name: 'خالد عبدالله',
      role: 'طالب طب',
      rating: 5,
      comment: 'أفضل منصة للخدمات الأكاديمية، أنصح بها بشدة'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">مرحباً بك في The Student Hub</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            منصتك المتكاملة للخدمات الأكاديمية - نساعدك على تحقيق التميز الأكاديمي
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                ابدأ الآن
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white text-blue-600 hover:bg-gray-100">
                تسجيل الدخول
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">خدماتنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">لماذا تختارنا؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-md">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">آراء عملائنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{testimonial.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">هل أنت مستعد للبدء؟</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف الطلاب الذين حققوا التميز الأكاديمي معنا
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              سجل الآن مجاناً
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

