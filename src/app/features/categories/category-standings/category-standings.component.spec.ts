import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryStandingsComponent } from './category-standings.component';

describe('CategoryStandingsComponent', () => {
  let component: CategoryStandingsComponent;
  let fixture: ComponentFixture<CategoryStandingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryStandingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
