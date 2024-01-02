"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
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
        <form className="mt-8" onSubmit={handleLogin}>
          <div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <Input
                id="username"
                name="username"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="my-2">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
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
