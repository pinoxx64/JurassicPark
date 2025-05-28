import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeldaDetalleComponent } from './celda-detalle.component';

describe('CeldaDetalleComponent', () => {
  let component: CeldaDetalleComponent;
  let fixture: ComponentFixture<CeldaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CeldaDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CeldaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
