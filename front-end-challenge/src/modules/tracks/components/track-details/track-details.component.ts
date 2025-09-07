import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MsToMinSecPipe } from '../../../shared/pipes/ms-to-min-sec.pipe';
import { Track } from '../../dtos/track.dto';
import { TracksService } from '../../services/tracks.service';

@Component({
  selector: 'app-track-details',
  imports: [
    CommonModule,
    MsToMinSecPipe,
    AsyncPipe,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './track-details.component.html',
  styleUrl: './track-details.component.scss',
})
export class TrackDetailsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  tracks!: Observable<Track[]>;
  tracksService = inject(TracksService);

  ngOnInit() {
    this.getSource();
  }

  private getSource() {
    history.state.track
      ? (this.tracks = of(history.state.track))
      : this.getTracks();
  }

  getTracks() {
    this.tracks = this.tracksService.getAllTracks();
  }
}
