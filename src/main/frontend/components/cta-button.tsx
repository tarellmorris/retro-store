"use client";

import { Button, Link } from "@heroui/react";

export interface CTAButtonProps {
  ctaURL: string;
  text: string;
}

export const CTAButton = ({ ctaURL, text }: CTAButtonProps) => {
  return (
    <Button
      as={Link}
      className="bg-pink-600 text-lg text-zinc-50 drop-shadow-sm"
      href={ctaURL}
    >
      {text}
    </Button>
  );
};
