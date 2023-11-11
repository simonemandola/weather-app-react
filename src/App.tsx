import MainWeatherData from "./components/MainWeatherData";
import TopBar from "./components/TopBar";
import HourlyWeatherData from "./components/HourlyWeatherData.tsx";
import DailyWeatherData from "./components/DailyWeatherData.tsx";
import GraphTemperature from "./components/GraphTemperature.tsx";
import HourlyDetailsData from "./components/HourlyDetailsData.tsx";
import MoreDetailsData from "./components/MoreDetailsData.tsx";

export default function App() {
  return (
    <>
        <TopBar />
        <MainWeatherData />
        <HourlyWeatherData />
        <GraphTemperature />
        <HourlyDetailsData />
        <DailyWeatherData />
        <MoreDetailsData />
    </>
  )
}
