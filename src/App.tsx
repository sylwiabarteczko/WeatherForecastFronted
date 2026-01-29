import { useState } from "react";
import "./App.scss";
import WeatherIcon from "./components/WeatherIcon";

type Hourly = { time: string; tempC: string; condition: string; chanceOfRain: string };
type Daily = { date: string; minTempC: string; maxTempC: string; condition: string; chanceOfRain: string };

type Weather = {
    city: string;
    temperature: string;
    weather: string;
    humidity: string;
    wind: string;
    hourly: Hourly[];
    daily: Daily[];
};

export default function App() {
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Weather | null>(null);
    const [error, setError] = useState("");

    const fetchWeather = async () => {
        const q = city.trim();
        if (!q) return;

        setLoading(true);
        setError("");
        setData(null);

        try {
            const res = await fetch(`/api/weather/forecast?city=${encodeURIComponent(q)}&days=3`);
            if (!res.ok) throw new Error(await res.text());
            const json: Weather = await res.json();
            setData(json);
        } catch (e: any) {
            setError(e?.message || "Request failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <header className="topbar">
                <h1 className="title">Weather Forecast</h1>

                <form
                    className="search"
                    onSubmit={(e) => {
                        e.preventDefault();
                        fetchWeather();
                    }}
                >
                    <input
                        className="searchInput"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Search city..."
                    />
                    <button className="searchBtn" type="submit" disabled={loading}>
                        {loading ? "Loading..." : "Search"}
                    </button>
                </form>
            </header>

            {error && <div className="alert">⚠️ {error}</div>}

            {!data && !error && (
                <div className="empty">
                    Type a city and press <b>Search</b>.
                </div>
            )}

            {data && (
                <>
                    <div className="card">
                        <div className="cardRow">
                            <WeatherIcon conditionText={data.weather} />

                            <div>
                                <h2 className="city">{data.city}</h2>
                                <div className="temp">{data.temperature}°C</div>
                                <div className="cond">{data.weather}</div>

                                <div className="meta">
                                    <div><span>Humidity</span><b>{data.humidity}%</b></div>
                                    <div><span>Wind</span><b>{data.wind} km/h</b></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {data.hourly?.length > 0 && (
                        <section className="section">
                            <h3 className="sectionTitle">Next hours</h3>
                            <div className="grid">
                                {data.hourly.map((h, idx) => (
                                    <div className="miniCard" key={idx}>
                                        <div className="miniTop">
                                            <div className="miniTime">{h.time}</div>
                                            <div className="miniTemp">{h.tempC}°C</div>
                                        </div>
                                        <div className="miniCond">{h.condition}</div>
                                        <div className="miniMeta">
                                            <span>Rain</span>
                                            <b>{h.chanceOfRain}%</b>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {data.daily?.length > 0 && (
                        <section className="section">
                            <h3 className="sectionTitle">Next days</h3>
                            <div className="grid">
                                {data.daily.map((d, idx) => (
                                    <div className="miniCard" key={idx}>
                                        <div className="miniTop">
                                            <div className="miniTime">{d.date}</div>
                                            <div className="miniTemp">
                                                {d.minTempC}–{d.maxTempC}°C
                                            </div>
                                        </div>
                                        <div className="miniCond">{d.condition}</div>
                                        <div className="miniMeta">
                                            <span>Rain</span>
                                            <b>{d.chanceOfRain}%</b>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </>
            )}
        </div>
    );
}