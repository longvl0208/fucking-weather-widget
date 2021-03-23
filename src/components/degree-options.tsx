import React from "react";

interface Props {
  tempType: string;
  onChangeTempType: (value: string) => void;
}

const DegreeOptions = ({ tempType, onChangeTempType }: Props): JSX.Element => {
  return (
    <div className="degree-options">
      <button
        className={tempType === "F" ? `button-active` : "button-inactive"}
        onClick={() => {
          onChangeTempType("F");
        }}
      >
        F
      </button>
      /
      <button
        className={tempType === "C" ? `button-active` : "button-inactive"}
        onClick={() => {
          onChangeTempType("C");
        }}
      >
        C
      </button>
    </div>
  );
};

export default DegreeOptions;
