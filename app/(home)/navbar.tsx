import Link from "next/link";
import Image from "next/image";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import { UserButton,OrganizationSwitcher } from "@clerk/clerk-react";

export default function Navbar() {

  const searchParams = useSearchParams();
  const search = searchParams.get("search")

  const router = useRouter();
  return (
    <nav className="fixed top-0 w-full h-16  bg-white flex items-center px-4 ">
      {/* Left - Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}  // 设置一个基准宽度
            height={32} // 设置一个基准高度
            className="w-auto h-8 object-contain" // 保持比例，高度8
          />
        </Link>
        <span className="text-xl font-medium ml-2">Shadow</span>
      </div>

      {/* Center - Search */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-3xl">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              const debouncedSearch = debounce((value) => {
                router.push(`/?search=${value}`);
              }, 300);
              debouncedSearch(e.target.value);
            }}
            value={search ?? ""}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-2xl"
          />
        </div>
      </div>

      {/* Right - User */}
      <div className="flex items-center gap-2">
        <OrganizationSwitcher />
        <UserButton />
      </div>
    </nav>
  )
}
