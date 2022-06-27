import { useContext, useEffect, useState } from 'react';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import UserSystemInterface from '../../SpotifiubySystem/UserSystem/UserSystemInterface';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import theme, {
  crossCentered,
  headerTitle,
  oneUnitFlex,
  secondaryText,
  textColor,
  textField
} from '../../theme';
import Title from '../Text/Title';
import { Entypo } from '@expo/vector-icons';
import AuthSystemInterface from '../../SpotifiubySystem/AuthSystem/AuthSystemInterface';
import ChatsSystemInterface from './ChatsSystemInterface';
import { CHATS_SCREEN } from './ChatsNavigationOptions';

const NewChatScreen = ({navigation, _}) => {
  const system = useContext(SystemContext);
  const userSystem = system.systemImplementing(UserSystemInterface);
  const authSystem = system.systemImplementing(AuthSystemInterface);
  const chatsSystem = system.systemImplementing(ChatsSystemInterface);

  const [authInfo, setAuthInfo] = useState({});
  const [query, setQuery] = useState('');
  const [queriedUsers, setQueriedUsers] = useState([]);

  useEffect(() => {
    authSystem.getAuthInfo()
      .then(setAuthInfo);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!query) {
        setQueriedUsers([]);
        return;
      }
      userSystem.getUsers(query).then(filterUsers)
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  function filterUsers(users) {
    chatsSystem.getChats().then((currentChats) => {
      let unique = [...new Map(users
        .filter((user) => (user.email !== authInfo.email) && (!currentChats.some(chat => chat.users.includes(user.email))))
        .map(item => [item['email'], item]))
        .values()];

      setQueriedUsers(unique);
    })
  }

  function createNewChat(user) {
    chatsSystem.createChat(user.email)
      .then(() => navigation.navigate(CHATS_SCREEN, {}))
  }

  return (
    <>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder={'Search'}
          accessibilityLabel={'Search input'}
        />
      </View>


      <ScrollView style={styles.container}>
        <Title text="Users"/>
        {(queriedUsers.length > 0) ? (
          queriedUsers.map((user) => {
            return (
              <Pressable key={user.id} style={styles.chatInfoContainer}
                         onPress={() => createNewChat(user)}>
                <Entypo name="chat" size={30} color={theme.color.secondaryText}/>
                <Text style={styles.text} numberOfLines={1} ellipsisMode="clip">{user.email}</Text>
              </Pressable>
            );
          })
        ) : null}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // ...oneUnitFlex,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  searchInput: {
    ...textField,
    marginBottom: 0,
  },
  text: {
    ...textColor,
    fontWeight: 'bold',
    width: Dimensions.get('window').width - 130,
    marginLeft: 10,
  },
  chatInfoContainer: {
    ...crossCentered,
    flexDirection: 'row',
    marginVertical: 11,
  },
});

export default NewChatScreen;
