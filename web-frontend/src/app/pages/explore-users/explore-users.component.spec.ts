import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreUsersComponent } from './explore-users.component';

describe('ExploreUsersComponent', () => {
  let component: ExploreUsersComponent;
  let fixture: ComponentFixture<ExploreUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
