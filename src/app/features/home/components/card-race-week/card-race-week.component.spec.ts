import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRaceWeekComponent } from './card-race-week.component';

describe('CardRaceWeekComponent', () => {
  let component: CardRaceWeekComponent;
  let fixture: ComponentFixture<CardRaceWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardRaceWeekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRaceWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
