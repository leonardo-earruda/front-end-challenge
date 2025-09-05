import { Component } from '@angular/core';
import { TrackCardComponent } from '../track-card/track-card.component';

@Component({
  selector: 'app-tracks',
  imports: [TrackCardComponent],
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss',
})
export class TracksComponent {}
