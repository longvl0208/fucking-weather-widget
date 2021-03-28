import React from "react";
import { isEmpty, get, computeTemp } from "../utils";
import { unix } from "moment";
import DegreeFormat from "./degree-format";
import DegreeOptions from "./degree-options";
import { AirQuality, TempTypeEnums } from "../enums";

interface Props {
    coordinate: LocationLatLongResponse | undefined;
    mainData: Current | {};
    weatherData: Partial<WeatherDataResponse>;
    tempType: TempTypeEnums;
    handleChangeTempType: (value: TempTypeEnums) => void;
    calculateAirQuality: AirQuality | undefined;
}
const REACT_APP_OPEN_WEATHER_ICON = process.env.REACT_APP_OPEN_WEATHER_ICON;

const MainInfo = ({
    coordinate,
    mainData,
    weatherData,
    tempType,
    handleChangeTempType,
    calculateAirQuality,
}: Props): JSX.Element => {
    return (
        <div className="main-info">
            <p className="location">
                {get(coordinate, "name")}, {get(coordinate, "country")}
            </p>
            <p className="h-32 main-weather">
                {!isEmpty(mainData)
                    ? `${unix(get(mainData, "dt"))
                          .locale(get(weatherData, "timezone", ""))
                          .format("dddd")} ${
                          !get(mainData, "isSubData")
                              ? unix(get(mainData, "dt"))
                                    .locale(get(weatherData, "timezone", ""))
                                    .format("H:mm A")
                              : ""
                      }`
                    : ""}
                &nbsp;•{" "}
                {!isEmpty(mainData) && get(mainData, "weather[0].description")}
            </p>
            <div className="display-flex">
                <div className="right-content">
                    <img
                        src={
                            !isEmpty(mainData)
                                ? `${REACT_APP_OPEN_WEATHER_ICON}${get(
                                      mainData,
                                      "weather[0].icon"
                                  )}@2x.png`
                                : ""
                        }
                        alt="icon"
                        className="mr-12"
                        height={50}
                        width={50}
                    />
                    <DegreeFormat
                        number={
                            !isEmpty(mainData) && !get(mainData, "isSubData")
                                ? computeTemp(get(mainData, "temp"), tempType)
                                : computeTemp(
                                      get(mainData, "temp.max"),
                                      tempType
                                  )
                        }
                        className="mr-6 main-degree"
                    />
                    <DegreeOptions
                        tempType={tempType}
                        onChangeTempType={handleChangeTempType}
                    />
                </div>
                <div className="left-content">
                    <p>
                        Humidity:{" "}
                        {!isEmpty(mainData) && get(mainData, "humidity")}%
                    </p>
                    <p>
                        Wind:{" "}
                        {!isEmpty(mainData) && get(mainData, "wind_speed")}
                        &nbsp;KPH SE
                    </p>
                    {!isEmpty(mainData) && !get(mainData, "isSubData") ? (
                        <p>Air Quality: {calculateAirQuality}</p>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainInfo;
