import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomstypeEdit } from './roomstype-edit';

describe('RoomstypeEdit', () => {
  let component: RoomstypeEdit;
  let fixture: ComponentFixture<RoomstypeEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomstypeEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomstypeEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
