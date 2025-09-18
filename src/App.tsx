import { useState } from "react";
import "./App.css";

type Weather = { city: string; temperature: string; weather: string; humidity: string; wind: string; };

export default function App() {
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Weather | null>(null);
    const [error, setError] = useState("");

    const fetchWeather = async () => {
        if (!city.trim()) return;
        setLoading(true); setError(""); setData(null);
        try {
            const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
            if (!res.ok) throw new Error(await res.text());
            const json: Weather = await res.json();
            setData(json);
        } catch (e: any) { setError(e?.message || "Request failed"); }
        finally { setLoading(false); }
    };

    return (
        <div className="container">
            <h1>Weather Forecast</h1>
            <form onSubmit={(e)=>{e.preventDefault(); fetchWeather();}} className="form">
                <input className="input" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Enter city..." />
                <button className="button" type="submit" disabled={loading}>{loading ? "Loading..." : "Check"}</button>
            </form>
            {error && <p className="error">⚠️ {error}</p>}
            {data && (
                <div className="card">
                    <h2>🌤️ {data.city}</h2>
                    <p><strong>Temperature:</strong> {data.temperature}°C</p>
                    <p><strong>Condition:</strong> {data.weather}</p>
                    <p><strong>Humidity:</strong> {data.humidity}%</p>
                    <p><strong>Wind:</strong> {data.wind} km/h</p>
                </div>
            )}
        </div>
    );
}
