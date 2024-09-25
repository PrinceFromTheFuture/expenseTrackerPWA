import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const CustomGoogleLogin = () => {
  const handleSuccess = (response) => {
    console.log(response); // Use the token to authenticate with your backend
  };

  const handleFailure = (error) => {
    console.error("Login failed:", error);
  };
  const clientId = "1030743176048-vdn6gcdqn68f994ktdb4jjb0cn46o74l.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleFailure}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{
              backgroundColor: "#4285F4",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "4px",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Sign in with Google
          </button>
        )}
      />
    </GoogleOAuthProvider>
  );
};

export default CustomGoogleLogin;
