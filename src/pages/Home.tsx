import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, ShieldCheck } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-soft overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Уникальная вышивка{' '}
                <span className="bg-gradient-warm bg-clip-text text-transparent">
                  ручной работы
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Откройте для себя коллекцию изысканной вышивки, созданной с любовью и вниманием к деталям
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate('/catalog')}
                  className="shadow-warm"
                >
                  Перейти в каталог
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/about')}
                >
                  Узнать больше
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl bg-card shadow-soft hover:shadow-warm transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ручная работа</h3>
                <p className="text-muted-foreground">
                  Каждое изделие создано вручную с особым вниманием к деталям
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-card shadow-soft hover:shadow-warm transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">С любовью</h3>
                <p className="text-muted-foreground">
                  Мы вкладываем душу в каждое изделие, чтобы оно радовало вас
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-card shadow-soft hover:shadow-warm transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Качество</h3>
                <p className="text-muted-foreground">
                  Используем только качественные материалы и проверенные техники
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-warm text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Готовы найти свою идеальную вышивку?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Просмотрите наш каталог и найдите то, что подарит радость
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/catalog')}
            >
              Смотреть каталог
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
