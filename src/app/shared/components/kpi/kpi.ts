import { ChangeDetectionStrategy, Component, computed, input, Input } from '@angular/core';
import { WhiteCard } from "../cards/white-card/white-card";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-kpi',
  imports: [WhiteCard, MatIconModule, CommonModule ],
  templateUrl: './kpi.html',
  styleUrl: './kpi.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Kpi {
  @Input({required: true}) icon: string = "";
  @Input({required: true}) title: string = "";
  @Input() type: 'currency' | 'decimal' | 'number' = 'number';

  today = input.required<number>();
  yesterday = input.required<number>();

  // Calcula el porcentaje de cambio
  percentageChange = computed(() => {
    const todayVal = this.today();
    const yesterdayVal = this.yesterday();
    
    if (yesterdayVal === 0) return 0;
    
    const change = ((todayVal - yesterdayVal) / yesterdayVal) * 100;
    return +change.toFixed(2);
  });

  // Determina si es positivo, negativo o neutral
  trendIcon = computed(() => {
    const percentage = this.percentageChange();
    if (percentage > 0) return 'trending_up';
    if (percentage < 0) return 'trending_down';
    return 'trending_flat';
  });

  // Clase CSS para el color
  trendClass = computed(() => {
    const percentage = this.percentageChange();
    if (percentage > 0) return 'positive';
    if (percentage < 0) return 'negative';
    return 'neutral';
  });

  // Formatea el valor según el tipo
  formattedValue = computed(() => {
    const value = this.today();
    
    switch(this.type) {
      case 'currency':
        return new Intl.NumberFormat('es-MX', { 
          style: 'currency', 
          currency: 'MXN' 
        }).format(value);
      
      case 'decimal':
        return value.toFixed(2);
      
      case 'number':
      default:
        return value.toString();
    }
  });
}
