import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFunctionalityModalComponent } from './add-new-functionality-modal.component';

describe('AddNewFunctionalityModalComponent', () => {
  let component: AddNewFunctionalityModalComponent;
  let fixture: ComponentFixture<AddNewFunctionalityModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewFunctionalityModalComponent]
    });
    fixture = TestBed.createComponent(AddNewFunctionalityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
