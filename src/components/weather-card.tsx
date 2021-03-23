import React from "react";
import DegreeFormat from "./degree-format";
import moment from "moment";
import { get } from "lodash";
import { computeTemp } from "../utils";
interface Props {
    item: object;
    handleOnClickWeatherCar: (data: object) => void;
    timezone: string;
    tempType: string;
}
const REACT_APP_OPEN_WEATHER_ICON = "http://openweathermap.org/img/wn/";

const WeatherCard = ({
    item,
    handleOnClickWeatherCar,
    timezone,
    tempType,
}: Props): JSX.Element => {
    return (
        <button
            className="weather-card"
            onClick={() => handleOnClickWeatherCar(item)}
        >
            <p className="day">
                {moment.unix(get(item, "dt")).locale(timezone).format("ddd")}
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
