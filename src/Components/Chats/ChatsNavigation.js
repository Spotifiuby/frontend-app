import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../UserProfile/Profile';
import { OPEN_CHAT, MY_PROFILE, CHATS_SCREEN, NEW_CHAT } from './ChatsNavigationOptions';
import OpenChatScreen from './OpenChatScreen';
import ChatsScreen from './ChatsScreen';
import NewChatScreen from './NewChatScreen';

const Stack = createNativeStackNavigator();
const ChatsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={CHATS_SCREEN}>
      <Stack.Screen name={CHATS_SCREEN} component={ChatsScreen}/>
      <Stack.Screen name={OPEN_CHAT} component={OpenChatScreen}/>
      <Stack.Screen name={MY_PROFILE} component={Profile}/>
      <Stack.Screen name={NEW_CHAT} component={NewChatScreen}/>
    </Stack.Navigator>
  );
};

export default ChatsNavigation;
