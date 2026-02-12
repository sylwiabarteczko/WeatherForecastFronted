import "./WeatherWidget.scss";
import WeatherIcon from "../WeatherIcon/WeatherIcon";


type Weather = {
    city: string;
    temperature: string;
    weather: string;
    humidity: string;
    wind: string;
};

type Props = {
    data: Weather;
};

export default function WeatherWidget({ data }: Props) {
    return (
        <div className="weatherWidget">
            <div className="weatherWidget__top">
                <WeatherIcon conditionText={data.weather} />

                <div className="weatherWidget__main">
                    <h2 className="weatherWidget__city">{data.city}</h2>
                    <div className="weatherWidget__temp">
                        {Math.round(Number(data.temperature))}°C
                    </div>
                    <div className="weatherWidget__cond">{data.weather}</div>
                </div>
            </div>

            <div className="weatherWidget__meta">
                <div>
                    <span>Humidity</span>
                    <b>{data.humidity}%</b>
                </div>
                <div>
                    <span>Wind</span>
                    <b>{data.wind} km/h</b>
                </div>
            </div>
        </div>
    );
}
