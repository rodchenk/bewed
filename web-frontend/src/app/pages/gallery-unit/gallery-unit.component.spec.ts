import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryUnitComponent } from './gallery-unit.component';

describe('GalleryUnitComponent', () => {
  let component: GalleryUnitComponent;
  let fixture: ComponentFixture<GalleryUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
