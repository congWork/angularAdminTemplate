import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface TableToolBarCommand {
  name: string;
  matIcon: string;
  isDisabled: boolean,
  action: Function
}

@Component({
  selector: 'app-table-toolbar',
  templateUrl: './table-toolbar.component.html',
  styleUrls: ['./table-toolbar.component.scss']
})
export class TableToolbarComponent implements OnInit {
@Input()
title: string;

@Input()
tableToolbarCommands: TableToolBarCommand[];

@Output()
search: EventEmitter<string> = new EventEmitter();

@Output()
command: EventEmitter<Function> = new EventEmitter();



  constructor() { }

  ngOnInit() {
  }
  onCommand(e){
    this.command.emit(e)
  }
  onSearch(e) {
    this.search.emit(e);
  }

}
