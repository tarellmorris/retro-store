import Image from "next/image";
import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="flex w-screen p-4 pl-8 pr-8 bg-amber-500 gap-4 items-center font-sans drop-shadow-sm">
      <Link href="/">
        <div className="flex gap-4 items-center">
          <Image alt="logo" height={40} src={"/tv.svg"} width={40} />
          <span className="text-xl font-bold text-zinc-50">Retro Store</span>
        </div>
      </Link>
    </nav>
  );
};
