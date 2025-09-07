import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize, mapTo, Observable, of, shareReplay, tap } from 'rxjs';
import { secrets } from '../../../../_secrets';
import { urls } from '../consts/base-url';
import { TokenRespDto } from '../dtos/token-resp.dto';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private rawHttp = new HttpClient(inject(HttpBackend));
  token = signal<string>('');
  exp = signal<number>(0);

  private inFlight$?: Observable<void>;

  getToken(): Observable<void> {
    const now = Math.floor(Date.now() / 1000);
    if (this.token() && now < this.exp() - 30) return of(void 0);

    if (this.inFlight$) return this.inFlight$;

    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: secrets.clientId,
      client_secret: secrets.spotifyClientSecret,
    }).toString();
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const obs = this.rawHttp
      .post<TokenRespDto>(urls.tokenUrl, body, { headers })
      .pipe(
        tap((res) => {
          this.setToken(res.access_token);
          this.exp.set(Math.floor(Date.now() / 1000) + res.expires_in);
        }),
        mapTo(void 0),
        shareReplay(1),
        finalize(() => (this.inFlight$ = undefined))
      );

    this.inFlight$ = obs;
    return obs;
  }

  setToken(token: string) {
    this.token.set(token);
  }
}
