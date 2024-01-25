import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvancedSortableDirective } from '../tables/advancedtable/advanced-sortable.directive';
import { Table } from '../tables/advancedtable/advanced.model';
import { AdvancedService } from '../tables/advancedtable/advanced.service';

@Component({
  selector: 'app-member-titles',
  templateUrl: './member-titles.component.html',
  styleUrls: ['./member-titles.component.scss']
})
export class MemberTitlesComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  // Table data
  tableData: Table[];
  public selected: any;
  hideme: boolean[] = [];
  tables$: Observable<Table[]>;
  total$: Observable<number>;
  editableTable: any;
  @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;
  public isCollapsed = true;

  constructor(public service: AdvancedService) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
  }
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Member Titles' }, { label: 'Member Titles', active: true }];
   
  }

}
