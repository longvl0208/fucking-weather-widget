
interface LocalNames {
    ar: string;
    ascii: string;
    az: string;
    bg: string;
    ca: string;
    da: string;
    de: string;
    el: string;
    en: string;
    eu: string;
    fa: string;
    feature_name: string;
    fi: string;
    fr: string;
    he: string;
    hi: string;
    hu: string;
    id: string;
    it: string;
    ja: string;
    lt: string;
    mk: string;
    nl: string;
    no: string;
    pl: string;
    pt: string;
    ru: string;
    sk: string;
    sl: string;
    sr: string;
    th: string;
    tr: string;
    vi: string;
}

interface LocationLatLongResponse {
    name: string;
    local_names: LocalNames;
    lat: number;
    lon: number;
    country: string;
}


interface Coord {
    lon: number;
    lat: number;
}

interface Main {
    aqi: number;
}

interface AirPollutionComponents {
    co: number;
    no: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
}

interface ListAirPollution {
    main: Main;
    components: AirPollutionComponents;
    dt: number;
}

interface AirPollutionResponse {
    coord: Coord;
    list: ListAirPollution[];
}



interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Current {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: Weather[];
    isSubData: boolean
}

interface Minutely {
    dt: number;
    precipitation: number;
}

interface Weather2 {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Rain {
    '1h': number;
}

interface Hourly {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: Weather2[];
    pop: number;
    rain: Rain;
}

interface Temp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

interface FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
}

interface Weather3 {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Daily {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: Temp;
    feels_like: FeelsLike;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    weather: Weather3[];
    clouds: number;
    pop: number;
    uvi: number;
    rain?: number;
}

interface WeatherDataResponse {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: Current;
    minutely: Minutely[];
    hourly: Hourly[];
    daily: Daily[];
}









