import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { YesNoPipe } from '../../../shared/pipes/yes-no.pipe';
import { MsToMinSecPipe } from '../../../shared/pipes/ms-to-min-sec.pipe';
import { Track } from '../../dtos/track.dto';

@Component({
  selector: 'app-track-details',
  imports: [CommonModule, YesNoPipe, MsToMinSecPipe],
  templateUrl: './track-details.component.html',
  styleUrl: './track-details.component.scss',
})
export class TrackDetailsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  trackData: Track[] = [];

  ngOnInit() {
    this.trackData = history.state.track;
  }
}
