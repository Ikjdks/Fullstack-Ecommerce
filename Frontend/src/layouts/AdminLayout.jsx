import { Outlet } from "react-router-dom";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AdminSidebar } from "../components/admin/AdminSidebar";
const AdminLayout = () => {
  return (
    <SidebarProvider>
      {" "}
      <div className="min-h-screen bg-background flex w-full">
        {" "}
        <AdminSidebar />{" "}
        <SidebarInset className="bg-background">
          {" "}
          <header className="flex h-16 items-center gap-3 border-b bg-background px-4 sm:px-6">
            {" "}
            <SidebarTrigger />{" "}
            <Separator orientation="vertical" className="h-5" />{" "}
            <h1 className="text-xl font-semibold text-foreground">
              {" "}
              Admin Dashboard{" "}
            </h1>{" "}
          </header>{" "}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {" "}
            <Outlet />{" "}
          </main>{" "}
        </SidebarInset>{" "}
      </div>{" "}
    </SidebarProvider>
  );
};
export default AdminLayout;
