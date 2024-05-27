import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export type Marker = {
  position: LatLng;
  label: string;
}

export type LatLng = {
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css'],
})
export class GoogleMapComponent {
  @Output() public mapClick = new EventEmitter<LatLng>();

  private _markers: Array<Marker> = [];
  public get markers(): Array<Marker> {
    return this._markers;
  }

  private _zoom: number = 15;
  public get zoom(): number {
    return this._zoom;
  }

  private _center: LatLng = { lat: 0, lng: 0 };
  public get center(): LatLng {
    return this._center;
  }

  public setZoom(zoom: number): void {
    this._zoom = zoom;
  };

  public setCenter(center: LatLng): void {
    this._center = center;
  };

  public setMarkers(markers: Array<Marker>): void {
    this._markers = markers;
  };

  public onMapClick(e: any): void {
    console.log(e);
    this.mapClick.emit({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  }
}
