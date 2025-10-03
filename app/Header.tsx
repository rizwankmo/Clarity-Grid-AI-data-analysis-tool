import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Image src="/csvlogo.png" alt="Brand Logo" width={32} height={32} />
          <span className="font-bold text-xl text-blue-700">CSV Grid</span>
        </div>
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</Link>
          <Link href="/csv-analyzer" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">CSV Analyzer</Link>
        </div>
      </nav>
    </header>
  );
}
