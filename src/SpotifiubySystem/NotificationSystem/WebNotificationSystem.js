import GenericSystem from '../GenericSystem';
import NotificationSystemInterface from './NotificationSystemInterface';

export default class WebNotificationSystem extends GenericSystem {
  implementing() {
    return NotificationSystemInterface;
  }

  show(aMessage) {
    console.log(aMessage);
  }
}
