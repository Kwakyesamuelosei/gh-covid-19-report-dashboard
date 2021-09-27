import { Component, Input, OnInit } from '@angular/core';
import { StatsModel } from 'src/app/model/stats';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  @Input() statsDetails!: StatsModel 
  constructor() {}

  ngOnInit(): void {}
}
