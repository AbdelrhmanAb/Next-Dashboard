import Sidebar from "@/components/sidebar.tsx/sidebar";
import Topbar from "@/components/topbar/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex w-full flex-col overflow-auto py-5">
        <Topbar />
        {children}
      </main>
    </div>
  );
}