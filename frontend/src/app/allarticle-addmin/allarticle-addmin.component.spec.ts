import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllarticleAddminComponent } from './allarticle-addmin.component';

describe('AllarticleAddminComponent', () => {
  let component: AllarticleAddminComponent;
  let fixture: ComponentFixture<AllarticleAddminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllarticleAddminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllarticleAddminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
