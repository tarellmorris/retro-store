import Image, { StaticImageData } from "next/image";

interface HeroProps {
  alt: string;
  headerCopy?: string;
  image: StaticImageData;
}

export const Hero = ({ alt, headerCopy, image }: HeroProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto max-h-100 overflow-hidden relative">
      <div className="flex justify-center items-center overflow-hidden relative drop-shadow-2xl">
        <Image
          alt={alt}
          className="blur-[2px]"
          placeholder="blur"
          preload={true}
          src={image}
        />
        <div className="h-full w-full bg-linear-65 from-cyan-700/50 to-pink-600/50 z-1 absolute top-0" />
      </div>
      {headerCopy && (
        <div className="flex flex-col  justify-center absolute z-2 font-sans text-zinc-50 w-full h-full p-16">
          <p className="text-6xl font-bold text-shadow-lg text-shadow-amber-950 text-wrap lg:max-w-1/2 max-w-10/12">
            {headerCopy}
          </p>
        </div>
      )}
    </div>
  );
};
