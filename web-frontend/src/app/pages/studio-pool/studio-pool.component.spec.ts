import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioPoolComponent } from './studio-pool.component';

describe('StudioPoolComponent', () => {
  let component: StudioPoolComponent;
  let fixture: ComponentFixture<StudioPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudioPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
