// ViewModel - Lógica de apresentação e estado para Login
import { useAuth } from '@/shared/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { LoginFormData, LoginModel } from './LoginModel';

export function useLoginViewModel() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<LoginFormData>({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const router = useRouter();

  const updateFormField = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '' });
  };

  const handleSubmit = async () => {
    const { name, email, password } = formData;

    // Validation
    const validationError = isLogin
      ? LoginModel.validateLoginForm(email, password)
      : LoginModel.validateRegisterForm(name, email, password);

    if (validationError) {
      Alert.alert('Error', validationError);
      return;
    }

    setLoading(true);
    try {
      let success = false;
      if (isLogin) {
        success = await login(email, password);
      } else {
        success = await register(name, email, password);
      }

      if (success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Error', 'Invalid credentials. Please try again.');
      }
    } catch {
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    isLogin,
    formData,
    loading,
    updateFormField,
    toggleMode,
    handleSubmit,
  };
}
