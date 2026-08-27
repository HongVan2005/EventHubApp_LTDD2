// src/screens/MessageScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MessageScreen({ navigation }) {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Chào bạn! Bạn có tham gia sự kiện Music Concert không?', sender: 'other', time: '10:00 AM' },
    { id: '2', text: 'Có chứ, mình đã mua vé rồi nè!', sender: 'me', time: '10:02 AM' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#120D26" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Organizer Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={[styles.bubble, item.sender === 'me' ? styles.myBubble : styles.otherBubble]}>
              <Text style={[styles.msgText, item.sender === 'me' ? styles.myMsgText : styles.otherMsgText]}>{item.text}</Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          )}
        />

        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tin nhắn..."
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
            <Ionicons name="send" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F5FC' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFFFFF' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#120D26' },
  bubble: { maxWidth: '80%', padding: 12, borderRadius: 16, marginBottom: 10 },
  myBubble: { alignSelf: 'flex-end', backgroundColor: '#5669FF', borderBottomRightRadius: 2 },
  otherBubble: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF', borderBottomLeftRadius: 2 },
  msgText: { fontSize: 14, lineHeight: 20 },
  myMsgText: { color: '#FFFFFF' },
  otherMsgText: { color: '#120D26' },
  timeText: { fontSize: 10, color: '#9D98AC', marginTop: 4, alignSelf: 'flex-end' },
  inputBar: { flexDirection: 'row', padding: 12, backgroundColor: '#FFFFFF', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#F4F5FC', borderRadius: 24, paddingHorizontal: 16, height: 44, color: '#120D26' },
  sendBtn: { backgroundColor: '#5669FF', width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
});