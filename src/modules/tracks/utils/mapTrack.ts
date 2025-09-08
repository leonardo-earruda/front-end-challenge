import { Track } from '../dtos/track.dto';

export function mapTrackItemToLite(t: any): Track {
  return {
    name: t.name,
    artists: t.artists.map((a: any) => ({ name: a.name })),
    album: t.album && {
      name: t.album.name,
      images: t.album.images.map((i: any) => ({ url: i.url })),
      available_markets: t.album.available_markets,
      release_date: t.album.release_date,
    },
    duration_ms: t.duration_ms,
    external_ids: t.external_ids && { isrc: t.external_ids.isrc },
    external_urls: t.external_urls && { spotify: t.external_urls.spotify },
    preview_url: t.preview_url,
  };
}
