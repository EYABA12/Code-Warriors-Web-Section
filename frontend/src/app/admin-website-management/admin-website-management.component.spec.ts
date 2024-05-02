import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWebsiteManagementComponent } from './admin-website-management.component';

describe('AdminWebsiteManagementComponent', () => {
  let component: AdminWebsiteManagementComponent;
  let fixture: ComponentFixture<AdminWebsiteManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminWebsiteManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminWebsiteManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
