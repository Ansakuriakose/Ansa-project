import { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { navigate } from '@app/services/navigationService';

const MOCK_USERNAME = 'user';
const MOCK_PASSWORD = 'password123';

const loginHook = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters')
      .matches(
        /^[a-zA-Z0-9_]+$/,
        'Only letters, numbers, and underscores allowed',
      ),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required('Password is required'),
  });

  const handleLogin = async (values: any, { setSubmitting }: any) => {
    setError('');
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (
        values.username === MOCK_USERNAME &&
        values.password === MOCK_PASSWORD
      ) {
        navigate('HomeScreen', null);
      } else {
        setError('Invalid username or password');
      }
      setSubmitting(false);
    }, 1200);
  };

  return {
    LoginSchema,
    handleLogin,
    showPassword,
    setShowPassword,
    loading,
    error,
  };
};
export default loginHook;
