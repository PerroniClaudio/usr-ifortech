import { useState } from "react";
import SignInButton from "../components/SignInButton";

function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="card w-96 bg-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Accedi</h2>
          <p>L'accesso è ristretto agli utenti del tenant iFortech</p>
          <div className="card-actions justify-end">
            <SignInButton />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
