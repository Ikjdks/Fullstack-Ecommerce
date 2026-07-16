import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  ArrowLeft,
  Store,
  BarChart3,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
const data = {
  navMain: [
    {
      title: "Store Management",
      items: [
        { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
        { title: "Products", url: "/admin/products", icon: Package },
        { title: "Categories", url: "/admin/category", icon: Tags },
        { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
        { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
        {
          title: "Customers",
          url: "/admin/customers",
          icon: Users,
        },
      ],
    },
  ],
};
export function AdminSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      {" "}
      <SidebarHeader>
        {" "}
        <div className=" flex items-center gap-3 px-4 py-3 ">
          {" "}
          <div className=" flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground ">
            {" "}
            <Store size={22} />{" "}
          </div>{" "}
          <div>
            {" "}
            <h1 className="text-xl font-bold text-foreground">
              {" "}
              Admin Panel{" "}
            </h1>{" "}
            <p className="text-xs text-muted-foreground">
              {" "}
              Manage your store{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </SidebarHeader>{" "}
      <SidebarContent>
        {" "}
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            {" "}
            <SidebarGroupLabel> {group.title} </SidebarGroupLabel>{" "}
            <SidebarGroupContent>
              {" "}
              <SidebarMenu>
                {" "}
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.title}>
                      {" "}
                      <SidebarMenuButton
                        asChild
                        className=" hover:bg-muted hover:text-primary transition "
                      >
                        {" "}
                        <Link
                          to={item.url}
                          className=" flex items-center gap-3 "
                        >
                          {" "}
                          <Icon size={18} /> <span> {item.title} </span>{" "}
                        </Link>{" "}
                      </SidebarMenuButton>{" "}
                    </SidebarMenuItem>
                  );
                })}{" "}
              </SidebarMenu>{" "}
            </SidebarGroupContent>{" "}
          </SidebarGroup>
        ))}{" "}
        {/* Back to store */}{" "}
        <SidebarGroup className="mt-auto">
          {" "}
          <SidebarGroupContent>
            {" "}
            <SidebarMenu>
              {" "}
              <SidebarMenuItem>
                {" "}
                <SidebarMenuButton
                  asChild
                  className=" hover:bg-muted hover:text-primary transition "
                >
                  {" "}
                  <Link to="/" className=" flex items-center gap-3 ">
                    {" "}
                    <ArrowLeft size={18} /> <span> Go back to store </span>{" "}
                  </Link>{" "}
                </SidebarMenuButton>{" "}
              </SidebarMenuItem>{" "}
            </SidebarMenu>{" "}
          </SidebarGroupContent>{" "}
        </SidebarGroup>{" "}
      </SidebarContent>{" "}
      <SidebarRail />{" "}
    </Sidebar>
  );
}
