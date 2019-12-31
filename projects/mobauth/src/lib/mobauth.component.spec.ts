import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobauthComponent } from './mobauth.component';

describe('MobauthComponent', () => {
  let component: MobauthComponent;
  let fixture: ComponentFixture<MobauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobauthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
