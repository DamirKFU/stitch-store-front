import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/auth.service';
import { handleApiResponse, handleHttpError } from '@/utils/error-handler';
import { toast } from '@/hooks/use-toast';

const ConfirmRegistration = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const confirmRegistration = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        toast({
          title: 'Ошибка',
          description: 'Отсутствует токен подтверждения',
          variant: 'destructive',
        });
        setStatus('error');
        setTimeout(() => navigate('/auth'), 2000);
        return;
      }

      try {
        const response = await authService.confirmRegistration({ token });
        
        if (response.success) {
          setStatus('success');
          toast({
            title: 'Успешно',
            description: 'Email подтвержден! Теперь вы можете войти.',
          });
          setTimeout(() => navigate('/auth'), 3000);
        } else {
          setStatus('error');
          handleApiResponse(response);
          setTimeout(() => navigate('/auth'), 3000);
        }
      } catch (error) {
        setStatus('error');
        handleHttpError(error, 'Ошибка при подтверждении регистрации');
        setTimeout(() => navigate('/auth'), 3000);
      }
    };

    confirmRegistration();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-accent/20 px-4">
      <div className="w-full max-w-md">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-elegant border border-border/50 p-8 text-center">
          {status === 'loading' && (
            <>
              <div className="mb-6 flex justify-center">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Подтверждение регистрации...
              </h1>
              <p className="text-muted-foreground">
                Пожалуйста, подождите
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                  <div className="relative bg-primary/10 p-4 rounded-full">
                    <CheckCircle className="w-16 h-16 text-primary" />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Email подтвержден!
              </h1>
              <p className="text-muted-foreground mb-6">
                Ваш аккаунт успешно активирован. Вы будете перенаправлены на страницу входа...
              </p>
              <Button onClick={() => navigate('/auth')} className="w-full">
                Перейти к входу
              </Button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-destructive/20 rounded-full blur-xl"></div>
                  <div className="relative bg-destructive/10 p-4 rounded-full">
                    <XCircle className="w-16 h-16 text-destructive" />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Ошибка подтверждения
              </h1>
              <p className="text-muted-foreground mb-6">
                Не удалось подтвердить регистрацию. Вы будете перенаправлены на страницу входа...
              </p>
              <Button onClick={() => navigate('/auth')} variant="outline" className="w-full">
                Перейти к входу
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmRegistration;
