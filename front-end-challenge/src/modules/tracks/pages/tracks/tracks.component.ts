import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { isrcs } from '../../data/tracks';
import { TracksService } from '../../services/tracks.service';

@Component({
  selector: 'app-tracks',
  imports: [MatCardModule, MatDividerModule, MatIconModule],
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss',
})
export class TracksComponent {
  spotifyService = inject(TracksService);
  router = inject(Router);
  isrcList = isrcs;

  onIsrcClick(isrc: string) {
    this.spotifyService
      .getTrackByISRC(isrc)
      .pipe(
        tap((track: any) => {
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
