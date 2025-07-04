import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAppComponent } from './layout-app.component';

describe('LayoutAppComponent', () => {
  let component: LayoutAppComponent;
  let fixture: ComponentFixture<LayoutAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
