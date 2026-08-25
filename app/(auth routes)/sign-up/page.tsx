"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { register } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

import css from "./SignUpPage.module.css";
import axios from "axios";

export default function SignUpPage() {
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  const [error, setError] = useState("");

  const handleSubmit = async (
  event: React.SyntheticEvent<HTMLFormElement>
) => {
    event.preventDefault();

    setError("");

    const form = event.currentTarget;

    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const user = await register({
        email,
        password,
      });

      setUser(user);

      router.push("/profile");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Something went wrong");
      } else {
        setError("An unexpected error occurred");
      }
    }
};

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>

      <form
        className={css.form}
        onSubmit={handleSubmit}
      >
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            name="password"
            autoComplete="new-password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Register
        </button>
      </div>
      <p className={css.error}>{error}</p>
    </form>
  </main>
);
}