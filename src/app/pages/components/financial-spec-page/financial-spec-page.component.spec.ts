import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialSpecPageComponent } from './financial-spec-page.component';

describe('FinancialSpecPageComponent', () => {
  let component: FinancialSpecPageComponent;
  let fixture: ComponentFixture<FinancialSpecPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialSpecPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialSpecPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
