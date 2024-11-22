import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabmapPage } from './tabmap.page';

describe('TabmapPage', () => {
  let component: TabmapPage;
  let fixture: ComponentFixture<TabmapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabmapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
