import { FormRegister } from "@/components/register/FormRegister";
import Link from "next/link";

export default function RegisterPage() {

    
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#181818] px-4">

      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[180px]" />
      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[180px]" />
      <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[160px]" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,.45)]">

        <div className="mb-8 text-center">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-[0_0_40px_rgba(59,130,246,.45)]">
            <span className="text-3xl font-bold text-white">
              A
            </span>
          </div>

          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-3 text-gray-400">
            Create your account to continue
          </p>

        </div>

        <FormRegister />

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account؟{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            Login
          </Link>
        </p>

      </div>

    </main>
  );
}