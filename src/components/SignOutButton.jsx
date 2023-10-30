import { useMsal } from "@azure/msal-react";

function SignOutButton() {
  const { instance } = useMsal();

  const handleLogout = (logoutType) => {
    if (logoutType === "popup") {
      instance.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/",
      });
    } else if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  };

  return (
    <button
      className="btn btn-primary"
      onClick={() => handleLogout("redirect")}>
      Logout
    </button>
  );
}
export default SignOutButton;
