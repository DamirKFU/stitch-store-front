import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';

const Catalog = () => {
  // Placeholder for future catalog functionality
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Каталог вышивки</h1>
            <p className="text-muted-foreground">
              Здесь будет представлен полный каталог наших изделий
            </p>
          </div>

          {/* Placeholder content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-warm transition-all duration-300">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <Package className="h-16 w-16 text-muted-foreground" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">Изделие {item}</h3>
                  <p className="text-sm text-muted-foreground mb-2">Категория</p>
                  <p className="text-lg font-bold text-primary">₽ 0,000</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" disabled>
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;
