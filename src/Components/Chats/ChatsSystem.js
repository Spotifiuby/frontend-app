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

  connectionSystem() {
    return this.parent.systemImplementing(ConnectionSystemInterface);
  }

  createChat(otherUserId) {
    console.log('Creating chat', otherUserId);
    return this.connectionSystem().postJson([ROOT, RESOURCE], { 'user': otherUserId });
  }

  getChats() {
    console.log('Getting chats');
    return this.connectionSystem().getJson([ROOT, RESOURCE]);
  }

  getChatById(chatId) {
    console.log('Getting chat: ', chatId);
    return this.connectionSystem().getJson([ROOT, RESOURCE, chatId]);
  }

  async sendChatMessage(chatId, message, authInfo) {
    console.log('Sending chat message: ', message);
    const metadataResponse = await this.connectionSystem().putJson([ROOT, RESOURCE, chatId, 'message'], { 'message': message });
    const bodyResponse = await metadataResponse.json();
    return this.sendPushNotification(bodyResponse, authInfo);
  }

  getChatName(chat, userId) {
    return chat.users.filter(user => user !== userId)[0];
  }

  isOwnMessage(message, userId) {
    return message.sender === userId;
  }

  async sendPushNotification(response, authInfo) {
    let other = response.users.filter(email => email !== authInfo.email)[0];
    const r = await this.connectionSystem().getJson(["users-api", "users", other, 'token']);
    console.log("SENDING NOTIFICATION TO", other, r.token)

    const message = {
      to: r.token,
      sound: 'default',
      title: 'New Message',
      body: 'You have received a new message',
      data: { someData: 'goes here' },
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
}
