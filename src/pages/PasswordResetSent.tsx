import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle } from 'lucide-react';

const PasswordResetSent = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-accent/20 px-4">
      <div className="w-full max-w-md">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-elegant border border-border/50 p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative bg-primary/10 p-4 rounded-full">
                <Mail className="w-16 h-16 text-primary" />
                <CheckCircle className="w-6 h-6 text-primary absolute -bottom-1 -right-1 bg-background rounded-full" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4">
            Письмо отправлено!
          </h1>
          
          <p className="text-muted-foreground mb-2">
            Мы отправили ссылку для сброса пароля на вашу почту.
          </p>
          
          <p className="text-sm text-muted-foreground mb-8">
            Пожалуйста, проверьте ваш почтовый ящик и перейдите по ссылке в письме.
          </p>

          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/auth')} 
              className="w-full"
            >
              Вернуться к входу
            </Button>
            
            <p className="text-xs text-muted-foreground">
              Не получили письмо? Проверьте папку "Спам"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetSent;
