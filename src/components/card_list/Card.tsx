import React from "react";
import { ICard } from "../../types/card";

interface ICardComponent {
  card: ICard;
}

function Card({ card }: ICardComponent) {
  return (
    <li key={card._id}>
      <img src={card.image_slug} alt={card.title} height={300} />
      <div>
        {card.title}-{card.theme.title}
      </div>
    </li>
  );
}

export default Card;
