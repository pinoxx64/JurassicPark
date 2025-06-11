import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConCabeceraComponent } from './con-cabecera.component';

describe('ConCabeceraComponent', () => {
  let component: ConCabeceraComponent;
  let fixture: ComponentFixture<ConCabeceraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConCabeceraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConCabeceraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
