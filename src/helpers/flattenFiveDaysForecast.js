export default function flattenFiveDaysForecast(fiveDaysForecast) {
  const dailyForecastFlattened = fiveDaysForecast.map(
    ({
      Date: date,
      Temperature: {
        Minimum: {Value: dValue, Unit: dUnit},
        Maximum: {Value: nValue, Unit: nUnit},
      },
      Day: {Icon: dIcon, IconPhrase: dIconPhrase},
      Night: {Icon: nIcon, IconPhrase: nIconPhrase},
    }) => {
      return {
        date,
        dValue,
        dUnit,
        nValue,
        nUnit,
        dIcon,
        dIconPhrase,
        nIcon,
        nIconPhrase,
      };
    }
  );
  return dailyForecastFlattened;
}
