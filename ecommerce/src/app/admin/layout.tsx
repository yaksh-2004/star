
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
    
      <div className="w-64 min-h-screen bg-white border-r border-gray-200">
        <AdminSidebar />
      </div>

    
      <div className="flex-1 bg-gray-50">
      
        <header className="h-16 bg-white border-b border-gray-200">
          <div className="h-full px-8 flex items-center">
            <h1 className="text-xl text-gray-800 font-semibold">Admin Dashboard</h1>
          </div>
        </header>

        <main className="p-8">
          <div className="max-w-[1200px] mx-auto bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};