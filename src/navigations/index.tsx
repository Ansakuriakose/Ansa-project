import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackType } from './navigationType';
import LoginScreen from '@app/screens/LoginScreen/LoginScreen';
import DebtorDashboardScreen from '@app/screens/DebtorDashboardScreen';
import ChatThreadScreen from '@app/screens/ChatThreadScreen';
import PaymentPortalScreen from '@app/screens/PaymentPortalScreen';

type Props = {
  firstScreen?: string;
};

const Navigation = (props: Props) => {
  const { firstScreen } = props;
  const Stack: any = createNativeStackNavigator<RootStackType>();

  return (
    <Stack.Navigator
      initialRouteName={'DebtorDashboardScreen'}
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <Stack.Group>
        <Stack.Screen
          name={'DebtorDashboardScreen'}
          component={DebtorDashboardScreen}
        />
        <Stack.Screen name={'ChatThreadScreen'} component={ChatThreadScreen} />
        <Stack.Screen
          name={'PaymentPortalScreen'}
          component={PaymentPortalScreen}
        />
        <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
