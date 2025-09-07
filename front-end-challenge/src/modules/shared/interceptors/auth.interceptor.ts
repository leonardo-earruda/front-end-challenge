import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { switchMap } from 'rxjs';
import { TokenService } from '../services/token.service';
import { urls } from '../consts/base-url';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenSvc = inject(TokenService);

  if (req.url.includes(urls.tokenUrl)) {
    return next(req);
  }

  return tokenSvc.getToken().pipe(
    switchMap(() => {
      const token = tokenSvc.token();
      const authReq = token
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req;
      return next(authReq);
    })
  );
};
