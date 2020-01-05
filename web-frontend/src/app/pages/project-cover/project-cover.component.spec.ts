import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCoverComponent } from './project-cover.component';

describe('ProjectCoverComponent', () => {
  let component: ProjectCoverComponent;
  let fixture: ComponentFixture<ProjectCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
