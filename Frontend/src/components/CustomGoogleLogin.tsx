import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const App = () => {
  const handleLoginSuccess = (credentialResponse: any) => {
    console.log("Login Success:", credentialResponse);
  };

  const handleLoginFailure = () => {
    console.error("Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId="1030743176048-vdn6gcdqn68f994ktdb4jjb0cn46o74l.apps.googleusercontent.com">
      <div>
        <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
