import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInfoTaskModalComponent } from './more-info-task-modal.component';

describe('MoreInfoTaskModalComponent', () => {
  let component: MoreInfoTaskModalComponent;
  let fixture: ComponentFixture<MoreInfoTaskModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoreInfoTaskModalComponent]
    });
    fixture = TestBed.createComponent(MoreInfoTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
