import isEqual from "lodash/isEqual";
import get from "lodash/get";
import map from "lodash/map";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import unix from "moment/moment";

const REACT_APP_OPEN_WEATHER_MAP_KEY =
    process.env.REACT_APP_OPEN_WEATHER_MAP_KEY;
const REACT_APP_OPEN_WEATHER_API = process.env.REACT_APP_OPEN_WEATHER_API;
const REACT_APP_AIR_POPULATION_DATA_API =
    process.env.REACT_APP_AIR_POPULATION_DATA_API;
const REACT_APP_GET_WEATHER_API = process.env.REACT_APP_GET_WEATHER_API;

const fToC = (temp: number) => {
    // T(°C) = (T(°F) - 32) × 5/9
    return Math.round(((temp - 32) * 5) / 9);
};

const computeTemp = (value: number, tempType: string) => {
    return tempType === "C" ? fToC(value) : value;
};

export {
    isEmpty,
    computeTemp,
    fToC,
    cloneDeep,
    map,
    get,
    isEqual,
    unix,
    REACT_APP_OPEN_WEATHER_MAP_KEY,
    REACT_APP_OPEN_WEATHER_API,
    REACT_APP_AIR_POPULATION_DATA_API,
    REACT_APP_GET_WEATHER_API
};
