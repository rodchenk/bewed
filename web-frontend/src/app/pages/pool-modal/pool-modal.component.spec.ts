import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolModalComponent } from './pool-modal.component';

describe('PoolModalComponent', () => {
  let component: PoolModalComponent;
  let fixture: ComponentFixture<PoolModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
