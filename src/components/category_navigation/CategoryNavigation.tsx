import React from "react";
import { Link } from "react-router-dom";
import { ICard } from "../../types/card";

interface ICategoryNavigation {
  cards: ICard[];
  year: string | null;
}
function getTotal(arr: string[], value: string) {
  return arr.filter((item) => item === value).length;
}

function CategoryNavigation({ cards, year }: ICategoryNavigation) {
  const categoryArr = cards.map((item) => item.theme.title);
  const dublicateRemoving = Array.from(new Set(categoryArr));
  const categories = dublicateRemoving?.map((item) => {
    return {
      title: item,
      total: categoryArr ? getTotal(categoryArr, item) : 0,
    };
  });

  return (
    <ul className='flex gap-x-4 border'>
      {categories.map((c, i) => (
        <li key={i}>
          <Link to={`category?year=${year}&category=${c.title}`}>
            <div className='flex gap-x-2'>
              <div>{c.title}</div>
              <div>
                {c.total ? <div className='underline'>{c.total}</div> : null}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default CategoryNavigation;
