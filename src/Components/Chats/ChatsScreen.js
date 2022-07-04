import { useContext, useEffect, useState, } from 'react';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import AuthSystemInterface from '../../SpotifiubySystem/AuthSystem/AuthSystemInterface';
import Title from '../Text/Title';
import ChatsSystemInterface from './ChatsSystemInterface';
import { Dimensions, Pressable, StyleSheet, Text, ScrollView, View } from 'react-native';
import theme, {
  crossCentered,
  headerTitle,
  oneUnitFlex,
  paddedContainer,
  textColor
} from '../../theme';
import { Entypo} from '@expo/vector-icons';
import { NEW_CHAT, OPEN_CHAT } from './ChatsNavigationOptions';
import CTAButton from '../Buttons/CTAButton';
import { useFocusEffect } from '@react-navigation/native';

const ChatsScreen = ({navigation, _}) => {
  const system = useContext(SystemContext);
  const authSystem = system.systemImplementing(AuthSystemInterface);
  const chatsSystem = system.systemImplementing(ChatsSystemInterface);
  const [chats, setChats] = useState([]);
  const [authInfo, setAuthInfo] = useState({});

  useEffect(() => {
    authSystem.getAuthInfo()
      .then(setAuthInfo);
  }, []);

  useEffect(() => {
    chatsSystem.getChats(authInfo.email)
      .then(setChats);
  }, []);

  useFocusEffect(() => {
    chatsSystem.getChats(authInfo.email)
      .then((c) => {
        if (JSON.stringify(c) !== JSON.stringify(chats)) {
          setChats(c);
        }
      });
  });

  return (
    <>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ alignItems: 'flex-start' }}>
        <Title text="Chats"/>
        {(chats.length > 0) ? (
          chats.map((chat) => {
            return (
              <Pressable key={chat.id} style={styles.chatInfoContainer}
                         onPress={() => navigation.navigate(OPEN_CHAT, { c: chat })}>
                <Entypo name="chat" size={30} color={theme.color.secondaryText}/>
                <Text style={styles.text} numberOfLines={1}
                      ellipsisMode="clip">{chatsSystem.getChatName(chat, authInfo.email)}</Text>
              </Pressable>
            );
          })
        ) : null}
      </ScrollView>
      <View style={styles.container}>
        <CTAButton style={styles.newChatButton} title="New Chat" onPress={() => navigation.navigate(NEW_CHAT, {})}/>
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
  scrollContainer: {
    ...oneUnitFlex,
    // alignItems: 'flex-start',
    paddingHorizontal: 15,
  },
  text: {
    ...textColor,
    fontWeight: 'bold',
    width: Dimensions.get('window').width - 130,
    marginLeft: 10,
  },
  sectionTitle: {
    ...headerTitle,
    marginBottom: 10,
    marginTop: 5,
  },
  chatInfoContainer: {
    ...crossCentered,
    flexDirection: 'row',
    marginVertical: 11,
  },
  newChatButton: {
    ...textColor,
    ...paddedContainer,
    backgroundColor: '#333',
    position: 'absolute',
    bottom: 0,
    marginBottom: 10,
  },
});

export default ChatsScreen;
