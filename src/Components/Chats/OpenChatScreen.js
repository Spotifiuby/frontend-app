import { useContext, useEffect, useState, } from 'react';
import AuthSystemInterface from '../../SpotifiubySystem/AuthSystem/AuthSystemInterface';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import { ScrollView, StyleSheet, TextInput, View, Text } from 'react-native';
import {
  oneUnitFlex,
  paddedContainer,
  textColor,
  textField
} from '../../theme';
import Title from '../Text/Title';
import ChatsSystemInterface from './ChatsSystemInterface';
import CTAButton from '../Buttons/CTAButton';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const OpenChatScreen = ({_, route}) => {
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

  useFocusEffect(() => {
    chatsSystem.getChatById(c.id)
      .then((r) => {
        if (JSON.stringify(r) !== JSON.stringify(chat)) {
          setChat(r);
        }
      });
  });

  function sendMessage() {
    chatsSystem.sendChatMessage(chat.id, message)
      .then(() => {
        setMessage('');
      })
      .then(() => {
        chatsSystem.getChatById(c.id)
          .then(setChat);
      });
  }

  // TODO Add scroll
  // TODO Test multi line text
  // TODO: Hide and show SEND button
  return (
    <>
      <View style={styles.container}>
        <Title text={chatsSystem.getChatName(chat, authInfo.email)}/>
        <ScrollView style={styles.textContainer} contentContainerStyle={{ alignItems: 'flex-start' }}>
          {
            chat.messages.map((message, i) => {
              return (
                <Text key={i} style={chatsSystem.isOwnMessage(message, authInfo.email)? styles.textSent : styles.textReceived}>{message.text}</Text>
              );
            })
          }
        </ScrollView>
        <TextInput
          style={styles.chatInput}
          value={message}
          onChangeText={setMessage}
          multiline={true}
          placeholder="Type your message..."
        />
        <CTAButton style={styles.chatSend} title="Send" onPress={sendMessage}/>
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
    width: '100%',
    height: '50%',
    marginBottom: 35,
    backgroundColor: '#242121',
  },
  textReceived: {
    ...textField,
    marginLeft: '1%',
    alignSelf: 'flex-start',
    marginBottom: 2,
    marginTop: 2,
  },
  textSent: {
    ...textField,
    marginRight: '1%',
    alignSelf: 'flex-end',
    marginBottom: 2,
    marginTop: 2,
  },
  chatInput: {
    ...textColor,
    ...paddedContainer,
    backgroundColor: '#333',
    position: 'absolute',
    bottom: 0,
    width: '91%',
  },
  chatSend: {
    ...textColor,
    ...paddedContainer,
    backgroundColor: '#333',
    position: 'absolute',
    bottom: 0,
    left: '80%',
    width: '16%',
    borderRadius: 0,
  },
});

export default OpenChatScreen;
