import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { WebsocketService } from '../../services/websockets/websocket-service';
import { MessageModel, PayloadNotification, PayloadProduct, PayloadWelcome } from '../../../shared/models/websockets/message-model';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class WebsocketStore {
  /**
   * Servicio de almacenamiento temporal de los mensajes recibidos mediante Web Sockets
   */

  // Servicio de WebSocket
  private readonly websocketService = inject(WebsocketService);

  // Signal privado para almacenar los datos del mensaje tipo 'Welcome'
  private _welcome = signal<PayloadWelcome | null>(null);

  // Signal publico que expone los datos del mensaje
  readonly welcome = computed(() => this._welcome());

  // Signal privado para almacenar los datos del mensaje tipo 'Notification'
  private _notification = signal<PayloadNotification | null>(null);

  // Signal publico que expone los datos del mensaje
  readonly notification = computed(() => this._notification());

  // Signal privado para almacenar los datos del mensaje tipo 'Sales'
  private _salesBarcode = signal<PayloadProduct | null>(null);
  
  // Signal publico que expone los datos del mensaje
  readonly salesBarcode = computed(() => this._salesBarcode());
  
  // Signal privado para almacenar los datos del mensaje tipo 'Inventario'
  private _inventoryBarcode = signal<number | null>(null);
  
  // Signal publico que expone los datos del mensaje
  readonly inventoryBarcode = computed(() => this._inventoryBarcode());


  constructor(){
    // Filtros dinamicos que reciben el mensaje y los almacenan en sus signals
    this.bindStream<PayloadWelcome>('bienvenida', this._welcome);
    this.bindStream<PayloadNotification>('notificacion_servidor', this._notification);
    this.bindStream<PayloadProduct>('sales_barcode', this._salesBarcode);
    this.bindStream<number>('inventory_barcode', this._inventoryBarcode);
  }

  // Abstraccion de almacenamiento 
  private bindStream<T>(
    type: MessageModel['type'],
    target: WritableSignal<T | null>
  ) {
    this.websocketService.message$
      .pipe(
        filter(m => m.type === type),
        takeUntilDestroyed())
      .subscribe(m => target.set(m.payload as T));
  }

  clearSalesBarcode(): void{
    this._salesBarcode.set(null);
  }
}
