"use client";

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import images from "@/utils/images";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/features/authSlice";
import { FACEBOOK_CLIENT_ID } from "@/config/api";
import { useSocialLoginMutation } from "@/hooks/api/socialLogin";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SocialAuthentication() {
  const dispatch = useDispatch();
  const socialLoginMutation = useSocialLoginMutation();
  const router = useRouter();

  // Google login handler using custom button
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      socialLoginMutation.mutate(
        { provider: "google", token: tokenResponse.access_token },
        {
          onSuccess: (res) => {
            if (res.success) {
              dispatch(
                loginSuccess({ user: res.data.user, token: res.data.token })
              );
              toast.success("Login successfully with google");
              router.replace("/");
            }
          },
          onError: (err) => console.error("Facebook login failed:", err),
        }
      );
    },
  });

  // Facebook login handler
  const handleFacebookResponse = async (response: any) => {
    socialLoginMutation.mutate(
      { provider: "facebook", token: response.accessToken },
      {
        onSuccess: (res) => {
          if (res.success) {
            dispatch(
              loginSuccess({ user: res.data.user, token: res.data.token })
            );
            toast.success("Login successfully with facebook");

            router.replace("/");
          }
        },
        onError: (err) => console.error("Facebook login failed:", err),
      }
    );
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Facebook Button */}
      <FacebookLogin
        appId={FACEBOOK_CLIENT_ID!}
        callback={handleFacebookResponse}
        render={(renderProps: { onClick: () => void }) => (
          <Button
            variant="outline"
            className="border-blue-600 hover:bg-blue-200 flex items-center gap-2"
            onClick={renderProps.onClick}
          >
            <Image
              src={images.facebook}
              alt="Facebook"
              width={20}
              height={20}
            />
            <span className="text-[16px] font-semibold text-blue-500">
              Facebook
            </span>
          </Button>
        )}
      />

      {/* Google Button */}
      <Button
        variant="outline"
        className="border-gray-400 hover:bg-gray-100 flex items-center gap-2"
        onClick={() => loginWithGoogle()}
      >
        <Image src={images.google} alt="Google" width={20} height={20} />
        <span className="text-[16px] font-semibold text-gray-700">Google</span>
      </Button>
    </div>
  );
}
