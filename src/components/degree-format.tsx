import React from "react";

interface Props {
  number: number;
  className?: string;
}

const DegreeFormat = ({ number, className }: Props): JSX.Element => {
  return (
    <div className={`display-flex ${className}`}>
      <p>{number}</p>
      <sup>&deg;</sup>
    </div>
  );
};

export default DegreeFormat;
