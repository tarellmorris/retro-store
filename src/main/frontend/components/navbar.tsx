import Image from "next/image";

export const NavBar = () => {
  return (
    <nav className="flex w-screen p-4 bg-amber-500 gap-4 items-center font-sans drop-shadow-sm">
      <Image alt="logo" height={40} src={"/tv.svg"} width={40} />
      <span className="text-xl font-bold text-zinc-50">Retro Store</span>
    </nav>
  );
};
