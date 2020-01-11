import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import { TableToolBarCommand } from 'app/shared/components/table-toolbar/table-toolbar.component';
import { DocFolderService } from './services/doc-folder.service';
import { environment } from 'environments/environment';

export interface PeriodicElement {
  id: string,
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  tableName: string = 'Doc Folder';
  toolbarCommands: TableToolBarCommand[] = [{
    name: 'add',
    matIcon: 'add',
    isDisabled: false,
    action: () => {
      console.log('add', this.selection.selected);
    }
  },
  {
    name: 'edit',
    matIcon: 'edit',
    isDisabled: true,
    action: () => {
      console.log('delete');
    }
  },
  {
    name: 'delete',
    matIcon: 'delete',
    isDisabled: false,
    action: () => {
      console.log('delete');
    }
  }];
  displayedColumns: string[] = ['select','position', 'name', 'weight', 'symbol','edit'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  docFolders: PeriodicElement[];
  constructor(private docFolderService: DocFolderService) {
  }

  ngOnInit() {
    console.log(environment.production);
    this.docFolderService.makeRealOnlineApiCall().subscribe(x => {
      
    });

    this.docFolderService.getAll().subscribe(x => {
       this.docFolders = x;
       console.log('all doc folders:', this.docFolders);
       this.dataSource = new MatTableDataSource<PeriodicElement>(this.docFolders);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
    });

      this.sort.sortChange.subscribe(x => {
        console.log('sort changed:', x);
        this.selection.clear();
      });

      this.paginator.page.subscribe(x => {
        console.log('page size or index changed:', x);
        this.selection.clear();
      });
  }
  onEdit(row: PeriodicElement) {
    console.log('onEdit:', row);
    row.name = 'update by cong';
    this.docFolderService.updateHero(row).subscribe(x => {
      console.log('updated', x);
    });
  }

  isAllSelected() {
   if (!this.selection.hasValue()) return false;
  
    const numSelected = this.selection.selected.length;
     /*
    const pageSize = this.dataSource.paginator.pageSize;
    const filterDataLength = this.dataSource.filteredData.length;

    if(filterDataLength<= pageSize){
      console.log('num selected:',numSelected,filterDataLength);
      return numSelected >= filterDataLength;
    }

    const remainingSize = this.dataSource.filteredData.length -(this.dataSource.paginator.pageIndex +1) * this.dataSource.paginator.pageSize;
  console.log('num selected and remaining:',numSelected,remainingSize);
    return numSelected >= remainingSize;
    */
   const skip = this.dataSource.paginator.pageIndex * this.dataSource.paginator.pageSize;
    const take = this.dataSource.paginator.pageSize;

    const currentData = this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);

    const currentPageData = currentData.filter((v, k) => k >= skip).slice(0, take);
    return numSelected >= currentPageData.length;
  }

  onCommand(e: Function) {
    e.apply(this);
  }

  onSearch(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filteredData);
    this.selection.clear();
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    console.log('isAllSelected', this.isAllSelected());
    this.isAllSelected() ? this.selection.clear() : this.selectRows();
  }

  selectRows() {
    const skip = this.dataSource.paginator.pageIndex * this.dataSource.paginator.pageSize;
    const take = this.dataSource.paginator.pageSize;

    const currentData = this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);

    const selectedData = currentData.filter((v, k) => k >= skip).slice(0, take);

    console.log('current page data:', selectedData);
    selectedData.forEach((x) => {
      this.selection.select(x);
    });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
