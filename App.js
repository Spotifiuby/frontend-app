// import { SafeAreaView, StyleSheet } from 'react-native';
// import AppContainer from './src/Components/AppContainer';
// import i18next from './src/i18n/i18n';
// import RNLanguageDetector from './src/i18n/RNLanguageDetector';
// import { oneUnitFlex, textColor } from './src/theme';

// const App = () => {
//   i18next.use(RNLanguageDetector);
//   return (
//     <SafeAreaView style={styles.main}>
//       <AppContainer />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   main: {
//     ...oneUnitFlex,
//     ...textColor,
//   },
// });

// export default App;
// import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./src/Components/Login";
import Register from "./src/Components/Register";
import Reset from "./src/Components/Reset";
import Dashboard from "./src/Components/Dashboard";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;