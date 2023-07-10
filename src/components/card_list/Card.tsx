import React from "react";
import { ICard } from "../../types/card";
import Modal from "./Modal";

interface ICardComponent {
  card: ICard;
}

function Card({ card }: ICardComponent) {
  const [isModal, setIsModal] = React.useState(false);
  const expandClickHandler = () => {
    setIsModal((s) => !s);
  };
  return (
    <li key={card._id} className='p-4 bg-slate-900 text-white border md:w-1/2 '>
      <img src={card.image_slug} alt={card.title} width={300} />
      <div>
        {card.title}-{card.theme.title}
      </div>
      <button onClick={expandClickHandler}>Expand</button>
      {isModal && <Modal card={card} expandClickHandler={expandClickHandler} />}
    </li>
  );
}

export default Card;
