export const PROTECTED_ROUTES = [
  "/dashboard",
  "/goal",
  "/shop",
  "/setting",
  "/test",
];

export const AUTH_ROUTES = ["/login", "/register"];

export const PUBLIC_ROUTES = ["/", "/books", "/about", "/contact"];

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

export type NavLink = {
  label: string;
  href: string;
};

export const GUEST_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Books", href: "/books" },
  { label: "Demo Test", href: "/test/demo" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const AUTH_NAV_LINKS: NavLink[] = [
  // { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Goal", href: "/goal" },
  { label: "Book", href: "/books" },
  { label: "Bookmark", href: "/bookmark" },
  { label: "Shop", href: "/shop" },
  // { label: "Test", href: "/test" },
  // { label: "Setting", href: "/setting" },
];
