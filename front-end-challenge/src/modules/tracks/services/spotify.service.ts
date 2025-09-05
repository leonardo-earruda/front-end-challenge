import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private http = inject(HttpClient);

  public getTracksByISRC(isrcArray: string[]): Observable<any[]> {

  }
}
