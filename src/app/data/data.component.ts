import { Component, Input, OnInit } from '@angular/core';
import { Data } from '../Data';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit{
  datas: Data[];
  localItem:any;
  selectedIds: Set<string> = new Set();
  
  constructor() { 
    const localItem = window.localStorage.getItem('data');
    this.datas = localItem ? JSON.parse(localItem) : [];
  }
  ngOnInit(): void { 
  }
  
  addItem(itemToAdd: Data){
    this.datas.unshift(itemToAdd);
    window.localStorage.setItem('data',JSON.stringify(this.datas));
    location.reload();
  }

  deleteItem(itemToDelete: Data){
    const indexOfItem = this.datas.findIndex(data => data.id === itemToDelete.id );
    this.datas.splice(indexOfItem,1);
    window.localStorage.setItem('data',JSON.stringify(this.datas));
    location.reload();
  }

  deleteSelectedItems() {
    this.datas = this.datas.filter(data => !this.selectedIds.has(data.id));
    window.localStorage.setItem('data', JSON.stringify(this.datas));
    this.selectedIds.clear();
    location.reload();
  }

  setSelectedItems(item: Data) {
    item.selected = !item.selected;
    if (this.selectedIds.has(item.id)) {
      this.selectedIds.delete(item.id);
    } else {
      this.selectedIds.add(item.id);
    }
    console.log(this.selectedIds)
  }

  onSelectChange(data: Data) {
    data.selected = !data.selected;
    console.log(data.selected)
  }

  selectedData: Data | null = null;
  openModal(item: Data) {
    this.selectedData = { ...item };
    const modal = document.getElementById('staticBackdrop');
    if (modal) {
      modal.classList.add('show');
      modal.setAttribute('style', 'display: block;');
      document.body.style.overflow = "hidden";
      
      const backdrop = document.createElement('div');
      backdrop.className = 'modal-backdrop fade show';
      document.body.appendChild(backdrop);
    }
  }
}
