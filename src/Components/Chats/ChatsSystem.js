import SongsSystemInterface from '../../SpotifiubySystem/SongsSystem/SongsSystemInterface';
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

  getChats() {
    console.log("Getting chats")
    return this.#connectionSystem().getJson([ROOT, RESOURCE]);
  }
}
