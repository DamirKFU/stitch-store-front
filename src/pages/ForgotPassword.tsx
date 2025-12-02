import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { handleApiResponse, handleHttpError } from '@/utils/error-handler';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await authService.forgotPassword({ email });
      
      if (response.success) {
        navigate('/password-reset-sent');
      } else {
        const fieldErrors = handleApiResponse(response);
        if (fieldErrors) {
          setErrors(fieldErrors);
        }
      }
    } catch (error) {
      handleHttpError(error, 'Ошибка при отправке запроса');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-accent/20 px-4">
      <div className="w-full max-w-md">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-elegant border border-border/50 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Восстановление пароля
            </h1>
            <p className="text-muted-foreground">
              Введите ваш email и мы отправим вам ссылку для сброса пароля
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
              />
              {errors.email && (
                <Alert variant="destructive" className="mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.email}</AlertDescription>
                </Alert>
              )}
            </div>

            <Button type="submit" className="w-full">
              Отправить ссылку
            </Button>

            <button
              type="button"
              onClick={() => navigate('/auth')}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Вернуться к входу
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
