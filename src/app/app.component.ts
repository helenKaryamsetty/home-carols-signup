import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'carol-house-visit';
  name = '';
  phone = '';
  address = '';
  addressType = '';
  preferredVisitTime = '';
  locationMap = '';
  landmark = '';
  minimumDateTime = this.toLocalDateTime(new Date());
  mapPreviewUrl: SafeResourceUrl | null = null;
  status: 'idle' | 'success' | 'error' = 'idle';
  statusMessage = '';

  private readonly sanitizer = inject(DomSanitizer);
  private readonly googleSheetsUrl = 'https://script.google.com/macros/s/AKfycbzncosM4C0HgYd1UdmSWgJ43M-MC6Un7PSVWYiLQvoDItsGU9QS-S5YWNsJ_U2nE4jG/exec';

  refreshMapPreview(): void {
    const coordinates = this.locationMap.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/)
      ?? this.locationMap.match(/[?&]q=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
    const query = coordinates
      ? `${coordinates[1]},${coordinates[2]}`
      : this.address || this.locationMap;

    this.mapPreviewUrl = query
      ? this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
        )
      : null;
  }

  openGoogleMaps(): void {
    const query = this.locationMap || this.address;
    const url = query
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
      : 'https://www.google.com/maps';

    window.open(url, '_blank', 'noopener,noreferrer');
  }

  useMyLocation(): void {
    if (!navigator.geolocation) {
      this.showError('Location sharing is not available in this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        this.locationMap = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
        this.refreshMapPreview();
        this.status = 'idle';
        this.statusMessage = '';
      },
      () => this.showError('We could not access your location. You can add a Google Maps link instead.'),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  async submitVisit(form: NgForm): Promise<void> {
    if (!form.valid) {
      return;
    }

    if (!this.googleSheetsUrl) {
      this.showError('The Google Sheets connection is not set up yet. Add your Apps Script web app URL to finish connecting the form.');
      return;
    }

    const payload = {
      name: this.name.trim(),
      phone: this.phone.trim(),
      address: this.address.trim(),
      addressType: this.addressType,
      preferredVisitTime: this.preferredVisitTime,
      locationMap: this.locationMap.trim(),
      landmark: this.landmark.trim()
    };

    try {
      await fetch(this.googleSheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      this.status = 'success';
      this.statusMessage = '';
      form.resetForm();
      this.mapPreviewUrl = null;
    } catch {
      this.showError('Your signup could not be sent. Please check your connection and try again.');
    }
  }

  private showError(message: string): void {
    this.status = 'error';
    this.statusMessage = message;
  }

  private toLocalDateTime(date: Date): string {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 16);
  }
}
