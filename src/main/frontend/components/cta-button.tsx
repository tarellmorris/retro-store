import Link from "next/link";

export interface CTAButtonProps {
  ctaURL: string;
  text: string;
}

export const CTAButton = ({ ctaURL, text }: CTAButtonProps) => {
  return (
    <Link
      className="flex justify-center p-3 rounded-4xl bg-pink-600 hover:bg-pink-700 font-bold text-lg text-zinc-50 cursor-pointer"
      href={ctaURL}
    >
      {text}
    </Link>
  );
};
