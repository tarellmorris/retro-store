import Image from "next/image";
import Link from "next/link";

import { UserLoginAction } from "@/components/login/user-login-action";

export const NavBar = () => {
  return (
    <nav className="flex w-screen p-4 pl-8 pr-8 bg-amber-500 gap-4 items-center justify-between font-sans drop-shadow-sm">
      <div>
        <Link href="/">
          <div className="flex gap-4 items-center">
            <Image
              alt="logo"
              height={40}
              preload={true}
              src={"/tv.svg"}
              width={40}
            />
            <span className="text-xl font-bold text-zinc-50">Retro Store</span>
          </div>
        </Link>
      </div>
      <UserLoginAction />
    </nav>
  );
};
