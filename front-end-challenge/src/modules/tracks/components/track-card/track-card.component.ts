import { Component, inject } from '@angular/core';
import { TracksService } from '../../services/tracks.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-track-card',
  imports: [],
  templateUrl: './track-card.component.html',
  styleUrl: './track-card.component.scss',
})
export class TrackCardComponent {
  spotifyService = inject(TracksService);
  router = inject(Router);

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

  onIsrcClick(isrc: string) {
    this.spotifyService
      .getTrackByISRC(isrc)
      .pipe(
        tap((track: any) => {
          console.log(track);
          track.length === 0
            ? alert('Track not available')
            : this.router.navigate(['/tracks/details', isrc], {
                state: { track: track },
              });
        })
      )
      .subscribe();
  }
}
