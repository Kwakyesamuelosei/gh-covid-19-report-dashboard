import { Component } from '@angular/core';
import * as moment from 'moment';
import { StatsModel } from './model/stats';
import { Covid19Service } from './services/covid-19.service';
import { StatusMonitor } from './services/shared/status-monitor';
import { getTestBed } from '@angular/core/testing';
import { monitor } from './services/shared/monitor-operator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Ghana COVID-19 Daily Report';
  code = 'gh';
  selectedDate: Date | null = new Date();
  stats: StatsModel[] = [
    {
      status: 'confirmed',
      statusLabel: 'Confirmed',
      value: '0',
    },
    {
      status: 'recovered',
      statusLabel: 'Recovered',
      value: '0',
    },
    {
      status: 'deaths',
      statusLabel: 'Deaths',
      value: '0',
    },
    {
      status: 'active',
      statusLabel: 'Active',
      value: '0',
    },
  ];

  statusMonitor: StatusMonitor = { status: 'loading', message: '' };

  constructor(private covid19Service: Covid19Service) {}

  ngOnInit(): void {
    this.loadCovidReports();
  }

  loadCovidReports(): void {
    this.statusMonitor = new StatusMonitor();
    const request = {
      date: moment(this.selectedDate).format('YYYY-MM-DD'),
      code: this.code,
    };
    this.covid19Service
      .getCovidReports(request)
      .pipe(monitor(this.statusMonitor))
      .subscribe((response) => {
        this.stats[0].value = response[0].provinces[0].confirmed
          ? response[0].provinces[0].confirmed
          : 0;
        this.stats[1].value = response[0].provinces[0].recovered
          ? response[0].provinces[0].recovered
          : 0;
        this.stats[2].value = response[0].provinces[0].deaths
          ? response[0].provinces[0].deaths
          : 0;
        this.stats[3].value = response[0].provinces[0].active
          ? response[0].provinces[0].active
          : 0;
      });
  }

  reloadCovidReport(): void {
    this.loadCovidReports();
  }

  onChangeDate(date: Date): void {
    this.selectedDate = date;
    this.loadCovidReports();
  }

  get showCurrentDate() {
    return moment(this.selectedDate).format('DD-MM-YYYY');
  }
}
