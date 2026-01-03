import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DashboardService } from '../../core/services/dashboard.service';
import { AuthService } from '../../core/auth/auth.service';

import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  

  isBrowser = false;
  role!: string | null;

  stats = {
    patients: 0,
    doctors: 0,
    appointments: 0,
    revenue: 0
  };

  appointmentChart: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Appointments' }]
  };

  revenueChart: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Revenue (₹)' }]
  };

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.role = this.authService.getUserRole();
  }

  ngOnInit(): void {
    
    if (!this.isBrowser) return;

    this.loadStats();
    this.loadCharts();

    this.dashboardService.getMonthlyAppointments().subscribe(res => {
  this.monthlyAppointmentsChart.labels = res.labels;
  this.monthlyAppointmentsChart.datasets[0].data = res.data;
});

this.dashboardService.getMonthlyRevenue().subscribe(res => {
  this.monthlyRevenueChart.labels = res.labels;
  this.monthlyRevenueChart.datasets[0].data = res.data;
});
  }

  isAdmin() {
    return this.role === 'ADMIN';
  }

  isDoctor() {
    return this.role === 'DOCTOR';
  }

  isStaff() {
    return this.role === 'STAFF';
  }

  private loadStats(): void {
    this.dashboardService.getStats().subscribe(res => {
      this.stats = res;
    });
  }

  private loadCharts(): void {
    // Only Admin sees charts
    if (!this.isAdmin()) return;

    this.dashboardService.getAppointmentsChart().subscribe(res => {
      this.appointmentChart.labels = res.labels;
      this.appointmentChart.datasets[0].data = res.data;
    });

    this.dashboardService.getRevenueChart().subscribe(res => {
      this.revenueChart.labels = res.labels;
      this.revenueChart.datasets[0].data = res.data;
    });
  }

  monthlyAppointmentsChart: ChartConfiguration<'bar'>['data'] = {
  labels: [],
  datasets: [{ data: [], label: 'Monthly Appointments' }]
};

monthlyRevenueChart: ChartConfiguration<'line'>['data'] = {
  labels: [],
  datasets: [{ data: [], label: 'Monthly Revenue (₹)' }]
};

}
