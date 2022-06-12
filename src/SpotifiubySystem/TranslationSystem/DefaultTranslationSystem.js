import { useTranslation } from 'react-i18next';
import TranslationSystemInterface from './TranslationSystemInterface';
import i18next from './i18n/i18n';
import RNLanguageDetector from './i18n/RNLanguageDetector';
import GenericSystem from '../GenericSystem';

export default class DefaultTranslationSystem extends GenericSystem {
  implementing() {
    return TranslationSystemInterface;
  }

  initialize() {
    i18next.use(RNLanguageDetector);
  }

  stringTranslator() {
    return useTranslation();
  }
}
