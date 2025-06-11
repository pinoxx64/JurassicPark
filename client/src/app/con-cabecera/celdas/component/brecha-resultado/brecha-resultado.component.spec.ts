import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrechaResultadoComponent } from './brecha-resultado.component';

describe('BrechaResultadoComponent', () => {
  let component: BrechaResultadoComponent;
  let fixture: ComponentFixture<BrechaResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrechaResultadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrechaResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
