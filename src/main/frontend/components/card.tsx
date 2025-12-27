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
    <div className="flex flex-col flex-1 justify-between p-4 bg-zinc-50 min-h-100 h-auto min-w-80 w-auto rounded-2xl drop-shadow-2xl relative">
      <div>
        <div className="overflow-hidden rounded-2xl relative h-40 w-auto">
          <Image alt={alt} placeholder="blur" src={image} />
          <div className="h-full w-full bg-linear-65 from-cyan-700/50 to-pink-600/50 z-1 absolute top-0" />
        </div>
        <div className="flex flex-col justify-between p-4 gap-4">
          <div className="flex flex-col gap-2">
            {headerText && <h3 className="font-bold text-2xl">{headerText}</h3>}
            {description && <p className="text-lg">{description}</p>}
          </div>
        </div>
      </div>
      <CTAButton ctaURL={ctaURL} text={ctaText} />
    </div>
  );
};
