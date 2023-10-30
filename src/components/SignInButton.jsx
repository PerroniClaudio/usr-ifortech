import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../lib/authConfig";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

function SignInButton() {
  const { instance } = useMsal();

  const { loginMicrosoft } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  const handleLogin = async () => {
    const response = await instance.loginPopup(loginRequest);

    const tokenResponse = await instance.acquireTokenSilent({
      ...loginRequest,
      account: response.account,
    });

    sessionStorage.setItem("accessToken", tokenResponse.accessToken);

    console.log("???");

    const formData = {
      name: tokenResponse.account.name,
      email: tokenResponse.account.username,
      token: tokenResponse.uniqueId,
      setErrors,
      setStatus,
    };

    loginMicrosoft(formData);
  };

  return (
    <button className="btn btn-primary" onClick={() => handleLogin("redirect")}>
      Accedi
    </button>
  );
}
export default SignInButton;
