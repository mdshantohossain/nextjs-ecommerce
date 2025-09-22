import SocialAuthentication from '@/components/SocialAuthentication'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@radix-ui/react-checkbox'
import Link from 'next/link'
import React from 'react'

export default function LoginPage() {
 return (
    <div className="flex items-center justify-center bg-gray-50 px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Input type="email" placeholder="Your Email" className="w-full" />
            <Input type="password" placeholder="Password" className="w-full" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-gray-600 hover:text-gray-900">
              Forgot password?
            </Link>
          </div>

          <Button className="w-full bg-red-500 hover:bg-red-600 text-white">Log In</Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">OR</span>
            </div>
          </div>

         <SocialAuthentication />

          <div className="text-center text-sm text-gray-600">
            {"Don't Have an Account? "}
            <Link href="/register" className="text-blue-600 hover:text-blue-800">
              Sign up now
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
