import axios, { AxiosPromise } from "axios";

const REACT_APP_OPEN_WEATHER_MAP_KEY =
    process.env.REACT_APP_OPEN_WEATHER_MAP_KEY;

class LocationService {
    public getLocation = (value: string): AxiosPromise => {
        return axios
            .get(`${process.env.REACT_APP_OPEN_WEATHER_API}`, {
                params: {
                    q: value,
                    limit: 5,
                    appid: REACT_APP_OPEN_WEATHER_MAP_KEY,
                },
            })

    };
}

export default new LocationService();