import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInfoFunctionalityModalComponent } from './more-info-functionality-modal.component';

describe('MoreInfoFunctionalityModalComponent', () => {
  let component: MoreInfoFunctionalityModalComponent;
  let fixture: ComponentFixture<MoreInfoFunctionalityModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoreInfoFunctionalityModalComponent]
    });
    fixture = TestBed.createComponent(MoreInfoFunctionalityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
