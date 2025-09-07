import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TrackCardComponent } from '../../components/track-card/track-card.component';

@Component({
  selector: 'app-tracks',
  imports: [TrackCardComponent, RouterLink],
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss',
})
export class TracksComponent {}
