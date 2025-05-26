import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';

const mockMessages = [
  { id: '1', sender: 'admin', text: 'Hello! How can I help you today?' },
  { id: '2', sender: 'manager', text: 'Hi, I need to discuss plot value negotiation.' },
  { id: '3', sender: 'admin', text: 'Sure, please provide the plot details.' },
];

export default function ManagerChat() {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList<any>>(null);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now().toString(), sender: 'manager', text: input.trim() }]);
      setInput('');
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesContainer}
          renderItem={({ item }) => (
            <View style={[styles.messageRow, item.sender === 'manager' ? styles.managerRow : styles.adminRow]}>
              <View style={[styles.messageBubble, item.sender === 'manager' ? styles.managerBubble : styles.adminBubble]}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            </View>
          )}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  messagesContainer: {
    padding: 12,
    paddingBottom: 80,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  managerRow: {
    justifyContent: 'flex-end',
  },
  adminRow: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 16,
    minWidth: 60,
  },
  managerBubble: {
    backgroundColor: '#3366CC',
    borderTopRightRadius: 4,
  },
  adminBubble: {
    backgroundColor: '#E5E7EB',
    borderTopLeftRadius: 4,
  },
  messageText: {
    color: '#1F2937',
    fontSize: 15,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    marginRight: 8,
    color: '#1F2937',
    minWidth: 80,
  },
  sendButton: {
    backgroundColor: '#3366CC',
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingVertical: 10,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        // No web-unsupported properties
      },
      default: {},
    }),
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
}); 