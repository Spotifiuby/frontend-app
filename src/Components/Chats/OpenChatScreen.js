import { useContext, useEffect, useState, } from 'react';
import AuthSystemInterface from '../../SpotifiubySystem/AuthSystem/AuthSystemInterface';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import { StyleSheet, TextInput, View } from 'react-native';
import {
  crossCentered,
  headerTitle,
  oneUnitFlex,
  paddedContainer,
  textColor,
  textField
} from '../../theme';
import Title from '../Text/Title';
import ChatsSystemInterface from './ChatsSystemInterface';
import { Text } from 'react-native-web';
import CTAButton from '../Buttons/CTAButton';

const OpenChatScreen = ({navigation, route}) => {
  const system = useContext(SystemContext);
  const { c } = route.params;
  const [chat, setChat] = useState(c);
  const [authInfo, setAuthInfo] = useState({});
  const [message, setMessage] = useState('');

  const authSystem = system.systemImplementing(AuthSystemInterface);
  const chatsSystem = system.systemImplementing(ChatsSystemInterface);

  useEffect(() => {
    authSystem.getAuthInfo()
      .then(setAuthInfo);
  }, []);

  useEffect(() => {
    chatsSystem.getChatById(c.id)
      .then(setChat);
  }, []);

  function sendMessage() {
    chatsSystem.sendChatMessage(chat.id, message)
      .then(() => {
        setMessage('');
      })
      .then(() => {
        chatsSystem.getChatById(c.id)
          .then(setChat);
      }).catch(console.error('Error sending message'));
  }

  // TODO Add scroll
  // TODO Test multi line text
  // TODO: Hide and show SEND button
  return (
    <>
      <View style={styles.container}>
        <Title text={chatsSystem.getChatName(chat, authInfo.email)}/>
        <View style={styles.textContainer}>
          {
            chat.messages.map((message, i) => {
              return (
                <Text key={i} style={chatsSystem.isOwnMessage(message, authInfo.email)? styles.textSent : styles.textReceived}>{message.text}</Text>
              );
            })
          }
          <TextInput
            style={styles.chatInput}
            value={message}
            onChangeText={setMessage}
            multiline={true}
            placeholder="Type your message..."
          />
          <CTAButton style={styles.chatSend} title="Send" onPress={sendMessage}/>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...oneUnitFlex,
    alignItems: 'flex-start',
    paddingHorizontal: 15,
  },
  textContainer: {
    ...oneUnitFlex,
    alignItems: 'flex-start',
    width: '100%',
    backgroundColor: '#242121',
  },
  textReceived: {
    ...textField,
    marginLeft: '1%',
    alignSelf: 'flex-start',
    marginBottom: '1%',
  },
  textSent: {
    ...textField,
    marginRight: '1%',
    alignSelf: 'flex-end',
    marginBottom: '1%',
  },
  chatInput: {
    ...textColor,
    ...paddedContainer,
    backgroundColor: '#333',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  chatSend: {
    ...textColor,
    ...paddedContainer,
    backgroundColor: '#333',
    position: 'absolute',
    bottom: 0,
    left: '80%',
    width: '20%',
    borderRadius: 0,
  },
});

export default OpenChatScreen;
