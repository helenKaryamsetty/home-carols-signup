import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'carol-house-visit' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('carol-house-visit');
  });

  it('should render the Home Carols signup form', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Home');
    expect(compiled.querySelector('h1')?.textContent).toContain('Carols');
    expect(compiled.querySelector('h1 em')?.textContent).toBe('Home Carols');
    expect(compiled.querySelector('.eyebrow')).toBeNull();
    expect(compiled.querySelector('.welcome-cta')).toBeNull();
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('[name="preferredVisitTime"]')?.getAttribute('type')).toBe('datetime-local');
    expect(compiled.querySelector('[name="locationMap"]')).toBeTruthy();
  });

  it('should show a thank-you page after signup', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.status = 'success';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#thank-you-title')?.textContent).toContain('Thank you for signing up');
    expect(compiled.querySelector('form')).toBeNull();
  });
});
