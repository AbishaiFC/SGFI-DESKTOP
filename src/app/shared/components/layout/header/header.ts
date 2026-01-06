import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthStore } from '../../../../core/stores/auth/auth-store';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header implements OnInit {
  // Servicio de almacenamiento de datos de Autenticación
  readonly authStore = inject(AuthStore);

  // Dependencia para detectar rutas
  private router = inject(Router);

  // Dependencia para obtener metadatos de las rutas
  private route = inject(ActivatedRoute)

  readonly title = signal('');
  readonly subtitle = signal('');

  constructor(){
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => {
      const currentRoute = this.getDeepestRoute(this.route);
      this.title.set(currentRoute.snapshot.data['title'] ?? '');
      this.subtitle.set(currentRoute.snapshot.data['subtitle'] ?? '');
    })
  }

  ngOnInit(): void {
    this.authStore.loadAccount().subscribe()
  }

  private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }

    return route;
  }
}
