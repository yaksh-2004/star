"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/admin/createProduct", label: "Create Product" },
    { href: "/admin/products", label: "All Products" },
    { href: "/admin/users", label: "All Users" },
  ];

  return (
    <div className="w-64 h-180 bg-gray-700 text-white p-4">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={` p-2 rounded ${
              pathname === link.href ? "bg-gray-600" : "hover:bg-gray-700"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;