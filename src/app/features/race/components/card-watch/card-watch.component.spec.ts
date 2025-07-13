import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWatchComponent } from './card-watch.component';

describe('CardWatchComponent', () => {
  let component: CardWatchComponent;
  let fixture: ComponentFixture<CardWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardWatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
