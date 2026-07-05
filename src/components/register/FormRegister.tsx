'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const FormRegister = () => {
    const router = useRouter();

    const [form, setForm] = React.useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        country: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !form.username ||
            !form.email ||
            !form.password ||
            !form.confirmPassword||
            !form.phone||
            !form.country
        ) {
            toast.error("Please complete all fields");
            return;
        }

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

          if (form.phone.length < 11) {
            toast.error("Invalid phone number");
            return;
        }

           if (form.country.length < 2) {
            toast.error("Country is required");
            return;
        }
      

        try {

            const { confirmPassword, ...newForm } = form
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newForm),
            });

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                toast.error(data.message);
                return;
            }

            toast.success(data.message);
            router.replace("/");
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        }
    };

    const inputStyle =
        "w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-white placeholder:text-gray-500 backdrop-blur-md outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/20";

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            <div>
                <label className="mb-2 block text-sm text-gray-300">
                    Username
                </label>

                <input
                    type="text"
                    placeholder="John Doe"
                    className={inputStyle}
                    value={form.username}
                    onChange={(e) =>
                        setForm({ ...form, username: e.target.value })
                    }
                />
            </div>

            <div>
                <label className="mb-2 block text-sm text-gray-300">
                    Email Address
                </label>

                <input
                    type="email"
                    placeholder="name@example.com"
                    className={inputStyle}
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />
            </div>

            <div>
                <label className="mb-2 block text-sm text-gray-300">
                    Password
                </label>

                <input
                    type="password"
                    placeholder="••••••••"
                    className={inputStyle}
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />
            </div>

            <div>
                <label className="mb-2 block text-sm text-gray-300">
                    Confirm Password
                </label>

                <input
                    type="password"
                    placeholder="••••••••"
                    className={inputStyle}
                    value={form.confirmPassword}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            confirmPassword: e.target.value,
                        })
                    }
                />
            </div>
            <div>
                <label className="mb-2 block text-sm text-gray-300">
                    phone
                </label>

                <input
                    type="text"
                    placeholder="••••••••"
                    className={inputStyle}
                    value={form.phone}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            phone: e.target.value,
                        })
                    }
                />
            </div>
            <div>
                <label className="mb-2 block text-sm text-gray-300">
                    country
                </label>

                <input
                    type="text"
                    placeholder="••••••••"
                    className={inputStyle}
                    value={form.country}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            country: e.target.value,
                        })
                    }
                />
            </div>

            <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(59,130,246,.45)] active:scale-100"
            >
                Create Account
            </button>

        </form>
    );
};