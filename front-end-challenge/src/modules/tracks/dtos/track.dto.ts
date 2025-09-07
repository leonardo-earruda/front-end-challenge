import { Album } from './album.dto';
import { Artist } from './artist.dto';

export interface Track {
  name: string;
  artists: Artist[];
  album: Album;
  duration_ms: number;
  external_ids: { isrc: string };
  external_urls: { spotify: string };
  preview_url: string | null;
}
