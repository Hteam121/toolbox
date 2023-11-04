// src/services/ChatService.js
import { getDatabase, ref, push, set, onChildAdded, remove } from "firebase/database";
import { app } from './Firebase.js';  // Adjust the import to reflect the exported app object

export function sendMessage(chatId, sender, text) {
  console.log('sendMessage called', chatId, sender, text);
  const db = getDatabase(app);
  const newMessageRef = push(ref(db, `chats/${chatId}`));
  set(newMessageRef, { sender, text });
}

export function listenForMessages(chatId, callback) {
  console.log('listenForMessages called', chatId);
  const db = getDatabase(app);
  const messagesRef = ref(db, `chats/${chatId}`);
  onChildAdded(messagesRef, snapshot => {
    console.log('New message received', snapshot.val());
    callback(snapshot.val());
  });
}

export function clearChat(chatId) {
  console.log('clearChat called', chatId);
  const db = getDatabase(app);
  const chatRef = ref(db, `chats/${chatId}`);
  remove(chatRef)
    .then(() => {
      console.log("Chat cleared successfully!");
    })
    .catch(error => {
      console.error("Error clearing chat: ", error);
    });
}
