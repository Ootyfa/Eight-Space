export enum Artist {
  ANINDITA_DUTTA = 'Anindita Dutta',
  RODNEY_DICKSON = 'Rodney Dickson',
  MARTIN_SECK = 'Martin Seck',
  NAPOLES_MARTY = 'Napoles Marty'
}

export interface ArtPiece {
  id: string;
  url: string;
  artist: Artist;
  title: string;
}

export interface LightboxContent {
  url: string;
  title?: string;
  subtitle?: string;
  description?: string;
  hideInfo?: boolean; // If true, only shows the image
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}