import { Card, type CardProps } from "@/components/card";

interface CardsBlockProps {
  cards: CardProps[];
}

export const CardsBlock = ({ cards }: CardsBlockProps) => {
  return (
    <div className="flex flex-wrap p-16 gap-16 justify-center">
      {cards.map((card) => (
        <Card key={`${card.headerText}-${card.alt}`} {...card} />
      ))}
    </div>
  );
};
