import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import ScreenWrapper from '@app/components/Layouts/ScreenWrapper';
import KeyboardAvoidWrapper from '@app/components/Layouts/KeyboardAvoidWrapper';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS } from '@app/constants/theme';
import { styles } from './styles';
import TextInputComponent from '@app/components/TextInputComponent/TextInputComponent';
import { AppLogo } from '@app/constants/static';
import { Formik } from 'formik';
import UserIcon from '@app/assets/icons/User.svg';
import LockIcon from '@app/assets/icons/Lock_alt.svg';
import EyeClosed from '@app/assets/icons/eye-off.svg';
import EyeOpen from '@app/assets/icons/eye.svg';
import loginHook from './loginHook';
import ButtonComponent from '@app/components/ButtonComponent/ButtonComponent';

const LoginScreen = () => {
  const {
    LoginSchema,
    handleLogin,
    showPassword,
    setShowPassword,
    loading,
    error,
  } = loginHook();
  return (
    <ScreenWrapper translucent>
      <KeyboardAvoidWrapper>
        <View style={styles.mainContainer}>
          <LinearGradient
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.3 }}
            colors={[COLORS.primary, COLORS.white]}
          >
            <View style={styles.imageTextView}>
              <Image source={AppLogo} style={styles.imgStyle} />
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.smallText}>
                Enter your username and password
              </Text>
            </View>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={handleLogin}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <View style={styles.formMainContainer}>
                  <View style={styles.formContainer}>
                    {/* Username */}
                    <Text style={styles.mainText}>Username</Text>
                    <View style={styles.inputWrapper}>
                      <UserIcon />
                      <TextInputComponent
                        placeholderText="Enter your username"
                        inputstyle={styles.input}
                        textStyle={{ display: 'none' }}
                        secureTextEntry={false}
                        value={values.username}
                        onChangeText={handleChange('username')}
                      />
                    </View>
                    {touched.username && errors.username && (
                      <Text style={styles.error}>{errors.username}</Text>
                    )}

                    <Text style={styles.mainText}>Password</Text>
                    <View style={styles.inputWrapper}>
                      <LockIcon />
                      <TextInputComponent
                        placeholderText="Enter your password"
                        inputstyle={styles.input}
                        textStyle={{ display: 'none' }}
                        secureTextEntry={!showPassword}
                        value={values.password}
                        onChangeText={handleChange('password')}
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOpen /> : <EyeClosed />}
                      </TouchableOpacity>
                    </View>
                    {touched.password && errors.password && (
                      <Text style={styles.error}>{errors.password}</Text>
                    )}
                  </View>
                  {error ? (
                    <Text style={[styles.error, { textAlign: 'center' }]}>
                      {error}
                    </Text>
                  ) : null}
                  <ButtonComponent
                    onPress={handleSubmit}
                    buttonStyle={styles.buttonStyle}
                    disabled={loading || isSubmitting}
                  >
                    {loading || isSubmitting ? (
                      <ActivityIndicator color={COLORS.white} />
                    ) : (
                      <Text style={styles.signInText}>Sign in</Text>
                    )}
                  </ButtonComponent>
                  <View style={styles.forgotContainer}>
                    <Text style={styles.ForgotText} onPress={() => {}}>
                      Forgot Password?
                    </Text>
                  </View>
                </View>
              )}
            </Formik>
          </LinearGradient>
        </View>
      </KeyboardAvoidWrapper>
    </ScreenWrapper>
  );
};

export default LoginScreen;
