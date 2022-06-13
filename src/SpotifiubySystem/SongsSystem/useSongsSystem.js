import { useContext } from 'react';
import SystemContext from '../DefaultSystemContext';
import SongsSystemInterface from './SongsSystemInterface';

const useSongsSystem = () => {
  const system = useContext(SystemContext);
  return system.systemImplementing(SongsSystemInterface);
};

export default useSongsSystem;
