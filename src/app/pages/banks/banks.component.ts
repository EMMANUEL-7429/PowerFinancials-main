import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss']
})
export class BanksComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  radialoptions;  
  public isCollapsed = false;
  constructor() { }

  ngOnInit(): void { this.breadCrumbItems = [{ label: 'Apps' }, { label: 'Bank', active: true }];

  this.radialoptions =  {
    series: [76],
    chart: {
      height: 150,
      type: 'radialBar',
      sparkline: {
        enabled: true
      }
    },
    colors: ['#556ee6'],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: '97%',
          margin: 5, // margin is in pixels
        },
        hollow: {
          size: '60%',
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            offsetY: -2,
            fontSize: '16px'
          }
        }
      }
    },
    grid: {
      padding: {
        top: -10
      }
    },
    stroke: {
      dashArray: 3
    },
    labels: ['Storage'],
  }
}

}
