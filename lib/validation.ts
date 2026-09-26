import { z } from 'zod';

// Zod Schema for Extracted Scientific Paper Metadata
export const ExtractedPaperSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  leadResearcher: z.string().min(3, 'Lead researcher name is required'),
  station: z.string().min(2, 'Station name is required'),
  latitude: z.number().min(-90).max(90, 'Latitude must be between -90 and +90'),
  longitude: z.number().min(-180).max(180, 'Longitude must be between -180 and +180'),
  expeditionYear: z.number().int().min(1950).max(2030, 'Expedition year must be between 1950 and 2030'),
  discipline: z.string().min(3, 'Scientific discipline is required'),
  abstract: z.string().min(20, 'Abstract must be at least 20 characters'),
  keyFindings: z.array(z.string()).min(1, 'At least one key finding is required'),
});

export type ExtractedPaperData = z.infer<typeof ExtractedPaperSchema>;

// Geographic Coordinate Validation Rules per Station Region
export interface BoundaryValidationResult {
  isValid: boolean;
  stationMatched: string;
  expectedRegion: string;
  errors: string[];
}

export function validateCoordinatesForStation(
  stationName: string,
  lat: number,
  lng: number
): BoundaryValidationResult {
  const errors: string[] = [];
  const normalizedStation = stationName.trim().toLowerCase();

  if (normalizedStation.includes('maitri') || normalizedStation.includes('bharati')) {
    // Expected: Antarctica (Latitude between -90 and -60)
    if (lat > -60) {
      errors.push(`Antarctic station ${stationName} expected Southern latitude (Lat < -60°), but received Lat: ${lat}°`);
    }
  } else if (normalizedStation.includes('himadri')) {
    // Expected: Arctic (Latitude > +60)
    if (lat < 60) {
      errors.push(`Arctic station Himadri expected Northern High latitude (Lat > +60°), but received Lat: ${lat}°`);
    }
  } else if (normalizedStation.includes('himansh')) {
    // Expected: Himalayas (Latitude between 25 and 40, Longitude between 70 and 95)
    if (lat < 25 || lat > 40 || lng < 70 || lng > 95) {
      errors.push(`Himalayan station Himansh expected Lat [25°-40°] & Long [70°-95°], but received Lat: ${lat}°, Long: ${lng}°`);
    }
  }

  return {
    isValid: errors.length === 0,
    stationMatched: stationName,
    expectedRegion: normalizedStation.includes('himadri')
      ? 'Arctic'
      : normalizedStation.includes('himansh')
      ? 'Himalayas'
      : 'Antarctica',
    errors,
  };
}
