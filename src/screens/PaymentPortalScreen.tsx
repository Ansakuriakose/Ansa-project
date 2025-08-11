import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ScreenWrapper from '@app/components/Layouts/ScreenWrapper';
import { COLORS, FONTS } from '@app/constants/theme';
import HeaderComponent from '@app/components/HeaderComponent/HeaderComponent';

const mockPlans = [
  { id: 'plan1', label: '3 monthly payments', amount: 400 },
  { id: 'plan2', label: '6 monthly payments', amount: 210 },
];

const PaymentPortalScreen = ({ route }) => {
  const { agency, amount } = route.params || {};
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paid, setPaid] = useState(false);

  const handlePay = (full = false) => {
    setPaid(true);
    setTimeout(() => {
      Alert.alert(
        'Payment Successful',
        full ? 'Full amount paid!' : 'Payment plan selected!',
      );
    }, 500);
  };

  if (paid) {
    return (
      <ScreenWrapper>
        <HeaderComponent label="Payment Portal" />
        <View style={styles.centered}>
          <Text style={styles.success}>Thank you for your payment!</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <HeaderComponent label="Payment Portal" />
      <View style={styles.container}>
        <Text style={styles.agency}>{agency}</Text>
        <Text style={styles.amount}>Amount Due: ${amount?.toFixed(2)}</Text>
        <Text style={styles.section}>Choose a payment plan:</Text>
        {mockPlans.map(plan => (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.plan,
              selectedPlan === plan.id && styles.selectedPlan,
            ]}
            onPress={() => setSelectedPlan(plan.id)}
          >
            <Text style={styles.planText}>{plan.label}</Text>
            <Text style={styles.planText}>${plan.amount} / month</Text>
          </TouchableOpacity>
        ))}

        {!selectedPlan && <Text style={styles.error}>*Plan is required</Text>}
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => handlePay(false)}
          disabled={!selectedPlan}
        >
          <Text style={styles.payButtonText}>Pay with Plan</Text>
        </TouchableOpacity>
        <Text style={styles.section}>Or pay in full:</Text>
        <TouchableOpacity
          style={[styles.payButton, styles.fullPayButton]}
          onPress={() => handlePay(true)}
        >
          <Text style={styles.payButtonText}>Pay Full Amount</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.white,
  },
  header: {
    fontSize: 22,
    ...FONTS.medium,
    color: COLORS.primaryBorder,
    marginBottom: 10,
    textAlign: 'center',
  },
  agency: {
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 8,
    ...FONTS.regular,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 15,
    color: COLORS.red,
    textAlign: 'center',
    marginBottom: 18,
    ...FONTS.regular,
  },
  section: {
    fontSize: 16,
    color: COLORS.labelText,
    marginTop: 18,
    marginBottom: 8,
  },
  plan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    // backgroundColor: COLORS.primaryLight,
  },
  selectedPlan: {
    borderColor: COLORS.primaryBorder,
    backgroundColor: COLORS.gray,
  },
  planText: {
    fontSize: 15,
    color: COLORS.black,
  },
  payButton: {
    backgroundColor: COLORS.primaryBorder,
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  fullPayButton: {
    backgroundColor: COLORS.primaryBorder,
  },
  payButtonText: {
    color: COLORS.black,
    fontSize: 16,
    ...FONTS.medium,
    fontWeight: 500,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  success: {
    fontSize: 20,
    color: COLORS.primaryBorder,
    ...FONTS.medium,
  },
  error: {
    color: COLORS.red,
  },
});

export default PaymentPortalScreen;
