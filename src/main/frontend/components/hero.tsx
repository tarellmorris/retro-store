import Image, { StaticImageData } from "next/image";

interface HeroProps {
  alt: string;
  headerCopy?: string;
  image: StaticImageData;
}

export const Hero = ({ alt, headerCopy, image }: HeroProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto max-h-100 overflow-hidden relative">
      <Image
        alt={alt}
        layout="responsive"
        placeholder="blur"
        preload="true"
        src={image}
      />
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
