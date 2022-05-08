import { StyleSheet, Image, View } from 'react-native';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.png';
import LoginForm from './LoginForm';
import CTAButton from './CTAButton';
import SecondaryButton from './SecondaryButton';

const Authentication = ({ setToken }) => {
  const { t } = useTranslation();
  const [isNewUser, setIsNewUser] = useState(true);
  return (
    <>
      <Image
        style={styles.logo}
        source={logo}
        accessibilityLabel={t('Spotifiuby logo image')}
      />
      <View style={styles.buttonsContainer}>
        <CTAButton
          style={styles.newUserButton}
          title={t('New Account')}
          onPress={() => console.log('new user')}
          upperCased={false}
        />
        <SecondaryButton title={t('Login')} onPress={() => console.log('new user')} />
      </View>
      {/* <LoginForm setToken={setToken} /> */}
    </>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    bottom: 0,
    marginBottom: '30px',
    position: 'absolute',
  },
  logo: {
    height: 200,
    marginTop: '25%',
    width: 200,
  },
  newUserButton: {
    paddingHorizontal: '30px',
  },
});

Authentication.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Authentication;
