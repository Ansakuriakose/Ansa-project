import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import ScreenWrapper from '@app/components/Layouts/ScreenWrapper';
import { COLORS, FONTS } from '@app/constants/theme';
import HeaderComponent from '@app/components/HeaderComponent/HeaderComponent';

const predefinedReplies = [
  {
    keyword: 'plan',
    reply:
      'We can offer you a new payment plan. Would you like to see options?',
  },
  {
    keyword: 'pay',
    reply:
      'You can pay the full amount or choose a payment plan in the payment portal.',
  },
  {
    keyword: 'hello',
    reply: 'Hello! How can we assist you with your debt today?',
  },
  {
    keyword: 'help',
    reply:
      'Our agent will reach out to you soon. Meanwhile, you can view payment options.',
  },
];

const getBotReply = message => {
  const lower = message.toLowerCase();
  for (let { keyword, reply } of predefinedReplies) {
    if (lower.includes(keyword)) return reply;
  }
  return "Thank you for your message. We'll get back to you soon.";
};

const initialMessages = [
  {
    id: '1',
    sender: 'agency',
    text: 'Welcome to Alpha Collections chat. How can we help you?',
  },
];

const ChatThreadScreen = ({ route }) => {
  const { agency } = route.params || {};
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTimeout(() => {
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'agency',
        text: getBotReply(userMsg.text),
      };
      setMessages(prev => [...prev, botMsg]);
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 700);
  };

  return (
    <ScreenWrapper>
      <HeaderComponent label={(agency || 'Agency') + ' Chat'} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={
                item.sender === 'user'
                  ? styles.userMsgContainer
                  : styles.agencyMsgContainer
              }
            >
              <Text
                style={
                  item.sender === 'user' ? styles.userMsg : styles.agencyMsg
                }
              >
                {item.text}
              </Text>
            </View>
          )}
          contentContainerStyle={styles.chatContainer}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type your message..."
            placeholderTextColor={COLORS.labelText}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: COLORS.primaryBorder,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    ...FONTS.medium,
    color: COLORS.black,
  },
  chatContainer: {
    flexGrow: 1,
    padding: 16,
  },
  userMsgContainer: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    marginBottom: 10,
    padding: 10,
    maxWidth: '80%',
  },
  agencyMsgContainer: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryBorder,
    borderRadius: 16,
    marginBottom: 10,
    padding: 10,
    maxWidth: '80%',
  },
  userMsg: {
    color: COLORS.white,
    fontSize: 15,
  },
  agencyMsg: {
    color: COLORS.black,
    fontSize: 15,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: COLORS.primaryBorder,
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.primaryBorder,
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 15,
    backgroundColor: COLORS.white,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  sendButtonText: {
    color: COLORS.white,
    fontSize: 15,
    ...FONTS.medium,
  },
});

export default ChatThreadScreen;
