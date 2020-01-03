import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
export enum Command {
  add,
  edit,
  delete
};

@Component({
  selector: 'app-table-toolbar',
  templateUrl: './table-toolbar.component.html',
  styleUrls: ['./table-toolbar.component.scss']
})
export class TableToolbarComponent implements OnInit {
@Input()
title: string;

@Output()
search: EventEmitter<string> = new EventEmitter();

@Output()
command: EventEmitter<Command> = new EventEmitter();


CommandType = Command;
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
