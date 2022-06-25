import { useContext, useEffect, useState, } from 'react';
import AuthSystemInterface from '../../SpotifiubySystem/AuthSystem/AuthSystemInterface';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
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

const OpenChatScreen = ({navigation, route}) => {
  const system = useContext(SystemContext);
  const { c } = route.params;
  const [chat, setChat] = useState(c);
  const [authInfo, setAuthInfo] = useState({});

  const authSystem = system.systemImplementing(AuthSystemInterface);
  const chatsSystem = system.systemImplementing(ChatsSystemInterface);

  useEffect(() => {
    authSystem.getAuthInfo()
      .then(setAuthInfo);
  }, []);

  console.log(chat);

  // TODO Add scroll
  // TODO Add message break
  return (
    <>
      <View style={styles.container}>
        <Title text={chatsSystem.getChatName(chat, authInfo.email)}/>
        <View style={styles.textContainer}>
          <Text style={styles.textReceived}>Test Message</Text>
          <Text style={styles.textSent}>Test Response</Text>
          <TextInput
            style={styles.searchInput}
            //value={query}
            //onChangeText={setQuery}
            // multiline={true}
            placeholder='Type your message...'
            // accessibilityLabel={t('Search input')}
          />
        </View>
      </View>
    </>
  )
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
  text: {
    ...textColor,
    fontWeight: 'bold',
    width: Dimensions.get('window').width - 130,
    marginLeft: 10,
  },
  textReceived: {
    ...textField,
    marginLeft: '1%',
    alignSelf: 'flex-start',
  },
  textSent: {
    ...textField,
    marginRight: '1%',
    alignSelf: 'flex-end',
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
  searchInput: {
    ...textColor,
    ...paddedContainer,
    backgroundColor: '#333',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default OpenChatScreen;
