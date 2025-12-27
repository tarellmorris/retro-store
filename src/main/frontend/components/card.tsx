import Image, { StaticImageData } from "next/image";

import { CTAButton } from "@/components/cta-button";

export interface CardProps {
  alt: string;
  ctaText: string;
  ctaURL: string;
  description: string;
  headerText: string;
  image: StaticImageData;
}

export const Card = ({
  alt,
  ctaText,
  ctaURL,
  description,
  headerText,
  image,
}: CardProps) => {
  return (
    <div className="p-4 bg-zinc-50 min-h-100 h-auto w-80 rounded-2xl drop-shadow-2xl relative">
      <div className="overflow-hidden rounded-2xl relative h-auto w-auto">
        <Image alt={alt} layout="responsive" placeholder="blur" src={image} />
        <div className="h-50 w-full bg-linear-65 from-cyan-700/50 to-pink-600/50 z-1 absolute top-0" />
      </div>
      <div className="flex flex-col p-4 gap-2">
        {headerText && <h3 className="font-bold text-2xl">{headerText}</h3>}
        {description && <p className="text-lg">{description}</p>}
        <CTAButton ctaURL={ctaURL} text={ctaText} />
      </div>
    </div>
  );
};
