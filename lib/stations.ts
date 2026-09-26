export interface Station {
  id: string;
  name: string;
  region: 'Antarctica' | 'Arctic' | 'Himalayas';
  latitude: number;
  longitude: number;
  elevation: string;
  established: number;
  status: 'active' | 'seasonal' | 'upgrading';
  description: string;
  researchFocus: string[];
  image: string;
}

export const POLAR_STATIONS: Station[] = [
  {
    id: 'maitri-antarctica',
    name: 'Maitri',
    region: 'Antarctica',
    latitude: -70.7,
    longitude: 11.7,
    elevation: '117 m',
    established: 1989,
    status: 'active',
    description: 'Indias second permanent Antarctic station situated in the ice-free Schirmacher Oasis. Equipped with geomagnetic, meteorological, and glaciological observatories.',
    researchFocus: ['Geomagnetism', 'Meteorology', 'Glaciology', 'Environmental Biology'],
    image: 'https://images.unsplash.com/photo-1517783999520-f068d7431a60?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bharati-antarctica',
    name: 'Bharati',
    region: 'Antarctica',
    latitude: -69.4,
    longitude: 76.2,
    elevation: '35 m',
    established: 2012,
    status: 'active',
    description: 'Indias third and latest ultra-modern Antarctic station at Larsemann Hills. Constructed using 134 shipping containers, offering high-precision satellite telemetry and oceanographic research.',
    researchFocus: ['Continental Breakup', 'Oceanography', 'Satellite Remote Sensing', 'Lichen Biodiversity'],
    image: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'himadri-arctic',
    name: 'Himadri',
    region: 'Arctic',
    latitude: 78.9,
    longitude: 11.9,
    elevation: '12 m',
    established: 2008,
    status: 'active',
    description: 'Indias pioneer Arctic research station located at International Research Complex, Ny-Ålesund, Svalbard, Norway (780 km from North Pole). Focuses on fjord dynamics and atmospheric chemistry.',
    researchFocus: ['Fjord Hydrodynamics', 'Aerosol Forcing', 'Arctic Flora Biology', 'Cryosphere Mass Balance'],
    image: 'https://images.unsplash.com/photo-1548263594-a71ea65a8598?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'himansh-himalayas',
    name: 'Himansh',
    region: 'Himalayas',
    latitude: 32.4,
    longitude: 77.6,
    elevation: '4,000 m',
    established: 2016,
    status: 'active',
    description: 'Indias high-altitude glaciological station situated at Sutri Dhaka in Lahaul & Spiti, Himachal Pradesh. Monitors Himalayan glacier retreat and meltwater hydrology (The Third Pole).',
    researchFocus: ['Glacial Mass Balance', 'Debris Cover Thermal Properties', 'Meltwater Hydrology', 'Snow Density Dynamics'],
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
  }
];
