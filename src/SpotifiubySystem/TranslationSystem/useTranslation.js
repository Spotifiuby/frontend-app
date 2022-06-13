import { useContext } from 'react';
import SystemContext from '../DefaultSystemContext';
import TranslationSystemInterface from './TranslationSystemInterface';

const useTranslation = () => {
  const system = useContext(SystemContext);
  return system.systemImplementing(TranslationSystemInterface).stringTranslator();
};
export default useTranslation;
