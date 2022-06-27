import GenericSystem from '../../SpotifiubySystem/GenericSystem';
import ConnectionSystemInterface
  from '../../SpotifiubySystem/ConnectionSystem/ConnectionSystemInterface';
import ChatsSystemInterface from './ChatsSystemInterface';

const ROOT = 'chats-api';
const RESOURCE = 'chats';

export default class ChatsSystem extends GenericSystem {
  implementing() {
    return ChatsSystemInterface;
  }

  #connectionSystem() {
    return this.parent.systemImplementing(ConnectionSystemInterface);
  }

  createChat(otherUserId) {
    console.log('Creating chat', otherUserId);
    return this.#connectionSystem().postJson([ROOT, RESOURCE], { 'user': otherUserId });
  }

  getChats() {
    console.log('Getting chats');
    return this.#connectionSystem().getJson([ROOT, RESOURCE]);
  }

  getChatById(chatId) {
    console.log('Getting chat: ', chatId);
    return this.#connectionSystem().getJson([ROOT, RESOURCE, chatId]);
  }

  sendChatMessage(chatId, message) {
    console.log('Sending chat message: ', message);
    return this.#connectionSystem().putJson([ROOT, RESOURCE, chatId, 'message'], { 'message': message });
  }

  getChatName(chat, userId) {
    return chat.users.filter(user => user !== userId)[0];
  }

  isOwnMessage(message, userId) {
    return message.sender === userId;
  }
}
