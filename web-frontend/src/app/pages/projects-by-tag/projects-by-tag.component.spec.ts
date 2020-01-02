import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsByTagComponent } from './projects-by-tag.component';

describe('ProjectsByTagComponent', () => {
  let component: ProjectsByTagComponent;
  let fixture: ComponentFixture<ProjectsByTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsByTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsByTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
