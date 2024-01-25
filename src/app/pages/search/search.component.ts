import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
entersearchValue:string='';
@Output()
  searchTextChanged:EventEmitter<string>=new EventEmitter<string>()
  onsearchTextChanged(){
    this.searchTextChanged.emit(this.entersearchValue)
    
  }
}
