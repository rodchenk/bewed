import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopPoolCoverComponent } from './develop-pool-cover.component';

describe('DevelopPoolCoverComponent', () => {
  let component: DevelopPoolCoverComponent;
  let fixture: ComponentFixture<DevelopPoolCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevelopPoolCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopPoolCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
