import Link from "next/link";

export default function BottomBar() {
  return (
    <footer className="w-full text-lavendar-blush border-t border-gunmetal z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between text-sm">
        <div className="mb-2 sm:mb-0">
          <span>&copy; {new Date().getFullYear()} AI Chess</span>
        </div>

        <div className="flex space-x-4">
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
