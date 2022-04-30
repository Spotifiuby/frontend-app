// import { StyleSheet, Image } from 'react-native';
// import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';
// import LoginForm from './LoginForm';
// import logo from '../../assets/logo.png';

// const Login = ({ setToken }) => {
//   const { t } = useTranslation();

//   return (
//     <>
//       <Image
//         style={styles.logo}
//         source={logo}
//         accessibilityLabel={t('Spotifiuby logo image')}
//       />
//       <LoginForm setToken={setToken} />
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   logo: {
//     height: 200,
//     marginTop: '25%',
//     width: 200,
//   },
// });

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };

// export default Login;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Login;
