import { ChangeDetectionStrategy, Component, computed, effect, input, viewChild } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ReportsWeeklySales } from '../../../shared/models/reports/reports';
import { BaseChartDirective } from 'ng2-charts';
import { WhiteCard } from "../../../shared/components/cards/white-card/white-card";
import { TitleCard } from "../../../shared/components/cards/title-card/title-card";

@Component({
  selector: 'app-chart',
  imports: [WhiteCard, TitleCard, BaseChartDirective],
  templateUrl: './chart.html',
  styleUrl: './chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Chart {
  sales = input.required<ReportsWeeklySales[]>();
  
  chart = viewChild(BaseChartDirective);

  barChartData = computed<ChartConfiguration<'bar'>['data']>(() => {
    const data = this.sales();
    
    return {
      labels: data.map(item => item.date),
      datasets: [
        {
          data: data.map(item => item.total_sales),
          label: 'Ventas totales ($)',
          backgroundColor: 'rgba(148,159,177,0.7)',
          borderColor: 'rgba(148,159,177,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(148,159,177,0.9)',
          hoverBorderColor: 'rgba(148,159,177,1)',
        },
      ]
    };
  });

  public readonly barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        position: 'left',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Ventas ($)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Fecha',
        },
      },
    },
    plugins: {
      legend: { display: true },
      tooltip: { 
        mode: 'index', 
        intersect: false,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: $${value!.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
          }
        }
      },
    },
  };

  constructor() {
    effect(() => {
      this.barChartData();
      setTimeout(() => this.chart()?.update(), 0);
    });
  }
}
