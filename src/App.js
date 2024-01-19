import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import './App.css';

function App() {
  return (
    <GoogleLogin
    onSuccess={credentialResponse => {
      const credentialResponseCoded = jwtDecode(credentialResponse.credential);
      console.log(credentialResponseCoded);
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  />
  );
}

export default App;
