import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Subject } from 'rxjs';
import { MessageModel, PayloadNotification, PayloadProduct, PayloadWelcome } from '../../../shared/models/websockets/message-model';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  /**
   * Clase WebSocketService
   * Maneja las conexiones web socket
   */

  // Url del backend
  private readonly baseUrl = `${environment.apiUrl}/notifications`;

  // Objeto de WebSocket proveido por Angular
  private socket!: WebSocket;

  // Variable pública para recibir mensajes
  readonly message$ = new Subject<MessageModel>();
  
  connect(url: string = this.baseUrl): void{
    this.socket = new WebSocket(url);

    this.socket.onopen = () => console.log('WebSocket conexión establecida.');
    this.socket.onmessage = (event) => {
      const messageReceived: MessageModel = JSON.parse(event.data);
      this.message$.next(messageReceived);
      console.log(messageReceived)

    }
    this.socket.onclose = (event) => console.log('Conexión serrada:', event);
    this.socket.onerror = (error) => console.error('WebSocket error:', error);
  }

  closeConnection(): void{
    this.socket.close();
  }
}
