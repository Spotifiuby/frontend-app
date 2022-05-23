import { SafeAreaView, StyleSheet } from 'react-native';
import AppContainer from './src/Components/AppContainer';
import { WithSystem } from './src/SpotifiubySystem/DefaultSystemContext';
import { oneUnitFlex } from './src/theme';

const App = () => {
  return (
    <SafeAreaView style={styles.main}>
      <WithSystem>
        <AppContainer />
      </WithSystem>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: oneUnitFlex,
});

export default App;
