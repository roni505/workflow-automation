"use client";

import React, { useState } from "react";
import Container from "../../components/container";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const SIGNUP_URL = "http://localhost:8080/api/v0/auth/signup";

function SignUpPage() {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    alert("Btn has been clicked");
    e.preventDefault();
    try {
      const response = await axios.post(SIGNUP_URL, signUpData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      localStorage.setItem("token", data.jwt);
      router.push("/");
    } catch (error) {
      console.error("Creating new account failed", error);
    }
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <Container className="p-4">
        <div className="flex flex-col gap-2 pb-7">
          <div className="text-2xl text-white">Create Your Account</div>
          <div className="text-sm font-light text-neutral-500">
            Seamless automation tools to boost your productivity.
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-2">
              <label className="text-base text-white">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="w-full rounded-sm border border-neutral-800 bg-transparent px-3 py-2 text-neutral-200 placeholder:text-sm placeholder:text-[#616161]"
                required
                value={signUpData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-base text-white">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full rounded-sm border border-neutral-800 bg-transparent px-3 py-2 text-neutral-200 placeholder:text-sm placeholder:text-[#616161]"
                required
                value={signUpData.email}
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
                value={signUpData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-6">
            <div className="flex w-full flex-col items-center justify-center">
              <button
                type="submit"
                className="w-full rounded-sm bg-neutral-900 py-2 text-neutral-200 hover:bg-neutral-800"
              >
                Continue
              </button>
              <div className="mt-4 text-center text-sm text-[#9D9D9D]">
                Already have an account? &nbsp;
                <Link
                  href="/login"
                  className="text-[#4B9AEA] hover:text-blue-600"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default SignUpPage;
