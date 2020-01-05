import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignWorkersComponent } from './assign-workers.component';

describe('AssignWorkersComponent', () => {
  let component: AssignWorkersComponent;
  let fixture: ComponentFixture<AssignWorkersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignWorkersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
