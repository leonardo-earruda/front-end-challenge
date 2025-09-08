## Aplicação de Busca de Faixas por ISRC (Angular + Spotify API)

Aplicação web construída em Angular (LTS) que consulta a API do Spotify para exibir informações de faixas musicais a partir de códigos ISRC. Os resultados são apresentados de forma responsiva, ordenados alfabeticamente pelo título da faixa, sem persistência local.

### Funcionalidades

- **Busca por ISRC**: consulta a API do Spotify usando `isrc:<código>`.
- **Lista de ISRCs**: tela inicial com ISRCs pré-definidos para navegação rápida.
- **Detalhes da faixa**:
  - Thumb do álbum
  - Título da faixa
  - Artistas
  - Duração em mm:ss
  - Data de lançamento do álbum
  - Player de prévia (`audio` HTML5)
  - Link externo para Spotify
  - Sinalização de disponibilidade no Brasil (BR)
- **Ordenação**: faixas ordenadas alfabeticamente usando `Intl.Collator` para consistência em pt-BR.
- **Feedback ao usuário**: modal informando indisponibilidade quando não há resultados para um ISRC.

### Arquitetura e Organização

- **Standalone Components e Rotas por Feature**:
  - Rotas de app em `src/app/app.routes.ts` com lazy load para `tracks` (`src/modules/tracks/tracks.routes.ts`).
  - Configuração global em `src/app/app.config.ts` com `provideRouter`, `provideHttpClient` e interceptor.
- **Módulos por Domínio** (`src/modules`):
  - `shared`: componentes compartilhados (ex.: `modal`), `pipes`, `interceptors`, `utils`, `design-tokens` (SCSS), DTOs e serviços transversais.
  - `tracks`: páginas, componentes, serviços, DTOs e utilitários específicos do domínio de faixas.
- **DTOs Tipados**: `album.dto.ts`, `artist.dto.ts`, `track.dto.ts` modelam apenas o necessário para a UI.
- **Mapeamento de API**: `mapTrack.ts` normaliza a resposta crua do Spotify para o modelo usado na aplicação.
- **Utilitários**: `sort-track-by-name.ts` garante ordenação estável e localizada.

### Autenticação e Interceptação HTTP

- **Fluxo de Token (Client Credentials)**:
  - `TokenService` (`src/modules/shared/services/token.service.ts`) obtém `access_token` em `urls.tokenUrl` com `HttpClient` direto via `HttpBackend` (evita loops de interceptor).
  - Cache do token com `signals` (`token`, `exp`) e controle de concorrência via `inFlight$ + shareReplay(1)` para evitar múltiplas requisições simultâneas.
  - Renovação antecipada (margen de segurança antes de `exp`).
- **Interceptor**: `auth.interceptor.ts` injeta `Authorization: Bearer <token>` em todas as requisições exceto no endpoint de token.

### Camada de Dados (Tracks)

- **Serviço**: `TracksService`
  - `getTrackByISRC(isrc)`: consulta `/v1/search` com `q=isrc:<isrc>` e mapeia os itens.
  - `getAllTracks()`: paraleliza várias buscas com `forkJoin` e ordena o resultado combinado.
- **Fonte de ISRCs**: `src/modules/tracks/data/tracks.ts`.

### Camada de Apresentação

- **TracksComponent** (`/tracks`):
  - Lista ISRCs e, ao clique, busca a faixa. Sem resultados, abre modal de aviso; com resultados, navega para detalhes com state pré-carregado.
- **TrackDetailsComponent** (`/tracks/details/:id?` e `/tracks/details/all`):
  - Consome dados via `history.state` quando existem; fallback para `getAllTracks()`.
  - Exibe card com imagem do álbum, artistas, duração (via `MsToMinSecPipe`), disponibilidade (badge condicional) e link externo.
- **ModalComponent**: controlado por `ModalService` com estado via `signals`.
- **Design System**: SCSS com tokens (`colors.scss`, `spacing.scss`, `typography.scss`, `utilities.scss`), Angular Material e utilitários do Bootstrap para layout responsivo.

### Estratégias de Performance e Qualidade

- **Lazy Loading de Rotas** e importes standalone para reduzir bundle inicial.
- **Coalescência de eventos** via `provideZoneChangeDetection({ eventCoalescing: true })`.
- **Imutabilidade** em mapeamentos e ordenações (`map`, `sort` em cópias).
- **Collator pt-BR** para ordenação consistente e sem custos adicionais de i18n.

### Testes

- **Unitários (Jasmine/Karma)**:
  - Cobrem `TokenService`, `TracksService`, `ModalService` e `MsToMinSecPipe`.
  - Estratégia: mocks de `HttpClient`/`HttpBackend`, validação de caching/expiração, mapeamento de modelos e formatação de duração.
- **E2E (Cypress)**:
  - `tracks-list.cy.ts`: verifica renderização da lista inicial de ISRCs.
  - `track-details.cy.ts`: navegação para detalhes com intercept de `search` e asserções de URL e conteúdo.
  - `availability-badge.cy.ts`: badge condicional com fixtures para BR e não-BR.
  - `back-link.cy.ts`: retorno da tela de detalhes para `/tracks`.
  - `external-link.cy.ts`: link externo para o Spotify no card de detalhes.
  - `details-all.cy.ts`: carregamento de todas as faixas em `/tracks/details/all`.
  - `shared/modal.cy.ts`: modal exibido quando não há resultados.
  - Uso de `cy.intercept` e `fixtures` para cenários determinísticos e independentes da API real.

### Tecnologias

- **Angular 19 (LTS)**, Standalone APIs e Router moderno
- **Angular Material** e **Bootstrap 5** (utilitários de layout)
- **RxJS 7** para composição reativa
- **Cypress 15** para E2E, **Jasmine/Karma** para unitários
- **TypeScript 5.6**

### Requisitos e Compatibilidade

- **Node.js**: recomendado 21.6
- **Compatibilidade**: alinhado com **Angular 19** usado no projeto

### Como executar

1. Instale dependências:
   ```bash
   npm install
   ```
2. Configure credenciais do Spotify:
   - Edite `/_secrets.ts` e preencha `clientId` e `spotifyClientSecret` de uma aplicação Spotify (Client Credentials). Evite commitar chaves reais.
3. Suba o servidor de desenvolvimento:
   ```bash
   npm run start
   ```
   A aplicação estará em `http://localhost:4200`.
4. Testes unitários:
   ```bash
   npm run test
   ```
5. Testes E2E (Cypress):
   ```bash
   npx cypress open
   # ou em modo headless
   npx cypress run
   ```

### Decisões de projeto

- Standalone components e lazy routes para modularidade e startup rápido.
- Interceptor único para autenticação transparente com controle de token reativo.
- Normalização de dados da API em camada de mapeamento para isolar a UI de mudanças.
- Testes E2E cobrindo fluxos críticos do usuário com interceptação e fixtures.
