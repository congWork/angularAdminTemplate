import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routing';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatCheckboxModule
} from '@angular/material';

const materials = [
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatCheckboxModule
];
@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    ...materials,
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    UserProfileComponent
  ]
})
export class UserModule { }
