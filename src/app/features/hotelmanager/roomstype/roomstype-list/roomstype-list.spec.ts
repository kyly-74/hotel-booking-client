import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomstypeList } from './roomstype-list';

describe('RoomstypeList', () => {
  let component: RoomstypeList;
  let fixture: ComponentFixture<RoomstypeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomstypeList],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomstypeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
