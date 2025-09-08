import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TokenService } from './token.service';
import { urls } from '../consts/base-url';

describe('TokenService', () => {
  let service: TokenService;
  let httpMock: HttpTestingController;
  const fixedNowMs = 1_700_000_000_000; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TokenService);
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(Date, 'now').and.returnValue(fixedNowMs);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch token and update signals (success)', () => {
    let completed = false;
    service.getToken().subscribe({ complete: () => (completed = true) });

    const req = httpMock.expectOne(urls.tokenUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');
    const body: string = req.request.body as string;
    expect(body).toContain('grant_type=client_credentials');
    expect(body).toContain('client_id=');
    expect(body).toContain('client_secret=');

    const expiresIn = 3600;
    req.flush({ access_token: 'token123', token_type: 'Bearer', expires_in: expiresIn });

    expect(completed).toBeTrue();
    expect(service.token()).toBe('token123');
    expect(service.exp()).toBe(Math.floor(fixedNowMs / 1000) + expiresIn);
  });

  it('should not request if token is valid and not expiring (<30s)', () => {
    service.setToken('cached-token');
    service.exp.set(Math.floor(fixedNowMs / 1000) + 120); // 2 minutes > 30s

    let nextCount = 0;
    service.getToken().subscribe(() => nextCount++);

    httpMock.expectNone(urls.tokenUrl);
    expect(nextCount).toBe(1); 
  });

  it('should renew when less than 30s to expire', () => {
    service.setToken('old-token');
    service.exp.set(Math.floor(fixedNowMs / 1000) + 10); // < 30s

    service.getToken().subscribe();

    const req = httpMock.expectOne(urls.tokenUrl);
    expect(req.request.method).toBe('POST');
    req.flush({ access_token: 'new-token', token_type: 'Bearer', expires_in: 100 });
    expect(service.token()).toBe('new-token');
  });

  it('two simultaneous calls should share the same request (concurrency)', () => {
    let completed1 = false;
    let completed2 = false;

    service.getToken().subscribe({ complete: () => (completed1 = true) });
    service.getToken().subscribe({ complete: () => (completed2 = true) });

    const req = httpMock.expectOne(urls.tokenUrl);
    httpMock.expectNone(urls.tokenUrl);

    req.flush({ access_token: 'shared-token', token_type: 'Bearer', expires_in: 50 });

    expect(completed1).toBeTrue();
    expect(completed2).toBeTrue();
    expect(service.token()).toBe('shared-token');
  });

  it('should allow new request after finalizing inFlight (second call)', () => {
    service.getToken().subscribe();
    const req1 = httpMock.expectOne(urls.tokenUrl);
    req1.flush({ access_token: 'first', token_type: 'Bearer', expires_in: 30 });

    service.getToken().subscribe();
    const req2 = httpMock.expectOne(urls.tokenUrl);
    req2.flush({ access_token: 'second', token_type: 'Bearer', expires_in: 30 });

    expect(service.token()).toBe('second');
  });
});
