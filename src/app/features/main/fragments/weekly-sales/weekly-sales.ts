import { ChangeDetectionStrategy, Component, computed, effect, input, OnChanges, SimpleChanges, viewChild, ViewChild } from '@angular/core';
import { ReportsWeeklySales } from '../../../../shared/models/reports/reports';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { WhiteCard } from "../../../../shared/components/cards/white-card/white-card";
import { CommonModule } from '@angular/common';
import { TitleCard } from "../../../../shared/components/cards/title-card/title-card";


@Component({
  selector: 'app-weekly-sales',
  imports: [BaseChartDirective, WhiteCard, CommonModule, TitleCard],
  templateUrl: './weekly-sales.html',
  styleUrl: './weekly-sales.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeeklySales {
  sales = input.required<ReportsWeeklySales[]>();
  
  chart = viewChild(BaseChartDirective);

  lineChartData = computed<ChartConfiguration<'line'>['data']>(() => {
    const data = this.sales();
    
    return {
      labels: data.map(item => item.date),
      datasets: [
        {
          data: data.map(item => item.total_sales),
          label: 'Ventas totales ($)',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
          tension: 0.3,
        },
      ]
    };
  });

  public readonly lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    elements: {
      line: {
        tension: 0.3,
      },
    },
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
      this.lineChartData();
      setTimeout(() => this.chart()?.update(), 0);
    });
  }
}

