import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 p-4 text-white">
      <nav className="container mx-auto flex justify-between">
        <Link href="/">
          <span className="font-bold cursor-pointer">Home</span>
        </Link>
        <Link href="/admin">
          <span className="cursor-pointer">Admin</span>
        </Link>
      </nav>
    </header>
  );
}
