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
    console.log('Getting chats');
    // return this.#connectionSystem().getJson([ROOT, RESOURCE]);
    return Promise.resolve([{
      'id': '62b2b64cd4d9f4dabbbe0467',
      'users': [
        'ndegiacomo@fi.uba.ar',
        'pepe-uploader@gmail.com'
      ],
      'messages': [
        {
          'sender': 'ndegiacomo@fi.uba.ar',
          'text': 'Hola Pepe!',
          'time': '2022-06-22T06:27:37.186000'
        }
      ],
      'date_created': '2022-06-22T06:27:24.050000'
    },
      {
        'id': '2345678dfghjkcvbndrtyu',
        'users': [
          'ndegiacomo@fi.uba.ar',
          'jrodriguez@fi.uba.ar'
        ],
        'messages': [
          {
            'sender': 'jrodriguez@fi.uba.ar',
            'text': 'Bobo respode',
            'time': '2022-06-10T11:27:37.186001'
          }
        ],
        'date_created': '2022-06-22T06:27:24.050000'
      }
    ]);
  }

  getChatName(chat, userId) {
    return chat.users.filter(user => user !== userId)[0];
  }
}
