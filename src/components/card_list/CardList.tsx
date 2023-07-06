import React from "react";
import { ICard } from "../../types/card";

interface ICardList {
  cards: ICard[];
}

function CardList({ cards }: ICardList) {
  return (
    <ul>
      {cards.map((item) => (
        <li key={item._id}>
          <div>
            {item.title}-{item.theme.title}
          </div>
          <img src={item.image_slug} alt={item.title} height={300} />
        </li>
      ))}
    </ul>
  );
}

export default CardList;
