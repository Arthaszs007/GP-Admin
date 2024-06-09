"use client";
import { authenticate } from "@/Lib/auth/action";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

const Login = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className=" hero h-screen bg-white-0">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">GP Management</h1>
          <p className="py-6">Welcome to GP Management client!</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form action={dispatch} className="card-body">
            <div className="form-control">
              <label className="label" htmlFor="username">
                <span className="label-text">Username</span>
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="username"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
                minLength={6}
              />
            </div>
            <div className="form-control mt-6">
              <LoginButton />
              <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
              >
                {errorMessage && (
                  <>
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-accent" aria-disabled={pending}>
      Login
    </button>
  );
}
