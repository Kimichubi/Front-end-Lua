import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellSpecPageComponent } from './sell-spec-page.component';

describe('SellSpecPageComponent', () => {
  let component: SellSpecPageComponent;
  let fixture: ComponentFixture<SellSpecPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellSpecPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellSpecPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
