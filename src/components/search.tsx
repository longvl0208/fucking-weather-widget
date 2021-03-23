import React, { useState } from "react";
import CloseIcon from "../assets/icons/close.svg";

interface Props {
  onSearch: (value: string) => void;
}

const Search = ({ onSearch }: Props): JSX.Element => {
  const [location, setLocation] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(location);
  };
  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };
  const resetSearchInput = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setLocation("");
  };
  return (
    <form className="search-component" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="location"
        onChange={handleOnChangeInput}
        value={location}
      />
      <button onClick={resetSearchInput} type="reset">
        <img src={CloseIcon} alt="close-icon" />
      </button>
    </form>
  );
};

export default Search;
