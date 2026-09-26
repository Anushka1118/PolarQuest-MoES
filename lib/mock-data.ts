export interface ResearchRecord {
  id: string;
  station_id: string;
  station_name: string;
  created_by: string;
  title: string;
  author: string;
  discipline: string;
  expedition_year: number;
  abstract: string;
  key_findings: string[];
  latitude: number;
  longitude: number;
  file_url: string;
  status: 'draft' | 'pending_review' | 'published' | 'rejected';
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

export interface MediaPost {
  id: string;
  record_id: string;
  kids_fact: string;
  social_carousel: {
    slide1: string;
    slide2: string;
    slide3: string;
    hashtags: string[];
  };
  press_release: string;
  created_at: string;
}

export const INITIAL_RESEARCH_RECORDS: ResearchRecord[] = [
  {
    id: 'rec-001',
    station_id: 'bharati-antarctica',
    station_name: 'Bharati',
    created_by: 'researcher-01',
    title: 'Prydz Bay Oceanographic Stratification & Ice Shelf Basal Melting Rate',
    author: 'Dr. Ananya Sharma & MoES Southern Ocean Team',
    discipline: 'Oceanography',
    expedition_year: 2025,
    abstract: 'High-precision CTD hydrographic profiles collected near Larsemann Hills reveal seasonal intrusions of Modified Circumpolar Deep Water (MCDW) into the basal cavity of the Prydz Bay ice shelf. Thermal forcing accounts for an estimated 1.4 m/yr ice shelf basal melt rate.',
    key_findings: [
      'Warm intrusion of MCDW detected at 450m depth in Prydz Bay.',
      'Basal melt rate accelerated by 14% compared to 2018 benchmark data.',
      'Surface phytoplankton blooming correlates with increased glacial iron discharge.'
    ],
    latitude: -69.4,
    longitude: 76.2,
    file_url: '/samples/oceanography_prydz_bay.pdf',
    status: 'published',
    created_at: '2025-11-15T10:30:00Z',
    updated_at: '2025-11-20T14:15:00Z'
  },
  {
    id: 'rec-002',
    station_id: 'maitri-antarctica',
    station_name: 'Maitri',
    created_by: 'researcher-02',
    title: 'Schirmacher Oasis Paleoclimate Lake Sediment Isotope Chronology',
    author: 'Dr. Rajesh Kumar & NCPOR Cryosphere Division',
    discipline: 'Paleoclimatology',
    expedition_year: 2024,
    abstract: 'Sediment cores extracted from Lake Priyadarshini at Schirmacher Oasis provide a 12,000-year continuous isotope record of Holocene climate fluctuations in East Antarctica. Delta-18-O variations reflect warm Medieval Climate Anomaly phases.',
    key_findings: [
      '12,000-year uninterrupted paleoclimate sediment record established.',
      'Distinct isotopic markers identified for Holocene Thermal Maximum.',
      'Cyanobacterial mat lipids indicate historic ice-free summer lake durations.'
    ],
    latitude: -70.7,
    longitude: 11.7,
    file_url: '/samples/schirmacher_lake_sediment.pdf',
    status: 'published',
    created_at: '2024-12-05T09:00:00Z',
    updated_at: '2024-12-10T16:00:00Z'
  },
  {
    id: 'rec-003',
    station_id: 'himadri-arctic',
    station_name: 'Himadri',
    created_by: 'researcher-01',
    title: 'Svalbard Kongsfjorden Atmospheric Black Carbon & Radiative Forcing',
    author: 'Dr. Sunita Deshmukh & Arctic Aerosol Group',
    discipline: 'Atmospheric Physics',
    expedition_year: 2025,
    abstract: 'Aethalometer measurements conducted at Himadri station, Ny-Ålesund, quantify long-range transported black carbon aerosols. Snow albedo reduction of up to 2.1% accelerates spring melt in Kongsfjorden glaciers.',
    key_findings: [
      'Spring aerosol episodes driven by Eurasian biomass burning trajectories.',
      'Black carbon concentrations averaged 48 ng/m³ during peak transport.',
      'Albedo decay model predicts 8 days earlier glacier surface runoff.'
    ],
    latitude: 78.9,
    longitude: 11.9,
    file_url: '/samples/arctic_black_carbon.pdf',
    status: 'published',
    created_at: '2025-08-12T11:20:00Z',
    updated_at: '2025-08-18T13:40:00Z'
  },
  {
    id: 'rec-004',
    station_id: 'himansh-himalayas',
    station_name: 'Himansh',
    created_by: 'researcher-03',
    title: 'Chandra Basin Glacier Mass Balance & Meltwater Discharge Dynamics',
    author: 'Dr. Vikramaditya Singh & Himalayan Cryosphere Unit',
    discipline: 'Glaciology',
    expedition_year: 2025,
    abstract: 'Differential GNSS surveys and automatic weather station telemetry at Sutri Dhaka glacier monitor seasonal ice volume loss. The 2024-2025 net mass balance was negative (-0.82 m w.e./yr), indicating sustained Third Pole ice depletion.',
    key_findings: [
      'Sutri Dhaka glacier retreated by 18.5 meters in the 2024-2025 balance year.',
      'Debris cover thickness above 20cm provides local thermal insulation.',
      'Summer meltwater runoff peak shifted 12 days earlier toward mid-July.'
    ],
    latitude: 32.4,
    longitude: 77.6,
    file_url: '/samples/himansh_glacier_balance.pdf',
    status: 'published',
    created_at: '2025-09-01T08:15:00Z',
    updated_at: '2025-09-05T12:00:00Z'
  }
];

export const MOCK_MEDIA_POSTS: Record<string, MediaPost> = {
  'rec-001': {
    id: 'med-001',
    record_id: 'rec-001',
    kids_fact: 'Did you know? Indian scientists at Bharati Station discovered deep ocean water melting Antarctic ice underwater like a warm hairdryer! 🌊🧊',
    social_carousel: {
      slide1: '❄️ POLAR DISCOVERY: Deep warm ocean currents are reaching Indias Bharati Station in Prydz Bay, Antarctica!',
      slide2: '📊 Thermal measurements reveal an ice melt rate of 1.4 meters per year below the ice shelf surface.',
      slide3: '🔬 MoES researchers are using CTD sensors to track iron discharge that feeds Antarctic ocean life.',
      hashtags: ['#PolarQuest', '#MoES', '#Antarctica', '#ClimateScience', '#BharatiStation']
    },
    press_release: 'FOR IMMEDIATE RELEASE — NEW DELHI: Researchers from the Ministry of Earth Sciences (MoES) working at Bharati Station have published critical findings on Prydz Bay ocean dynamics. Oceanographic profiles reveal intrusions of warm deep water driving an estimated 1.4 m/yr ice melt. The study enhances global ice sheet predictive models.',
    created_at: '2025-11-20T14:30:00Z'
  }
};

// Climate Dataset for Recharts Playground
export const SEA_ICE_EXTENT_DATA = [
  { year: 2000, arctic: 6.25, antarctic: 18.10 },
  { year: 2004, arctic: 5.98, antarctic: 18.45 },
  { year: 2008, arctic: 4.67, antarctic: 18.25 },
  { year: 2012, arctic: 3.39, antarctic: 19.44 },
  { year: 2016, arctic: 4.14, antarctic: 17.82 },
  { year: 2020, arctic: 3.82, antarctic: 18.89 },
  { year: 2024, arctic: 4.28, antarctic: 16.92 },
  { year: 2026, arctic: 4.05, antarctic: 16.55 },
];

export const ICE_CORE_CO2_DATA = [
  { depth: 50, age: 500, co2: 280, tempAnomaly: -0.2 },
  { depth: 150, age: 2500, co2: 275, tempAnomaly: -0.4 },
  { depth: 300, age: 6000, co2: 268, tempAnomaly: +0.1 },
  { depth: 450, age: 10000, co2: 260, tempAnomaly: -0.6 },
  { depth: 600, age: 15000, co2: 220, tempAnomaly: -2.8 },
  { depth: 800, age: 20000, co2: 185, tempAnomaly: -4.5 },
];

export const SAMPLE_PDF_DOCUMENTS = [
  {
    id: 'sample-1',
    name: 'Antarctic_Ice_Sheet_Basal_Melting_2026.pdf',
    size: '2.4 MB',
    station: 'Bharati',
    text: `EXPEDITION REPORT: PRYDZ BAY OCEANOGRAPHY (BHARATI STATION)
Lead Researcher: Dr. Ananya Sharma
Station: Bharati Station (Larsemann Hills, Antarctica)
Coordinates: Latitude -69.4, Longitude 76.2
Expedition Year: 2025
Discipline: Oceanography & Marine Science

Abstract:
This report documents physical oceanography measurements taken from the RV Kilo Moana in the vicinity of Bharati Station. Conductivity-Temperature-Depth (CTD) rosettes deployed down to 800 meters revealed persistent intrusion of Modified Circumpolar Deep Water (+1.2°C) into the sub-ice shelf cavity.

Key Findings:
1. Warm water intrusion at 450m depth causing 1.4m/year ice shelf basal thinning.
2. Increased glacial runoff delivering bio-available iron to marine ecosystems.
3. Recommended continuous mooring deployment at Larsemann Hills.`
  },
  {
    id: 'sample-2',
    name: 'Schirmacher_Oasis_Lake_Sediment_Core.pdf',
    size: '1.8 MB',
    station: 'Maitri',
    text: `PALEOCLIMATE SEDIMENTOLOGY REPORT (MAITRI STATION)
Lead Researcher: Dr. Rajesh Kumar
Station: Maitri Station (Schirmacher Oasis, Antarctica)
Coordinates: Latitude -70.7, Longitude 11.7
Expedition Year: 2024
Discipline: Paleoclimatology & Geology

Abstract:
Piston cores collected from Lake Priyadarshini adjacent to Maitri Station yield high-resolution Holocene climate proxies. Stable isotope delta-18-O analysis reveals major thermal shifts across the past 12,000 years.

Key Findings:
1. Complete 12,000-year lacustrine sediment record obtained.
2. Isotopic signature confirms ice-free conditions during Medieval Warm Period.
3. Organic carbon burial rates correlated with summer solar radiation maxima.`
  },
  {
    id: 'sample-3',
    name: 'Kongsfjorden_Arctic_Aerosol_Forcing.pdf',
    size: '3.1 MB',
    station: 'Himadri',
    text: `ARCTIC ATMOSPHERIC MONITORING (HIMADRI STATION)
Lead Researcher: Dr. Sunita Deshmukh
Station: Himadri Station (Ny-Ålesund, Svalbard, Arctic)
Coordinates: Latitude 78.9, Longitude 11.9
Expedition Year: 2025
Discipline: Atmospheric Physics

Abstract:
Continuous black carbon aerosol monitoring at Himadri Station provides insights into radiative forcing over Norwegian Arctic glaciers. Air mass back-trajectories confirm spring transport from mid-latitude Eurasian industrial centers.

Key Findings:
1. Black carbon episodes reduce snow albedo by up to 2.1%.
2. Radiative forcing accelerates spring melt onset by 8 days.
3. Long-range aerosol transport peaks during late winter arctic haze events.`
  }
];
