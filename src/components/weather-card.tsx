import React from "react";
import DegreeFormat from "./degree-format";
import { computeTemp, get, unix } from "../utils";
interface Props {
    item: Daily;
    handleOnClickWeatherCard: (data: Daily) => void;
    timezone: string;
    tempType: string;
}
const REACT_APP_OPEN_WEATHER_ICON = "https://openweathermap.org/img/wn/";

const WeatherCard = ({
    item,
    handleOnClickWeatherCard,
    timezone,
    tempType,
}: Props): JSX.Element => {
    return (
        <button
            className="weather-card"
            onClick={() => handleOnClickWeatherCard(item)}
        >
            <p className="day">
                {unix(get(item, "dt")).locale(timezone).format("ddd")}
            </p>
            <img
                src={`${REACT_APP_OPEN_WEATHER_ICON}${get(
                    item,
                    "weather[0].icon"
                )}@2x.png`}
                alt="icon"
                className="mb-14"
                width={30}
                height={30}
            />
            <DegreeFormat
                number={computeTemp(get(item, "temp.max"), tempType)}
                className="large"
            />
            <DegreeFormat
                number={computeTemp(get(item, "temp.min"), tempType)}
            />
        </button>
    );
};

export default WeatherCard;
