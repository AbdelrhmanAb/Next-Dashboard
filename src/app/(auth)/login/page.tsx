import { FormLogin } from "@/components/login/loginForm";

export default function Login() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#181818] px-4">

      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[180px]" />

      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[180px]" />

      <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[160px]" />

      {/* Card */}
      <div
        className="
        relative
        w-full
        max-w-md
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-10
        backdrop-blur-2xl
        shadow-[0_0_80px_rgba(0,0,0,.45)]
        transition-all
        duration-500
        hover:border-blue-500/20
        hover:shadow-[0_0_80px_rgba(59,130,246,.15)]
      "
      >
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">

          <div
            className="
            mb-6
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-3xl
            bg-gradient-to-br
            from-blue-500
            to-cyan-500
            shadow-[0_0_40px_rgba(59,130,246,.45)]
          "
          >
            <span className="text-3xl font-bold text-white">A</span>
          </div>

          <h1 className="text-4xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-3 text-center text-gray-400">
            Sign in to continue to your dashboard
          </p>

        </div>

        <FormLogin />
      </div>
    </main>
  );
}