import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySpecPageComponent } from './category-spec-page.component';

describe('CategorySpecPageComponent', () => {
  let component: CategorySpecPageComponent;
  let fixture: ComponentFixture<CategorySpecPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorySpecPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySpecPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
