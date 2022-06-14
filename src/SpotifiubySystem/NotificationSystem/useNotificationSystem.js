import { useContext } from 'react';
import SystemContext from '../DefaultSystemContext';
import NotificationSystemInterface from './NotificationSystemInterface';

const useNotificationSystem = () => {
  const system = useContext(SystemContext);
  return system.systemImplementing(NotificationSystemInterface);
};

export default useNotificationSystem;
