import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public rows: Array<any> = [];
  public columns: Array<any> = [];
  public placeholder: string;

  ngOnInit(): void {
    this.placeholder = '搜索...';
    this.columns = [
      {name: '用途', prop: 'usage'},
      {name: '用途2', prop: 'usage2'}
    ];

    this.rows = [
      {
        'usage': '客户付款 1',
        'usage2': '客户付款 1 用途2'
      }, {
        'usage': '客户付款 2',
        'usage2': '客户付款 2 用途2'
      }
    ];
  }
}
