"use client";

import { Card } from "@/components/ui/card";
import LoginContent from "./LoginContent";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/register");
  };

  return (
    <div className="flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md">
        <LoginContent onPressSignUp={handleSignUp} />
      </Card>
    </div>
  );
}
