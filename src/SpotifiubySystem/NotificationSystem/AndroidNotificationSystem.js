// eslint-disable-next-line react-native/split-platform-components
import { ToastAndroid } from 'react-native';
import GenericSystem from '../GenericSystem';
import NotificationSystemInterface from './NotificationSystemInterface';

export default class AndroidNotificationSystem extends GenericSystem {
  implementing() {
    return NotificationSystemInterface;
  }

  show(aMessage) {
    ToastAndroid.show(aMessage, ToastAndroid.SHORT);
  }
}
