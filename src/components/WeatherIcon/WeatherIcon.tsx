import "./WeatherIcon.scss";

type Props = {
    conditionText: string;
};

function normalize(s: string) {
    return (s || "").toLowerCase();
}

function mapConditionToIcon(conditionText: string) {
    const t = normalize(conditionText);

    if (t.includes("thunder") || t.includes("storm")) return "thundery";
    if (t.includes("rain") || t.includes("drizzle") || t.includes("shower")) return "rainy";
    if (t.includes("overcast") || t === "cloudy") return "cloudy";
    if (t.includes("partly") || t.includes("scattered")) return "partly_cloudy";
    if (t.includes("sun") || t.includes("clear")) return "sunny";

    return "cloudy";
}

export default function WeatherIcon({ conditionText }: Props) {
    const icon = mapConditionToIcon(conditionText);

    if (icon === "sunny") return <div className="sunny" aria-label="Sunny" />;

    if (icon === "partly_cloudy") {
        return (
            <div className="partly_cloudy" aria-label="Partly cloudy">
                <div className="partly_cloudy__sun" />
                <div className="partly_cloudy__cloud" />
            </div>
        );
    }

    if (icon === "cloudy") return <div className="cloudy" aria-label="Cloudy" />;

    if (icon === "rainy") {
        return (
            <div className="rainy" aria-label="Rainy">
                <div className="rainy__cloud" />
                <div className="rainy__rain" />
            </div>
        );
    }

    return (
        <div className="thundery" aria-label="Thundery">
            <div className="thundery__cloud" />
            <div className="thundery__rain" />
        </div>
    );
}