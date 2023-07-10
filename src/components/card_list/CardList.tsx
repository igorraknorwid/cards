import React from "react";
import { ICard } from "../../types/card";
import Card from "./Card";

interface ICardList {
  cards: ICard[];
}

function CardList({ cards }: ICardList) {
  return (
    <ul>
      {cards.map((item) => (
        <Card key={item._id} card={item} />
      ))}
    </ul>
  );
}

export default CardList;
