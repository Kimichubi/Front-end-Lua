import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSpecPageComponent } from './customer-spec-page.component';

describe('CustomerSpecPageComponent', () => {
  let component: CustomerSpecPageComponent;
  let fixture: ComponentFixture<CustomerSpecPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSpecPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSpecPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
