import { Track } from '../../tracks/dtos/track.dto';
const collator = new Intl.Collator('pt-BR', {
  numeric: true,
  sensitivity: 'base',
});

export function sortTracksByName(list: Track[]): Track[] {
  return [...list].sort((a, b) => collator.compare(a.name ?? '', b.name ?? ''));
}
