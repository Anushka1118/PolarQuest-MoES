import { NextRequest, NextResponse } from 'next/server';
import { POLAR_STATIONS } from '@/lib/stations';

export interface TelemetryData {
  stationId: string;
  stationName: string;
  region: string;
  temperature: number;
  windSpeed: number;
  pressure: number;
  humidity: number;
  weatherCode: number;
  conditionText: string;
  timestamp: string;
  isLive: boolean;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const stationId = searchParams.get('stationId') || 'bharati-antarctica';

  const station = POLAR_STATIONS.find(s => s.id === stationId) || POLAR_STATIONS[1];

  try {
    const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${station.latitude}&longitude=${station.longitude}&current=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m,weather_code`;

    const response = await fetch(openMeteoUrl, {
      next: { revalidate: 300 }, // cache for 5 minutes
      headers: { 'User-Agent': 'PolarQuest-MoES-App/1.0' }
    });

    if (response.ok) {
      const data = await response.json();
      const current = data.current;

      const weatherCondition = getWeatherConditionText(current.weather_code, current.temperature_2m);

      const telemetry: TelemetryData = {
        stationId: station.id,
        stationName: station.name,
        region: station.region,
        temperature: Math.round(current.temperature_2m * 10) / 10,
        windSpeed: Math.round(current.wind_speed_10m * 10) / 10,
        pressure: Math.round(current.surface_pressure),
        humidity: current.relative_humidity_2m || 75,
        weatherCode: current.weather_code || 0,
        conditionText: weatherCondition,
        timestamp: new Date().toISOString(),
        isLive: true,
      };

      return NextResponse.json(telemetry);
    }
  } catch (err) {
    console.warn(`Open-Meteo telemetry fetch failed for ${station.name}, utilizing simulated live fallback:`, err);
  }

  // Realistic Fallback Telemetry
  let fallbackTemp = -18.4;
  let fallbackWind = 24.5;
  let fallbackPressure = 984;

  if (station.region === 'Arctic') {
    fallbackTemp = -4.2;
    fallbackWind = 14.2;
    fallbackPressure = 1008;
  } else if (station.region === 'Himalayas') {
    fallbackTemp = -12.1;
    fallbackWind = 18.0;
    fallbackPressure = 620; // high elevation pressure drop
  }

  // Slight jitter for dynamic realism
  const jitterTemp = Math.round((fallbackTemp + (Math.random() * 2 - 1)) * 10) / 10;
  const jitterWind = Math.round((fallbackWind + (Math.random() * 4 - 2)) * 10) / 10;

  const fallbackTelemetry: TelemetryData = {
    stationId: station.id,
    stationName: station.name,
    region: station.region,
    temperature: jitterTemp,
    windSpeed: jitterWind,
    pressure: fallbackPressure,
    humidity: 78,
    weatherCode: 71,
    conditionText: 'Blizzard & Polar Winds',
    timestamp: new Date().toISOString(),
    isLive: false,
  };

  return NextResponse.json(fallbackTelemetry);
}

function getWeatherConditionText(code: number, temp: number): string {
  if (code === 0) return temp < 0 ? 'Clear & Freezing' : 'Clear Sky';
  if (code >= 1 && code <= 3) return 'Partly Cloudy';
  if (code >= 71 && code <= 77) return 'Snow Fall';
  if (code >= 85 && code <= 86) return 'Heavy Snow Showers';
  if (code >= 95) return 'Severe Polar Storm';
  return 'Polar Overcast';
}
