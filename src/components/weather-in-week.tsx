import React from "react";
import { get, map } from "lodash";
import WeatherCard from "./weather-card";
import { TempTypeEnums } from "../enums";

interface Props {
  weatherData: Partial<WeatherDataResponse>;
  tempType: TempTypeEnums;
  handleOnClickWeatherCard: (data: Daily) => void;
}

const WeatherInWeek = ({
  weatherData,
  tempType,
  handleOnClickWeatherCard,
}: Props): JSX.Element => {
  return (
    <div className="weather-weekdays">
      {weatherData && get(weatherData, "daily") ? (
        map(get(weatherData, "daily"), (item: Daily) => (
          <WeatherCard
            key={item.dt}
            item={item}
            timezone={get(weatherData, "timezone", "")}
            tempType={tempType}
            handleOnClickWeatherCard={handleOnClickWeatherCard}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default WeatherInWeek;
