import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, DestroyRef } from '@angular/core';
import { IUserCardEmitter, UserCardComponent } from '../user-card/user-card.component';
import { MatDialog } from '@angular/material/dialog'
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IUser } from '../../models/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { Store } from '@ngrx/store'
import { createUser, editUser, loadUsers, removeUser, selectAllUsers } from '../../data-access';
import { pluck } from 'rxjs';

@Component({
  selector: 'users-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  private store = inject(Store)
  public dialog = inject(MatDialog)
  private destroyRef = inject(DestroyRef);
  public users$ = this.store.select(selectAllUsers)



  private optionsForDialog = {
    width: '600px',
    height: 'fit-content'
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers())
  }

  public createUser(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, this.optionsForDialog)
    dialogRef.componentInstance.isEdit = false
    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(userInfo => {
      if (userInfo) {
        let createdUser = {
          id: Math.round(Math.random() * 100),
          ...userInfo
        }
        this.store.dispatch(createUser({ user: createdUser }))
      }
    })
  }

  public editUser(user: IUser) {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      ...this.optionsForDialog,
      data: user
    })
    dialogRef.componentInstance.isEdit = true
    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(userInfo => {
      if (userInfo) {
        let editedUser = {
          ...user,
          ...userInfo
        }
        this.store.dispatch(editUser({ editedUser: editedUser }))
      }
    })
  }

  public deleteUser(сardEmitter: IUserCardEmitter): void {
    сardEmitter.event.stopPropagation()
    this.store.dispatch(removeUser({ userId: сardEmitter.id }))
  }

}
