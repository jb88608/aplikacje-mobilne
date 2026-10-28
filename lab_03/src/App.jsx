
import { useState, useEffect } from 'react';
import { fetchWeather } from './api/fetchWeather.js';
import './App.css';

function App() {
  const [query, setQuery] = useState('');

  const [weather, setWeather] = useState(() => {
    try {
      const savedWeather = localStorage.getItem('lastWeather');
      return savedWeather ? JSON.parse(savedWeather) : null;
    } catch {
      return null;
    }
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const search = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    if (!navigator.onLine) {
      setError('Brak połączenia z internetem. Pokazuję ostatnio pobrane dane.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await fetchWeather(query);

      setWeather(data);

      try {
        localStorage.setItem('lastWeather', JSON.stringify(data));
      } catch (storageError) {
        console.warn('Nie udało się zapisać danych pogody:', storageError);
      }

      setQuery('');
    } catch (err) {
      setError(err.message || 'Nie udało się pobrać danych pogodowych.');
    } finally {
      setLoading(false);
    }
  };

  const getWindDirection = (deg) => {
    const directions = [
      'N', 'NE', 'E', 'SE',
      'S', 'SW', 'W', 'NW'
    ];

    return directions[Math.round(deg / 45) % 8];
  };

  return (
    <div className="main-container">

      <form onSubmit={search}>
        <input
          type="text"
          className="search"
          placeholder="Wpisz miasto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {!isOnline && (
        <p className="offline-message" role="status">
          Brak połączenia — pokazuję ostatnio pobrane dane.
        </p>
      )}

      {loading && (
        <p className="message">Pobieranie danych...</p>
      )}

      {error && (
        <p className="message error">{error}</p>
      )}

      {weather && (
        <div className="city">

          <h2 className="city-name">
            <span className="city-temp">
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup>
            </span>

            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>

            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />

            <p>{weather.weather[0].description}</p>
          </h2>

          {weather.dt != null && (
            <p className="weather-updated">
              Ostatni pomiar:{' '}
              {new Date(weather.dt * 1000).toLocaleTimeString('pl-PL', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          )}

          <div className="weather-details">

            <p>
              Ciśnienie
              <strong>{weather.main.pressure} hPa</strong>
            </p>

            <p>
              Wilgotność
              <strong>{weather.main.humidity}%</strong>
            </p>

            {weather.wind?.speed != null && (
              <p>
                Prędkość wiatru
                <strong>{weather.wind.speed} m/s</strong>
              </p>
            )}

            {weather.wind?.gust != null && (
              <p>
                Porywy wiatru
                <strong>{weather.wind.gust} m/s</strong>
              </p>
            )}

            {weather.wind?.deg != null && (
              <p>
                Kierunek wiatru
                <strong>
                  {weather.wind.deg}° ({getWindDirection(weather.wind.deg)})
                </strong>
              </p>
            )}

          </div>
        </div>
      )}

      {!weather && !loading && !error && !isOnline && (
        <p className="message">
          Brak zapisanych danych pogodowych. Połącz się z internetem,
          aby wyszukać miasto.
        </p>
      )}

    </div>
  );
}

export default App;
