import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  Pressable,
  SafeAreaView
} from 'react-native';
import {
  useContext, useCallback, useState, useEffect, useRef,
} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  crossCentered,
  headerTitle,
  mainCentered,
  oneUnitFlex,
  secondaryText,
  textColor
} from '../../theme';
import SystemContext from '../../SpotifiubySystem/DefaultSystemContext';
import SongsSystemInterface from '../../SpotifiubySystem/SongsSystem/SongsSystemInterface';
import SongReproductionList from '../../SpotifiubySystem/SongsSystem/SongReproductionList';
import SongsList from '../Songs/SongsList';
import Title from '../Text/Title';
import { ALBUM_PROFILE } from '../Uploader/UploadNavigationOptions';
import CoverPicture from '../Songs/CoverPicture';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import AuthSystemInterface from '../../SpotifiubySystem/AuthSystem/AuthSystemInterface';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Home = ({navigation, _}) => {
  const system = useContext(SystemContext);
  const songsSystem = system.systemImplementing(SongsSystemInterface);
  const authSystem = system.systemImplementing(AuthSystemInterface);
  const [songsList, setSongsList] = useState(new SongReproductionList([]));
  const [albums, setAlbums] = useState([]);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      authSystem.getAuthInfo().then((info) => {
        console.log("AUTH-TOKEN", info, token);

        fetch(`https://spotifiuby-backend-users.herokuapp.com/users/${info.email}/token/${token}`, {
          method: 'POST',
          headers: {
            'x-api-key': 'd8f0b1e2-8fc6-4fe6-85a5-a08f8f70882e'
          }
        })//.then(sendPushNotification(token));
      })
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  useEffect(() => {
    songsSystem.initialize();
    setSongsList(new SongReproductionList([]));
    setAlbums([]);
  }, []);

  useFocusEffect( () => {
    songsSystem.getSongs().then((songs) => {
      setSongsList(new SongReproductionList(songs.slice(5, songs.length)));
    });
    }
  );

  useFocusEffect(() => {
      songsSystem.getAlbums().then((albums) => {
        setAlbums(albums.slice(0, 5));
      });
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <Title text="My favorite songs" />
      {(songsList.songs.length !== 0)
        ? <SongsList songsList={songsList} />
        : null}
      <Title text="My favorite albums" />
      {(albums.length > 0)
        ? (
          <>
            <View style={styles.resultsContainer}>
              <FlatList
                data={albums}
                renderItem={({ item, index }) => {
                  const { name, id } = item;
                  const artists = item.artists.join(', ');
                  return (
                    <Pressable key={id} style={styles.albumPressable} onPress={() => {
                      navigation.navigate(ALBUM_PROFILE, { album:item });
                    }}>
                      <View style={styles.albumImage}>
                        <CoverPicture album={item}/>
                      </View>
                      <View style={styles.albumInfo}>
                        <Text style={styles.albumName}>{name}</Text>
                        <Text style={styles.albumArtistName}>{artists}</Text>
                      </View>
                    </Pressable>
                  );
                }}
                keyExtractor={(artist) => artist.id}
              />
            </View>
          </>
        )
        : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...oneUnitFlex,
    paddingHorizontal: 15,
  },
  albumImage: {
    height: 60,
    width: 60,
  },
  albumPressable: {
    ...crossCentered,
    flexDirection: 'row',
    marginVertical: 11,
  },
  albumInfo: {
    flexDirection: 'column',
  },
  albumName: {
    ...textColor,
    ...mainCentered,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  albumArtistName: {
    ...secondaryText,
    marginLeft: 15
  },
  resultsContainer: {
    //...oneUnitFlex,
    // justifyContent: 'flex',
  },
  sectionTitle: {
    ...headerTitle,
    marginBottom: 5,
    marginTop: 10,
  },
});

export default Home;

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  console.log("SENDINIG NOT")
  const message = {
    to: "ExponentPushToken[ysoymLLcEU2ZMCUAZXSWBh]",
    sound: 'default',
    title: 'MENSAJE',
    body: 'Te mandaron un mensaje',
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

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

