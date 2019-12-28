import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutKanbanComponent } from './layout-kanban.component';

describe('LayoutKanbanComponent', () => {
  let component: LayoutKanbanComponent;
  let fixture: ComponentFixture<LayoutKanbanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutKanbanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
