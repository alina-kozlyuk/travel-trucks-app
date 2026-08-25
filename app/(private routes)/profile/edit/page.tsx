"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore"; 
import { updateMe } from "@/lib/api/clientApi";
import css from "./EditProfilePage.module.css"; 
import axios from "axios";

export default function ProfileEditPage() {
  const router = useRouter();
  
  const { user, setUser } = useAuthStore();
  
  const [username, setUsername] = useState(user?.username || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await updateMe({ username });
      
      setUser(updatedUser);
      
      router.push("/profile");
    } catch (err) { 
  if (axios.isAxiosError(err)) {
    setError(err.response?.data?.message || "Failed to update profile");
  } else if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("An unexpected error occurred");
  }
} finally {
  setIsLoading(false);
}
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user?.avatar && (
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        )}

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <p>Email: {user?.email}</p>

          {error && <p className={css.error}>{error}</p>}

          <div className={css.actions}>
            <button type="submit" className={css.saveButton} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}