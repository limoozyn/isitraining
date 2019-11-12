export default function flattentCurrentConditions(cc) {
  const result = {};
  if (!cc) return result;
  const {
    WeatherIcon,
    WeatherText,
    Temperature: {
      Metric: {Value, Unit},
    },
  } = cc[0];
  result.WeatherIcon = WeatherIcon;
  result.WeatherText = WeatherText;
  result.TempValue = Value;
  result.Unit = Unit;
  return result;
}
