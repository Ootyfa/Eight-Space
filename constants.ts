import { ArtPiece, Artist } from './types';

export const LOGO_URL = "https://maddyworks.com/wp-content/uploads/2026/02/8-space.jpg";

export const EXHIBITION_POSTERS = [
  {
    url: "https://maddyworks.com/wp-content/uploads/2025/12/The-Line-Starts-From-Where-You-Stand-6-scaled.png",
    title: "The Line Starts From Where You Stand"
  },
  {
    url: "https://maddyworks.com/wp-content/uploads/2026/02/Mother-Brown-Gold-Fields-and-Wild-Honey.png",
    title: "Mother Brown, Gold Fields, and Wild Honey"
  }
];

export const ARTIST_EXHIBITION_MAP: Record<Artist, string> = {
  [Artist.RODNEY_DICKSON]: "The Line Starts From Where You Stand",
  [Artist.MARTIN_SECK]: "The Line Starts From Where You Stand",
  [Artist.NAPOLES_MARTY]: "The Line Starts From Where You Stand",
  [Artist.ANINDITA_DUTTA]: "Mother Brown, Gold Fields, and Wild Honey"
};

const rawUrls = [
  "https://maddyworks.com/wp-content/uploads/2025/12/Rodney-Dickson_5-scaled.jpg",
  "https://maddyworks.com/wp-content/uploads/2025/12/Rodney-Dickson_4-scaled.jpg",
  "https://maddyworks.com/wp-content/uploads/2025/12/Rodney-Dickson_3-scaled.jpg",
  "https://maddyworks.com/wp-content/uploads/2025/12/Rodney-Dickson_2-scaled.jpg",
  "https://maddyworks.com/wp-content/uploads/2025/12/Rodney-Dickson_1-scaled.jpg",
  "https://maddyworks.com/wp-content/uploads/2025/12/Martin-Seck_4-scaled.jpg",
  "https://maddyworks.com/wp-content/uploads/2025/12/Martin-Seck_3-scaled.jpg",
  "https://maddyworks.com/wp-content/uploads/2025/12/Martin-Seck_2-scaled.jpg",
  "https://maddyworks.com/wp-content/uploads/2025/12/Martin-Seck_1-scaled.jpg",
  "https://maddyworks.com/wp-content/uploads/2025/12/Napoles-Marty_1-scaled.jpg",
  "https://maddyworks.com/wp-content/uploads/2025/12/Napoles-Marty_2-scaled.jpg",
  "https://maddyworks.com/wp-content/uploads/2025/12/Napoles-Marty_4-scaled.jpg",
  "https://www.aninditadutta.com/wp-content/uploads/2022/10/Matter_of_Moment_b.jpg",
  "https://www.aninditadutta.com/wp-content/uploads/2022/10/Matter_of_Moment_a.jpg",
  "https://www.aninditadutta.com/wp-content/uploads/2022/10/Maya_2.jpg",
  "https://www.aninditadutta.com/wp-content/uploads/2022/10/Self_Portrait_02.jpg",
  "https://www.aninditadutta.com/wp-content/uploads/2022/10/Self_Portrait_01.jpg",
  "https://www.aninditadutta.com/wp-content/uploads/2022/10/Untitled_Triptych_c.jpg",
  "https://www.aninditadutta.com/wp-content/uploads/2022/10/Untitled_Triptych_b.jpg",
  "https://www.aninditadutta.com/wp-content/uploads/2022/10/Untitled_Triptych_a.jpg",
  "https://www.aninditadutta.com/wp-content/uploads/2022/10/Wrest_in_peace_b1-scaled.jpg",
  "https://www.aninditadutta.com/wp-content/uploads/2022/10/Wrest_in_Peace_c.jpg",
  "https://www.aninditadutta.com/wp-content/uploads/2022/10/Wrest_in_peace_a.jpg"
];

const parseArtist = (filename: string, url: string): Artist => {
  if (url.includes('aninditadutta.com')) return Artist.ANINDITA_DUTTA;
  if (filename.includes('Rodney-Dickson')) return Artist.RODNEY_DICKSON;
  if (filename.includes('Martin-Seck')) return Artist.MARTIN_SECK;
  if (filename.includes('Napoles-Marty')) return Artist.NAPOLES_MARTY;
  return Artist.RODNEY_DICKSON; // Fallback
};

export const ART_PIECES: ArtPiece[] = Array.from(new Set(rawUrls)).map((url, index) => {
  const filename = url.split('/').pop() || '';
  const artist = parseArtist(filename, url);
  const titleRaw = filename.replace('-scaled.jpg', '').replace('.jpg', '').replace(/_/g, ' ').replace(/-/g, ' ');
  
  return {
    id: `art-${index}`,
    url,
    artist,
    title: titleRaw
  };
});

// Sorted A-Z
export const ALL_ARTISTS = [
  Artist.ANINDITA_DUTTA,
  Artist.MARTIN_SECK,
  Artist.NAPOLES_MARTY,
  Artist.RODNEY_DICKSON
];

export const ARTIST_BIOS = {
  [Artist.ANINDITA_DUTTA]: "Anindita Dutta is known for her visceral, process-driven performance work often utilizing wet clay. Her practice explores themes of memory, endurance, and the relationship between the body and the earth, documented through powerful video and print media.",
  [Artist.RODNEY_DICKSON]: "Painted his 1985 portraits on bedsheets and torn blankets, transforming scarcity into sculptural medium. Growing up in Northern Ireland during the Troubles, his work asks: what beauty can be salvaged?",
  [Artist.MARTIN_SECK]: "Draws with \"comely lines\" that explode forms into fragments. Born in postwar Germany, his practice returns to earlier gestures, reconnecting across time. \"A line as an opening,\" he says, \"connected through a lifeline.\"",
  [Artist.NAPOLES_MARTY]: "Carves and chars wood into sculptural figures while his drawings trace mythic creatures on paper. Trained in Havana's classical tradition, his work embodies \"our deepest myths,\" standing in the threshold where flesh becomes bone."
};

export const ARTIST_IMAGES = {
  [Artist.ANINDITA_DUTTA]: "https://maddyworks.com/wp-content/uploads/2026/02/Mother-Brown-Gold-Fields-and-Wild-Honey.png", // Using poster as proxy
  // Others will use their first art piece
};