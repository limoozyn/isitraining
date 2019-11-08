export default function weatherIconUrl(index) {
  const indexStr = index < 10 ? `0${index}` : `${index}`;
  return `https://developer.accuweather.com/sites/default/files/${indexStr}-s.png`;
}
