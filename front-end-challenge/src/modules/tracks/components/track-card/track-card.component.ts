import { Component, inject } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-track-card',
  imports: [],
  templateUrl: './track-card.component.html',
  styleUrl: './track-card.component.scss',
})
export class TrackCardComponent {
  spotifyService = inject(SpotifyService);

  isrcList = [
    'US7VG1846811',
    'US7QQ1846811',
    'BRC310600002',
    'BR1SP1200071',
    'BR1SP1200070',
    'BR1SP1500002',
    'BXKZM1900338',
    'BXKZM1900345',
    'QZNJX2081700',
    'QZNJX2078148',
  ];

  // onIsrcClick(isrc: string) {
  //   this.spotifyService.getTrack(isrc).subscribe((track) => {
  //     console.log(track);
  //   });
  // }
}
