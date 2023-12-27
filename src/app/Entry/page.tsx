"use client";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Entry() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-12">
      <div className="max-w-lg w-full ">
        <div>
          <h2 className="text-center text-2xl font-bold text-main">Sign in</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                required
                className="rounded-t-md relative w-full px-3 py-2 border border-custom-gray placeholder-custom-gray text-gray-900 focus:outline-none focus:ring-main focus:border-main focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="rounded-b-md relative w-full px-3 py-2 border border-custom-gray placeholder-custom-gray text-gray-900 focus:outline-none focus:ring-main focus:border-main focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Button
              type="submit"
              fullScreen
              disabled={username.length === 0 || password.length === 0}
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
