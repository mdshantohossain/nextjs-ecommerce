"use client";

import LoginContent from "@/app/(auth)/login/LoginContent";
import RegisterContent from "@/app/(auth)/register/RegisterContent";
import { useState } from "react";

export default function CheckoutAuthModal() {
  const [modalWhich, setModalWhich] = useState("login");

  const handlePressOnSignUpOrSignIn = () => {
    setModalWhich(modalWhich === "login" ? "register" : "login");
  };

  const handleLogin = () => {
    setModalWhich("login");
  };

  if (modalWhich === "login") {
    return (
      <LoginContent
        onPressSignUp={handlePressOnSignUpOrSignIn}
        fromModal={true}
      />
    );
  } else if (modalWhich === "register") {
    return (
      <RegisterContent
        onPressSignUp={handlePressOnSignUpOrSignIn}
        fromModal={true}
        handleLogin={handleLogin}
      />
    );
  }
}
