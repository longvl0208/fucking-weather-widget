import React, { useState, useEffect, useMemo } from "react";
import "./App.scss";
import Search from "./components/search";
import { AxiosError, AxiosResponse } from "axios";
import { isEqual, cloneDeep, isEmpty, get } from "./utils";
import EmptyData from "./components/empty-data";
import LoadingSpinner from "./components/loading-spinner";
import MainInfo from "./components/main-info";
import WeatherInWeek from "./components/weather-in-week";
import { AirQuality, TempTypeEnums } from "./enums";
import LocationService from "./services/location";
import WeatherDataService from "./services/weather";

function App(): JSX.Element {
    const [tempType, setTempType] = useState<TempTypeEnums>(TempTypeEnums.F);
    const [loading, setLoading] = useState<boolean>(true);
    const [coordinate, setCoordinate] = useState<LocationLatLongResponse>();
    const [weatherData, setWeatherData] = useState<
        Partial<WeatherDataResponse>
    >({});
    const [mainData, setMainData] = useState<Current | {}>({});
    const [airPopulate, setAirPopulate] = useState<number>(0);

    const fetchLocationLatLong = (value: string): void => {
        setLoading(true);
        setTempType(TempTypeEnums.F);
        LocationService.getLocation(value)
            .then(
                (response: AxiosResponse<LocationLatLongResponse[]>): void => {
                    const { data } = response;
                    setCoordinate({ ...data[0] });
                }
            )
            .catch((error: AxiosError): void => {
                console.log("error", error);
            })
            .finally((): void => {
                setLoading(false);
            });
    };

    const getCurrentAirPopulationData = (lat: number, lon: number): void => {
        WeatherDataService.getAirPopulationData(lat, lon)
            .then((response: AxiosResponse<AirPollutionResponse>): void => {
                const { data } = response;
                setAirPopulate(data.list[0].main.aqi);
            })
            .catch((error: AxiosError): void => {
                console.log("error", error);
            })
            .finally((): void => {
                setLoading(false);
            });
    };

    const getWeather = (lat: number, lon: number): void => {
        setLoading(true);
        WeatherDataService.getWeatherData(lat, lon, tempType)
            .then((response: AxiosResponse<WeatherDataResponse>): void => {
                const { data } = response;
                getCurrentAirPopulationData(lat, lon);
                setWeatherData({
                    current: data.current,
                    daily: data.daily,
                    timezone: data.timezone,
                    timezone_offset: data.timezone_offset,
                });
                setMainData({ ...data.current });
            })
            .catch((error: AxiosError): void => {
                setWeatherData({});
                setMainData({});
            })
            .finally((): void => {
                setLoading(false);
            });
    };

    const onSearchLocation = (value: string): void => {
        fetchLocationLatLong(value);
    };

    useEffect((): void => {
        fetchLocationLatLong("hanoi");
    }, []);

    useEffect((): void => {
        if (!isEqual(coordinate, {}))
            getWeather(get(coordinate, "lat", 0), get(coordinate, "lon", 0));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coordinate]);

    const handleChangeTempType = (value: TempTypeEnums): void => {
        setTempType(value);
    };

    const handleOnClickWeatherCard = (data: Daily): void => {
        const newData = cloneDeep({ ...data, isSubData: true });
        setMainData(newData);
    };

    const calculateAirQuality = useMemo((): AirQuality | undefined => {
        const aqi = airPopulate;
        switch (aqi) {
            case 1:
                return AirQuality.Good;
            case 2:
                return AirQuality.Fair;
            case 3:
                return AirQuality.Moderate;
            case 4:
                return AirQuality.Poor;
            case 5:
                return AirQuality.VeryPoor;

            default:
                break;
        }
    }, [airPopulate]);

    return (
        <div className="App">
            <div>
                <Search onSearch={onSearchLocation} />
                {loading ? (
                    <LoadingSpinner loading={loading} />
                ) : isEmpty(weatherData) ? (
                    <EmptyData />
                ) : (
                    <div className="weather-details">
                        <MainInfo
                            calculateAirQuality={calculateAirQuality}
                            coordinate={coordinate}
                            handleChangeTempType={handleChangeTempType}
                            mainData={mainData}
                            tempType={tempType}
                            weatherData={weatherData}
                        />
                        <WeatherInWeek
                            handleOnClickWeatherCard={handleOnClickWeatherCard}
                            weatherData={weatherData}
                            tempType={tempType}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
