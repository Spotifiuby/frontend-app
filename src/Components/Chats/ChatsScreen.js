import { useContext, useEffect, useState, } from 'react';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import AuthSystemInterface from '../../SpotifiubySystem/AuthSystem/AuthSystemInterface';
import Title from '../Text/Title';
import ChatsSystemInterface from './ChatsSystemInterface';
import { ScrollView, Text } from 'react-native-web';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import theme, { crossCentered, headerTitle, oneUnitFlex, textColor } from '../../theme';
import SongsList from '../Songs/SongsList';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { OPEN_CHAT } from './ChatsNavigationOptions';

const ChatsScreen = ({navigation, route}) => {
  const system = useContext(SystemContext);
  const authSystem = system.systemImplementing(AuthSystemInterface);
  const chatsSystem = system.systemImplementing(ChatsSystemInterface);
  const [chats, setChats] = useState([]);
  const [authInfo, setAuthInfo] = useState({});

  useEffect(() => {
    authSystem.getAuthInfo()
      .then(setAuthInfo);
    chatsSystem.getChats(authInfo.email)
      .then(setChats);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Title text="Chats"/>
        <ScrollView>
          {(chats.length > 0) ? (
            chats.map((chat) => {
              return (
                <Pressable key={chat.id} style={styles.chatInfoContainer} onPress={() => navigation.navigate(OPEN_CHAT, { c:chat })}>
                  <Entypo name="chat" size={30} color={theme.color.secondaryText}/>
                  <Text style={styles.text} numberOfLines={1} ellipsisMode="clip">{chatsSystem.getChatName(chat, authInfo.email)}</Text>
                </Pressable>
              );
            })
          ) : null}
        </ScrollView>
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
});

export default ChatsScreen;
