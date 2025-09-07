import { Component, inject, signal } from '@angular/core';
import { TracksService } from '../../services/tracks.service';
import { Track } from '../../dtos/track.dto';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { YesNoPipe } from '../../../shared/pipes/yes-no.pipe';
import { MsToMinSecPipe } from '../../../shared/pipes/ms-to-min-sec.pipe';

@Component({
  selector: 'app-all-tracks',
  imports: [AsyncPipe, YesNoPipe, MsToMinSecPipe, DatePipe],
  templateUrl: './all-tracks.component.html',
  styleUrl: './all-tracks.component.scss',
})
export class AllTracksComponent {
  tracksService = inject(TracksService);
  tracks!: Observable<Track[]>;

  ngOnInit() {
    this.tracks = this.tracksService.getAllTracks();

    this.tracks.subscribe((tracks) => console.log(tracks, 'tracks'));
  }
}
