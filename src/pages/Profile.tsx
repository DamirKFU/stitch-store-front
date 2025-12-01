import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { User } from 'lucide-react';

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center py-20">
            <User className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Профиль</h1>
            <p className="text-muted-foreground">
              Функционал профиля будет реализован в будущем
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
