"use client";

import Link from "next/link";
import React, { useState } from "react";
import Container from "../../components/container";
import axios from "axios";
import { useRouter } from "next/navigation";

const LOGIN_URL = "http://localhost:8080/api/v0/auth/login";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    alert("Login button has been clicked");
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      localStorage.setItem("token", data.jwt);
      router.push("/");
    } catch (error) {
      console.error("login failed", error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <Container className="p-4">
        <div className="flex flex-col gap-2 pb-7">
          <div className="text-2xl text-white">Login to Your Account</div>
          <div className="text-sm font-light text-neutral-500">
            Your automation tool are ready—sign in and get productive.
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-2">
              <label className="text-base text-white">Email</label>
              <input
                type="email"
                name="email"
                id="Email"
                placeholder="Email"
                className="w-full rounded-sm border border-neutral-800 bg-transparent px-3 py-2 text-neutral-200 placeholder:text-sm placeholder:text-[#616161]"
                required
                value={loginData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base text-white">Password</label>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="Password"
                className="w-full rounded-sm border border-neutral-800 bg-transparent px-3 py-2 text-neutral-200 placeholder:text-sm placeholder:text-[#616161]"
                required
                value={loginData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-6">
            <div className="flex w-full flex-col items-center justify-center">
              <button
                type="submit"
                className="mb-3 w-full rounded-sm bg-neutral-900 py-2 text-neutral-200 hover:bg-neutral-800"
              >
                Continue
              </button>
              <button className="w-full rounded-sm border border-neutral-800 py-2 text-neutral-300 hover:bg-neutral-950">
                Continue as guest
              </button>
              <div className="mt-4 text-center text-sm text-[#9D9D9D]">
                Don't have an account? &nbsp;
                <Link
                  href="/sign-up"
                  className="text-[#4B9AEA] hover:text-blue-600"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default Login;
