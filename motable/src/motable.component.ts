import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {DragulaService} from 'ng2-dragula';
import {DatatableComponent} from '@swimlane/ngx-datatable';

@Component({
  selector: 'motable',
  templateUrl: './motable.component.html',
  styleUrls: ['./motable.component.css']
})
export class MotableComponent implements OnInit {
  @Input() id: string;
  @Input() rows: Array<any>;
  @Input() columns: Array<any>;
  @Input() placeholder: string;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  selected = [];
  temp = [];
  isShowDragFilter = false;
  checkAllFlag = false;

  public allColumns: Array<any> = [];
  private filterProps: any[];

  @HostListener('document:click', ['$event', '$event.target']) clickedOutside($event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isShowDragFilter = false;
    }
  }

  constructor(private dragulaService: DragulaService, private elementRef: ElementRef) {
    this.elementRef = elementRef
    dragulaService.drop.subscribe(() => {
      this.onDrop();
    });
  }

  ngOnInit(): void {
    this.temp = this.rows;

    this.filterProps = this.columns.map((column) => {
      if (column.filter) {
        return column.prop;
      }
    });

    const queryColumns = this.getColumns();
    if (queryColumns) {
      const that = this;
      const localColumns = JSON.parse(queryColumns);
      if (localColumns.length && localColumns.length > 0) {
        that.columns = this.mergeColumns(localColumns, that.columns);
      }
    }

    this.allColumns = Object.assign([], this.columns);
  }

  private mergeColumns(localColumns: any, remoteColumns: any) {
    let mergeColumns = [];
    const columnsSets = this.getSameColumns(remoteColumns, localColumns);
    const combinedColumns = columnsSets.combinedColumns;
    const newColumns = columnsSets.newColumns;

    for (let i = 0; i < localColumns.length; i++) {
      const localColumn = localColumns[i];
      for (let j = 0; j < combinedColumns.length; j++) {
        const combinedColumn = combinedColumns[j];
        if (localColumn.name === combinedColumn.name) {
          mergeColumns.push(combinedColumn);
        }
      }
    }

    mergeColumns = mergeColumns.concat(newColumns);

    return mergeColumns;
  }

  private getSameColumns(remoteColumns: any, localColumns: any) {
    const combinedColumns = [];
    const newColumns = [];

    for (let index = 0; index < remoteColumns.length; index++) {
      const remoteColumn = remoteColumns[index];
      let isNewColumn = true;

      for (let j = 0; j < localColumns.length; j++) {
        const localColumn = localColumns[j];

        if (remoteColumn.name === localColumn.name) {
          remoteColumn.display = localColumn.display;
          combinedColumns.push(remoteColumn);
          isNewColumn = false;
        }
      }

      if (isNewColumn) {
        newColumns.push(remoteColumn);
      }
    }

    return {combinedColumns, newColumns};
  }

  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    if (event.type === 'click') {
      console.log('Activate Event', event);
    }
  }

  toggle(col) {
    const that = this;
    this.columns = this.columns.filter(column => {
      if (column.name === col.name) {
        column.display = !column.display;
        that.checkAllFlag = false;
      }
      return column;
    });

    this.saveColumns();
  }

  checkAllField() {
    const that = this;
    this.columns = this.columns.filter(column => {
      column.display = !that.checkAllFlag;
      return column;
    });

    that.checkAllFlag = !that.checkAllFlag;
    this.saveColumns();
  }

  updateFilter(event) {
    const that = this;
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (data) {
      for (let i = 0; i < that.filterProps.length; i++) {
        const prop = that.filterProps[i];
        if (prop) {
          return data[prop].toLowerCase().indexOf(val) !== -1;
        }
      }
    });

    this.rows = temp;
    this.table.offset = 0;
  }

  toggleShowFilter() {
    this.isShowDragFilter = !this.isShowDragFilter;
  }

  private onDrop() {
    this.saveColumns();
  }

  private saveColumns() {
    localStorage.setItem(this.getTableStorageKey(), JSON.stringify(this.columns));
  }

  private getTableStorageKey() {
    return 'query.columns' + '.' + this.id;
  }

  private getColumns() {
    return localStorage.getItem(this.getTableStorageKey());
  }
}
