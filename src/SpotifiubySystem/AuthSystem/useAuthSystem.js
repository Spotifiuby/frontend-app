import { useContext } from 'react';
import SystemContext from '../DefaultSystemContext';
import AuthSystemInterface from './AuthSystemInterface';

const useAuthSystem = () => {
  const system = useContext(SystemContext);
  return system.systemImplementing(AuthSystemInterface);
};

export default useAuthSystem;
