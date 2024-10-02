import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Data } from '../Data';

@Component({
  selector: 'app-data-item',
  templateUrl: './data-item.component.html',
  styleUrls: ['./data-item.component.css']
})
export class DataItemComponent implements OnInit {
  @Input() data = new Data();
  @Output() delteItemEvent: EventEmitter<Data> = new EventEmitter();
  @Output() openModalEvent: EventEmitter<Data> = new EventEmitter();
  @Output() setSelectedItemEvent: EventEmitter<any> = new EventEmitter();

  selectedIds: Set<string> = new Set();
  datas: Data[] | null = null;
  constructor() {
  }
  ngOnInit(): void {}

  onDeleteClick(dataItem: Data) {
    this.delteItemEvent.emit(dataItem);
  }

  onEditClick(item: Data){
    this.openModalEvent.emit(item);
  }
  eventToAddInSet(item: Data){
    this.setSelectedItemEvent.emit(item);
  }
}
