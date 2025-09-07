import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { urls } from '../../../consts/base-url';
import { isrcs } from '../data/tracks';
import { Track } from '../dtos/track.dto';
import { mapTrackItemToLite } from '../utils/mapTrack';
import { sortTracksByName } from '../../shared/utils/sort-track-by-name';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  private http = inject(HttpClient);

  public getTrackByISRC(isrc: string): Observable<Track[]> {
    const params = new HttpParams({
      fromObject: {
        q: `isrc:${isrc}`,
        type: 'track',
      },
    });

    return this.http.get<any>(`${urls.baseUrl}/search`, { params }).pipe(
      map((res) => {
        return res.tracks?.items?.map(mapTrackItemToLite);
      })
    );
  }

  public getAllTracks() {
    const allTracks$ = isrcs.map((isrc) => this.getTrackByISRC(isrc));

    return forkJoin(allTracks$).pipe(
      map((arr) => sortTracksByName(arr.flat()))
    );
  }
}
