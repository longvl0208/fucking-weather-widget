import axios, { AxiosPromise } from "axios";
import { TempTypeEnums } from "../enums";
import { REACT_APP_AIR_POPULATION_DATA_API, REACT_APP_GET_WEATHER_API, REACT_APP_OPEN_WEATHER_MAP_KEY } from "../utils";

class WeatherDataService {
    public getAirPopulationData = (lat: number, lon: number): AxiosPromise => {
        return axios
            .get(`${REACT_APP_AIR_POPULATION_DATA_API}`, {
                params: {
                    lat,
                    lon,
                    appid: REACT_APP_OPEN_WEATHER_MAP_KEY,
                },
            })

    };

    public getWeatherData = (lat: number, lon: number, tempType: TempTypeEnums): AxiosPromise => {

        return axios
            .get(`${REACT_APP_GET_WEATHER_API}`, {
                params: {
                    lat,
                    lon,
                    exclude: "alerts",
                    units: tempType === TempTypeEnums.F ? "imperial" : "metric",
                    appid: REACT_APP_OPEN_WEATHER_MAP_KEY,
                },
            })

    };
}

export default new WeatherDataService()