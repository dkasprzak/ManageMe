import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalitiesLitsComponent } from './functionalities-lits.component';

describe('FunctionalitiesLitsComponent', () => {
  let component: FunctionalitiesLitsComponent;
  let fixture: ComponentFixture<FunctionalitiesLitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionalitiesLitsComponent]
    });
    fixture = TestBed.createComponent(FunctionalitiesLitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
