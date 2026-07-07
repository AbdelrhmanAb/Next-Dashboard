'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { MdErrorOutline } from "react-icons/md";

export const FormLogin = () => {
  const router = useRouter();

  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.email ||
      !form.password

    ) {
      toast.error("Please complete all fields");
      return;
    }



    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      
      const data = await response.json();
     

      if (!response.ok) {
        toast.error(data.message||data.msg);
        setErrorMsg(data.message||data.msg);
        return;
      }

      toast.success(data.message||data.msg);
      setErrorMsg("");
      router.replace("/");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-300">
          Email Address
        </label>

        <input
          type="email"
          placeholder="name@example.com"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/5
          px-5
          py-3.5
          text-white
          placeholder:text-gray-500
          backdrop-blur-md
          outline-none
          transition-all
          duration-300
          focus:border-blue-500
          focus:bg-white/10
          focus:ring-4
          focus:ring-blue-500/20
        "
        />
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-300">
          Password
        </label>

        <input
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/5
          px-5
          py-3.5
          text-white
          placeholder:text-gray-500
          backdrop-blur-md
          outline-none
          transition-all
          duration-300
          focus:border-blue-500
          focus:bg-white/10
          focus:ring-4
          focus:ring-blue-500/20
        "
        />
      </div>

      {/* Remember */}
      <div className="flex items-center justify-between">

        <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-400">

          <input
            type="checkbox"
            className="h-4 w-4 accent-blue-600"
          />

          Remember me

        </label>

        <button
          type="button"
          className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
        >
          Forgot password?
        </button>

      </div>

      {/* Login */}
      <button
        type="submit"
        className="
        w-full
        rounded-2xl
        bg-gradient-to-r
        from-blue-600
        to-cyan-500
        py-3.5
        font-semibold
        tracking-wide
        text-white
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:shadow-[0_0_30px_rgba(59,130,246,.45)]
        active:scale-100
      "
      >
        Login
      </button>

      <div className="p-2 flex items-center justfy-center">
     {errorMsg && (
  <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-red-700 shadow-sm">
    <MdErrorOutline size={22} />
    <span className="font-medium">{errorMsg}</span>
  </div>
)}
      </div>

    </form>
  );
};