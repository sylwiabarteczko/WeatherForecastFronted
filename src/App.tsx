import { useState } from "react";
import "./App.scss";
import WeatherWidget from "./components/WeatherWidget/WeatherWidget";

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

function roundNumberString(value: string): string {
    const n = Number(String(value).replace(",", "."));
    if (Number.isNaN(n)) return value;
    return String(Math.round(n));
}

function roundFromText(value: string): string {
    const match = String(value).match(/-?\d+([.,]\d+)?/);
    if (!match) return value;
    const n = Number(match[0].replace(",", "."));
    if (Number.isNaN(n)) return value;
    return String(Math.round(n));
}

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

            const normalized: Weather = {
                ...json,
                temperature: roundNumberString(json.temperature),
                humidity: roundFromText(json.humidity),
                wind: roundFromText(json.wind),

                hourly: (json.hourly ?? []).map((h) => ({
                    ...h,
                    tempC: roundNumberString(h.tempC),
                    chanceOfRain: roundFromText(h.chanceOfRain),
                })),

                daily: (json.daily ?? []).map((d) => ({
                    ...d,
                    minTempC: roundNumberString(d.minTempC),
                    maxTempC: roundNumberString(d.maxTempC),
                    chanceOfRain: roundFromText(d.chanceOfRain),
                })),
            };

            setData(normalized);
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
                    <WeatherWidget data={data} />

                    {data.hourly?.length > 0 && (
                        <section className="section">
                            <h3 className="sectionTitle">Next hours</h3>
                            <div className="grid">
                                {data.hourly.map((h, idx) => (
                                    <div className="miniCard" key={idx}>
                                        <div className="miniTop">
                                            <div className="miniTime">{h.time}</div>
                                            <div className="miniTemp">{Math.round(Number(h.tempC))}°C</div>
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
