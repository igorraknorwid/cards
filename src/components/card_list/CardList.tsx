import React from "react";
import { ICard } from "../../types/card";
import Card from "./Card";

interface ICardList {
  cards: ICard[];
  itemsPerPage: number;
}

function CardList({ cards, itemsPerPage }: ICardList) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const paginatedCards = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return cards.slice(startIndex, endIndex);
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <section>
      <div>
        {Array.from(
          { length: Math.ceil(cards.length / itemsPerPage) },
          (_, index) => index + 1
        ).map((pageNumber) => (
          <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>
      <ul>
        {paginatedCards().map((item) => (
          <Card key={item._id} card={item} />
        ))}
      </ul>
    </section>
  );
}

export default CardList;
