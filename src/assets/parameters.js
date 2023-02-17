import WindIcon from "../assets/Wind.png";
import VisibilityIcon from "../assets/Rainbow.png";
import PrecipitationIcon from "../assets/Cloud.png";
import PressureIcon from "../assets/Temperature half.png";
import HumidityIcon from "../assets/Raindrops.png";
import UVIcon from "../assets/Sun.png";

const parameters = [
  { variable: "humidity", name: "Humidity", icon: HumidityIcon, unit: "" },
  { variable: "uv", name: "UV", icon: UVIcon, unit: "" },
  { variable: "wind_kph", name: "Wind", icon: WindIcon, unit: "kph" },
  {
    variable: "vis_km",
    name: "Visibility",
    icon: VisibilityIcon,
    unit: "km",
  },
  {
    variable: "precip_mm",
    name: "Precipitation",
    icon: PrecipitationIcon,
    unit: "mm",
  },
  {
    variable: "pressure_mb",
    name: "Pressure",
    icon: PressureIcon,
    unit: "mb",
  },
];

export default parameters;
