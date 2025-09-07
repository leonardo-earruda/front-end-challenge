import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, of, tap } from 'rxjs';
import { secrets } from '../../../../_secrets';
import { urls } from '../../../consts/base-url';
import { TokenRespDto } from '../dtos/token-resp.dto';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private rawHttp = new HttpClient(inject(HttpBackend));
  token = signal<string>('');
  exp = signal<number>(0);

  getToken() {
    if (this.token() && Date.now() / 1000 < this.exp() - 30) {
      return of(void 0);
    }

    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: secrets.clientId,
      client_secret: secrets.spotifyClientSecret,
    }).toString();

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.rawHttp
      .post<TokenRespDto>(`${urls.tokenUrl}`, body, { headers })
      .pipe(
        tap((res: TokenRespDto) => {
          this.setToken(res.access_token);
          this.exp.set(Math.floor(Date.now() / 1000) + res.expires_in);
        }),
        map(() => void 0)
      );
  }

  setToken(token: string) {
    this.token.set(token);
  }
}
