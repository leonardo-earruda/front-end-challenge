import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TracksService } from './tracks.service';
import { urls } from '../../shared/consts/base-url';
import { isrcs } from '../data/tracks';

function buildApiTrack(overrides: Partial<any> = {}) {
  const base = {
    name: 'Track Name',
    artists: [{ name: 'Artist One' }],
    album: {
      name: 'Album Name',
      images: [{ url: 'img1' }, { url: 'img2' }],
      available_markets: ['BR'],
      release_date: '2020-01-01',
    },
    duration_ms: 123456,
    external_ids: { isrc: 'TESTISRC' },
    external_urls: { spotify: 'https://open.spotify.com/track/xyz' },
    preview_url: 'https://p.scdn.co/mp3-preview/xyz',
  };
  return { ...base, ...overrides };
}

describe('TracksService', () => {
  let service: TracksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TracksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTrackByISRC should return tracks for a valid ISRC', () => {
    const isrc = 'BR1SP1500002';

    let received: any[] | undefined;
    service.getTrackByISRC(isrc).subscribe((tracks) => (received = tracks));

    const req = httpMock.expectOne((r) =>
      r.method === 'GET' &&
      r.url === `${urls.baseUrl}/search` &&
      r.params.get('q') === `isrc:${isrc}` &&
      r.params.get('type') === 'track'
    );

    const apiItem1 = buildApiTrack({
      name: 'B Song',
      external_ids: { isrc },
    });
    const apiItem2 = buildApiTrack({
      name: 'A Song',
      external_ids: { isrc },
    });

    req.flush({
      tracks: {
        items: [apiItem1, apiItem2],
      },
    });

    expect(received).toBeTruthy();
    expect(received!.length).toBe(2);
    expect(received![0]).toEqual({
      name: 'B Song',
      artists: [{ name: 'Artist One' }],
      album: {
        name: 'Album Name',
        images: [{ url: 'img1' }, { url: 'img2' }],
        available_markets: ['BR'],
        release_date: '2020-01-01',
      },
      duration_ms: 123456,
      external_ids: { isrc },
      external_urls: { spotify: 'https://open.spotify.com/track/xyz' },
      preview_url: 'https://p.scdn.co/mp3-preview/xyz',
    });
  });

  it('getAllTracks should fetch all ISRCs and return flattened sorted list by name', () => {
    let received: any[] | undefined;
    service.getAllTracks().subscribe((tracks) => (received = tracks));

    const pending = isrcs.map((isrc) =>
      httpMock.expectOne((r) =>
        r.method === 'GET' &&
        r.url === `${urls.baseUrl}/search` &&
        r.params.get('q') === `isrc:${isrc}` &&
        r.params.get('type') === 'track'
      )
    );

    const names = ['Zeta', 'beta', 'Alpha', 'écho', 'delta', 'charlie', 'Bravo', 'álbum', 'Omega', 'gamma'];

    pending.forEach((req, idx) => {
      const name = names[idx % names.length];
      const isrc = isrcs[idx];
      req.flush({
        tracks: {
          items: [buildApiTrack({ name, external_ids: { isrc } })],
        },
      });
    });

    expect(received).toBeTruthy();
    expect(received!.length).toBe(isrcs.length);

    const namesResult = received!.map((t) => t.name);
    const isSorted = namesResult.every((n, i, arr) => i === 0 || n.localeCompare(arr[i - 1], 'pt-BR', { numeric: true, sensitivity: 'base' }) >= 0);
    expect(isSorted).toBeTrue();
  });
});
