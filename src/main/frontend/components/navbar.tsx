import Image from "next/image";
import Link from "next/link";

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
      <div>
        <Link className="flex gap-2 items-center" href="/login">
          <span className="text-medium font-bold text-zinc-50">Login</span>
          <Image
            alt="user"
            height={25}
            preload={true}
            src={"/user.svg"}
            width={25}
          />
        </Link>
      </div>
    </nav>
  );
};
