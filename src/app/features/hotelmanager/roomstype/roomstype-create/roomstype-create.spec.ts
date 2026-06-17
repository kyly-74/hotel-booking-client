import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomstypeCreate } from './roomstype-create';

describe('RoomstypeCreate', () => {
  let component: RoomstypeCreate;
  let fixture: ComponentFixture<RoomstypeCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomstypeCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomstypeCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
