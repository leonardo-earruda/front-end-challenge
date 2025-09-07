import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTracksComponent } from './all-tracks.component';

describe('AllTracksComponent', () => {
  let component: AllTracksComponent;
  let fixture: ComponentFixture<AllTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTracksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
