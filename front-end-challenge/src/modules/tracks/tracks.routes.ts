import { Routes } from '@angular/router';
import { TracksComponent } from './pages/tracks/tracks.component';
import { TrackDetailsComponent } from './components/track-details/track-details.component';

export const tracksRoutes: Routes = [
  { path: '', component: TracksComponent },
  { path: 'details/:id?', component: TrackDetailsComponent },
  { path: 'details/all', component: TrackDetailsComponent },
];
