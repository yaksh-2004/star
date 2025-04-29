// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const AdminSidebar = () => {
//   const pathname = usePathname();

//   const links = [
//     { href: "/admin/createProduct", label: "Create Product" },
//     { href: "/admin/products", label: "All Products" },
//     { href: "/admin/users", label: "All Users" },
//   ];

//   return (
//     <div className="w-64 h-180 bg-gray-700 text-white p-4">
//       <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

//       <nav className="flex flex-col gap-4">
//         {links.map((link) => (
//           <Link
//             key={link.href}
//             href={link.href}
//             className={` p-2 rounded ${
//               pathname === link.href ? "bg-gray-600" : "hover:bg-gray-700"
//             }`}
//           >
//             {link.label}
//           </Link>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default AdminSidebar;







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