import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSuccessComponent } from './alert-success.component';

describe('AlertSuccessComponent', () => {
  let component: AlertSuccessComponent;
  let fixture: ComponentFixture<AlertSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
