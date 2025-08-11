import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ScreenWrapper from '@app/components/Layouts/ScreenWrapper';
import { COLORS, FONTS } from '@app/constants/theme';
import HeaderComponent from '@app/components/HeaderComponent/HeaderComponent';

const mockDebts = [
  {
    agency: 'Alpha Collections',
    amount: 1200.5,
    dueDate: '2024-07-15',
    id: '1',
  },
  {
    agency: 'Beta Recovery',
    amount: 800.0,
    dueDate: '2024-08-01',
    id: '2',
  },
  {
    agency: 'Gamma Finance',
    amount: 450.75,
    dueDate: '2024-07-30',
    id: '3',
  },
];

const DebtorDashboardScreen = ({ navigation }: any) => {
  return (
    <ScreenWrapper>
      {/* <View style={styles.headerConatiner}> */}
      <Text style={styles.header}>Depts</Text>
      {/* </View> */}
      <View style={styles.container}>
        <FlatList
          data={mockDebts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.debtCard}>
              <Text style={styles.agency}>{item.agency}</Text>
              <Text style={styles.amount}>Owed: ${item.amount.toFixed(2)}</Text>
              <Text style={styles.dueDate}>Due: {item.dueDate}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate('ChatThreadScreen', {
                      agency: item.agency,
                    })
                  }
                >
                  <Text style={styles.buttonText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.payButton]}
                  onPress={() =>
                    navigation.navigate('PaymentPortalScreen', {
                      agency: item.agency,
                      amount: item.amount,
                    })
                  }
                >
                  <Text style={styles.buttonText}>Pay</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
  },
  header: {
    fontSize: 24,
    ...FONTS.medium,
    color: COLORS.black,
    marginBottom: 20,
    textAlign: 'center',
  },
  debtCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
  },
  agency: {
    fontSize: 18,
    ...FONTS.medium,
    color: COLORS.black,
  },
  amount: {
    fontSize: 16,
    color: COLORS.red,
    marginTop: 4,
  },
  dueDate: {
    fontSize: 14,
    color: COLORS.labelText,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 12,
  },
  button: {
    backgroundColor: COLORS.primaryBorder,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  payButton: {
    backgroundColor: COLORS.primaryBorder,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 15,
    ...FONTS.medium,
  },
});

export default DebtorDashboardScreen;
