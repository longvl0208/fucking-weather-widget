import React, { useState, useEffect } from "react";
import "./App.scss";
import Search from "./components/search";
import DegreeFormat from "./components/degree-format";
import DegreeOptions from "./components/degree-options";
import WeatherCard from "./components/weather-card";
import { isEqual, get, map, cloneDeep, isEmpty } from "lodash";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import moment from "moment";
import { computeTemp } from "./utils";
import EmptyData from "./components/empty-data";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const defaultCoordinate = {
    country: "Unknown",
    lat: 0,
    local_names: "Unknown",
    lon: 0,
    name: "Unknown",
};

const tempTypeEnums = {
    C: "C",
    F: "F",
};

function App(): JSX.Element {
    const [tempType, setTempType] = useState<string>(tempTypeEnums.F);
    const [color] = useState<string>("#ffffff");
    const [loading, setLoading] = useState<boolean>(true);
    const [coordinate, setCoordinate] = useState(defaultCoordinate);
    const [weatherData, setWeatherData] = useState({});
    const [mainData, setMainData] = useState({});

    const fetchLocationLatLong = (value: string) => {
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_OPEN_WEATHER_API}`, {
                params: {
                    q: value,
                    limit: 5,
                    appid: process.env.REACT_APP_OPEN_WEATHER_MAP_KEY,
                },
            })
            .then((response) => {
                const { data } = response;
                setCoordinate({ ...data[0] });
            })
            .catch((error) => {
                console.log("error", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getWeather = (lat: number, lon: number) => {
        setLoading(true);
        axios
            .get(`https://api.openweathermap.org/data/2.5/onecall?`, {
                params: {
                    lat,
                    lon,
                    exclude: "alerts",
                    appid: process.env.REACT_APP_OPEN_WEATHER_MAP_KEY,
                },
            })
            .then((response) => {
                const { data } = response;
                setWeatherData({
                    current: data.current,
                    daily: data.daily,
                    timezone: data.timezone,
                    timezone_offset: data.timezone_offset,
                });
                setMainData({ ...data.current });
            })
            .catch((error) => {
                setWeatherData({});
                setMainData({});
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onSearchLocation = (value: string) => {
        fetchLocationLatLong(value);
    };

    useEffect(() => {
        fetchLocationLatLong("hanoi");
    }, []);

    useEffect(() => {
        if (!isEqual(coordinate, defaultCoordinate))
            getWeather(coordinate.lat, coordinate.lon);
    }, [coordinate]);

    const handleChangeTempType = (value: string) => {
        setTempType(value);
    };

    const handleOnClickWeatherCar = (data: object) => {
        const newData = cloneDeep({ ...data, isSubData: true });
        setMainData(newData);
    };

    console.log("isEmpty(weatherData)", isEmpty(weatherData));
    console.log("weatherData", weatherData);

    return (
        <div className="App">
            <div>
                <div className="search-input">
                    <Search onSearch={onSearchLocation} />
                </div>
                {loading ? (
                    <ClipLoader
                        color={color}
                        loading={loading}
                        css={override}
                        size={150}
                    />
                ) : isEmpty(weatherData) ? (
                    <EmptyData />
                ) : (
                    <div className="weather-details">
                        <div className="main-info">
                            <p className="location">
                                {coordinate.name}, {coordinate.country}
                            </p>
                            <p className="h-32 main-weather">
                                {!isEmpty(mainData)
                                    ? `${moment
                                          .unix(get(mainData, "dt"))
                                          .locale(get(weatherData, "timezone"))
                                          .format("dddd")} ${
                                          !get(mainData, "isSubData")
                                              ? moment
                                                    .unix(get(mainData, "dt"))
                                                    .locale(
                                                        get(
                                                            weatherData,
                                                            "timezone"
                                                        )
                                                    )
                                                    .format("H:mm A")
                                              : ""
                                      }`
                                    : ""}
                                &nbsp;•{" "}
                                {!isEmpty(mainData) &&
                                    get(mainData, "weather[0].description")}
                            </p>
                            <div className="display-flex">
                                <div className="right-content">
                                    <img
                                        src={
                                            !isEmpty(mainData)
                                                ? `${
                                                      process.env
                                                          .REACT_APP_OPEN_WEATHER_ICON
                                                  }${get(
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
                                            !isEmpty(mainData) &&
                                            !get(mainData, "isSubData")
                                                ? computeTemp(
                                                      get(mainData, "temp"),
                                                      tempType
                                                  )
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
                                        {!isEmpty(mainData) &&
                                            get(mainData, "humidity")}
                                        %
                                    </p>
                                    <p>
                                        Wind:{" "}
                                        {!isEmpty(mainData) &&
                                            get(mainData, "wind_speed")}
                                        &nbsp;KPH SE
                                    </p>
                                    {!isEmpty(mainData) &&
                                    !get(mainData, "isSubData") ? (
                                        <p>Air Quality: Like Shit</p>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="weather-weekdays">
                            {weatherData && get(weatherData, "daily") ? (
                                map(get(weatherData, "daily"), (item) => (
                                    <WeatherCard
                                        key={item.dt}
                                        item={item}
                                        timezone={get(weatherData, "timezone")}
                                        tempType={tempType}
                                        handleOnClickWeatherCar={
                                            handleOnClickWeatherCar
                                        }
                                    />
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
