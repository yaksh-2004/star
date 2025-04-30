
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const pathname = usePathname();

  const navigationLinks = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/createProduct", label: "Create Product" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/users", label: "Users" },
    { href: "/admin/orders", label: "Orders" },
  ];

  return (
    <div className="flex flex-col mt-20">
    
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <span className="text-lg font-semibold text-gray-800">Admin Panel</span>
      </div>

      <nav className="flex-1 px-4 pt-6">
        <ul className="space-y-1">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`
                  block px-4 py-2.5 rounded-md text-sm font-medium transition-colors
                  ${pathname === link.href
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>


      <div className="p-4 border-t border-gray-200">
        <div className="px-4 py-3">
          <p className="text-sm font-medium text-gray-900">Admin User</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;