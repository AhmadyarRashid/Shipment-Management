import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialoComponent } from './confirm-dialo.component';

describe('ConfirmDialoComponent', () => {
  let component: ConfirmDialoComponent;
  let fixture: ComponentFixture<ConfirmDialoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDialoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
