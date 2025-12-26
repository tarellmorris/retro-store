import Image from "next/image";

export const NavBar = () => {
    return (
        <nav className="flex w-screen p-4 bg-amber-500">
            <Image src={"/tv.svg"} alt="logo" width={40} height={40} />
        </nav>
    );
};