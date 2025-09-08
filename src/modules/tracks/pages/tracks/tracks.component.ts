import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { isrcs } from '../../data/tracks';
import { TracksService } from '../../services/tracks.service';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-tracks',
  imports: [MatCardModule, MatDividerModule, MatIconModule, ModalComponent],
  templateUrl: './tracks.component.html',
  styleUrl: './tracks.component.scss',
})
export class TracksComponent {
  spotifyService = inject(TracksService);
  router = inject(Router);
  modal = inject(ModalService);
  isrcList = isrcs;

  onIsrcClick(isrc: string) {
    this.spotifyService
      .getTrackByISRC(isrc)
      .pipe(
        tap((track: any) => {
          track.length === 0
            ? this.modal.open({
                title: 'Faixa indisponível',
                message: 'Não foi encontrado detalhes para este ISRC. Tente outro.',
                type: 'warning',
                actions: [
                  { label: 'OK', variant: 'primary', dismiss: true }
                ]
              })
            : this.router.navigate(['/tracks/details', isrc], {
                state: { track: track },
              }); 
        })
      )
      .subscribe();
  }
}
