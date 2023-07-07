import React from "react";
import { Link } from "react-router-dom";
import { INavigation } from "../../types/card";

function getTotal(arr: string[], value: string) {
  return arr.filter((item) => item === value).length;
}

function TitleNavigation({ cards, year }: INavigation) {
  const arrByTitle = cards.map((item) => item.title);
  const dublicateRemoving = Array.from(new Set(arrByTitle));
  const items = dublicateRemoving?.map((item) => {
    return {
      title: item,
      total: arrByTitle ? getTotal(arrByTitle, item) : 0,
    };
  });

  return (
    <ul className='flex gap-x-4 border'>
      {items.map((c, i) => (
        <li key={i}>
          <Link to={`title?year=${year}&title=${c.title}`}>
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

export default TitleNavigation;
