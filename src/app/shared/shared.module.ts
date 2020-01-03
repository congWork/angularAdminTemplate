import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableToolbarComponent } from './components/table-toolbar/table-toolbar.component';
import { MatToolbarModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatInputModule } from '@angular/material';

const materials = [
   MatToolbarModule,
   MatFormFieldModule,
   MatIconModule,
   MatMenuModule,
   MatInputModule
];
@NgModule({
  declarations: [TableToolbarComponent],
  imports: [
    CommonModule,
    ...materials
  ],
  exports: [
    TableToolbarComponent
  ]
})
export class SharedModule { }
