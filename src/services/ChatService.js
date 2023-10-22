// src/services/ChatService.js
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import { app } from './Firebase.js';  // Adjust the import to reflect the exported app object

export function sendMessage(chatId, sender, text) {
  const db = getDatabase(app);  // Adjust this line to use the app object
  const newMessageRef = push(ref(db, `chats/${chatId}`));
  set(newMessageRef, { sender, text });
}

export function listenForMessages(chatId, callback) {
  const db = getDatabase(app);  // Adjust this line to use the app object
  const messagesRef = ref(db, `chats/${chatId}`);
  onChildAdded(messagesRef, snapshot => {
    callback(snapshot.val());
  });
}
