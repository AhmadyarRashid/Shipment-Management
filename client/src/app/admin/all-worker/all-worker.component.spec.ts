import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWorkerComponent } from './all-worker.component';

describe('AllWorkerComponent', () => {
  let component: AllWorkerComponent;
  let fixture: ComponentFixture<AllWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
