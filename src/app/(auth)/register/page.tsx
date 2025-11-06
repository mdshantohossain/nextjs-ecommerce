"use client";

import { Card } from "@/components/ui/card";
import RegisterContent from "./RegisterContent";
import { useRouter } from "next/navigation";

export default function RegistrationPage() {
  const router = useRouter();

  const handlePressOnSignUp = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 py-10">
      <Card className="w-full max-w-md">
        <RegisterContent onPressSignUp={handlePressOnSignUp} />
      </Card>
    </div>
  );
}
