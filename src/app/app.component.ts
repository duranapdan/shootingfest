import { Component, inject } from '@angular/core';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { environment } from '../environments/environment';
import { TokenService } from './shared/services/token.service';

@Component({
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly _messaging = inject(Messaging);
  constructor(private tokenService: TokenService) { } // Servisi enjekte edin

  ngOnInit(): void {
    if ('Notification' in window && navigator.serviceWorker) {
      Notification.requestPermission().then(permission => {
        console.log('permission :>> ', permission);
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          this._getDeviceToken();
          //  this._onMessage();
        } else {
          console.log('Notification permission denied.');
        }
      });
    }


  }

  private _getDeviceToken(): void {
    console.log("girdi");
    getToken(this._messaging, { vapidKey: environment.vapidKey })
      .then((token) => {
        console.log("token :>>", token);
        if (token) {
          this.tokenService.setToken(token); // Token'ı servise set edin
        }
        // save the token in the server, or do whathever you want
      })
      .catch((error) => console.log('Token error', error));
  }

  private _onMessage(): void {
    onMessage(this._messaging, {
      next: (payload) => console.log('Message', payload),
      error: (error) => console.log('Message error', error),
      complete: () => console.log('Done listening to messages'),
    });
  }
}
