import useSWR from "swr";
import axios from "../lib/axios";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const navigate = useNavigate();

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/user", () =>
    axios
      .get("/api/user")
      .then((res) => res.data)
      .catch((error) => {
        if (error.response.status !== 409) throw error;

        navigate("/verify-email");
      })
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const register = async ({ setErrors, ...props }) => {
    await csrf();

    setErrors([]);

    axios
      .post("/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const login = async ({ setErrors, setStatus, ...props }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/login", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const loginMicrosoft = async ({ setErrors, setStatus, ...props }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/login-microsoft", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    await csrf();

    setErrors([]);
    setStatus(null);

    axios
      .post("/reset-password", { token: router.query.token, ...props })
      .then((response) =>
        navigate("/login?reset=" + btoa(response.data.status))
      )
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resendEmailVerification = ({ setStatus }) => {
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout").then(() => mutate());
    }
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      navigate(redirectIfAuthenticated);
    } else if (
      window.location.pathname === "/verify-email" &&
      user?.email_verified_at
    ) {
      navigate(redirectIfAuthenticated);
    } else if (middleware === "auth" && error) {
      logout();
    }
  }, [user, error]);

  return {
    user,
    isLoading,
    register,
    login,
    loginMicrosoft,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
