import React from "react";
import { TempTypeEnums } from "../enums";

interface Props {
  tempType: string;
  onChangeTempType: (value: TempTypeEnums) => void;
}

const DegreeOptions = ({ tempType, onChangeTempType }: Props): JSX.Element => {
  return (
    <div className="degree-options">
      <button
        className={tempType === "F" ? `button-active` : "button-inactive"}
        onClick={() => {
          onChangeTempType(TempTypeEnums.F);
        }}
      >
        F
      </button>
      /
      <button
        className={tempType === "C" ? `button-active` : "button-inactive"}
        onClick={() => {
          onChangeTempType(TempTypeEnums.C);
        }}
      >
        C
      </button>
    </div>
  );
};

export default DegreeOptions;
