import React from "react";

interface IYearTitle {
  year: string | null;
}

function YearTitle({ year }: IYearTitle) {
  return <h1>Bibliografie za rok {year}</h1>;
}

export default YearTitle;
