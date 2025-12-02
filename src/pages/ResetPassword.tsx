import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { handleApiResponse, handleHttpError } from '@/utils/error-handler';
import { toast } from '@/hooks/use-toast';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (!tokenFromUrl) {
      toast({
        title: 'Ошибка',
        description: 'Отсутствует токен для сброса пароля',
        variant: 'destructive',
      });
      navigate('/auth');
    } else {
      setToken(tokenFromUrl);
    }
  }, [searchParams, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (password !== confirmPassword) {
      setErrors({ confirm_password: 'Пароли не совпадают' });
      return;
    }

    try {
      const response = await authService.resetPassword({ 
        token, 
        password,
        repeat_password: confirmPassword 
      });
      
      if (response.success) {
        toast({
          title: 'Успешно',
          description: 'Пароль успешно изменен. Войдите с новым паролем.',
        });
        navigate('/auth');
      } else {
        const fieldErrors = handleApiResponse(response);
        if (fieldErrors) {
          setErrors(fieldErrors);
        }
      }
    } catch (error) {
      handleHttpError(error, 'Ошибка при сбросе пароля');
      setTimeout(() => navigate('/auth'), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-accent/20 px-4">
      <div className="w-full max-w-md">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-elegant border border-border/50 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Новый пароль
            </h1>
            <p className="text-muted-foreground">
              Введите новый пароль для вашего аккаунта
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="password">Новый пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
              {errors.password && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.password}</AlertDescription>
                </Alert>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
              {errors.confirm_password && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.confirm_password}</AlertDescription>
                </Alert>
              )}
            </div>

            <Button type="submit" className="w-full">
              Сбросить пароль
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
