import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, DestroyRef } from '@angular/core';
import { UserApiService } from '../../services/user-api.service';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { MatDialog } from '@angular/material/dialog'
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IUser } from '../../models/user';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { LocalStorageService } from '../../services/local-storage.service';


@Component({
  selector: 'users-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  private userApiService = inject(UserApiService)
  public userService = inject(UserService)
  public dialog = inject(MatDialog)
  private destroyRef = inject(DestroyRef);

  private localStorageService = inject(LocalStorageService)



  private optionsForDialog = {
    width: '600px',
    height: 'fit-content'
  }

  ngOnInit(): void {
    if (localStorage.length) {
      this.userService.users = this.localStorageService.getUsers()
    }
    else {
      this.userApiService.getUsers()
        .pipe(
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(users => {
          this.userService.users = users;
          this.localStorageService.saveUsers(users)
        })
    }
  }

  public createUser(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, this.optionsForDialog)
    dialogRef.componentInstance.isEdit = false
    dialogRef.afterClosed().subscribe(userInfo => {
      if (userInfo) {
        let createdUser = {
          id: this.userService.users.length + 1,
          ...userInfo
        }
        this.userService.createUser(createdUser)
        this.localStorageService.saveUsers(this.userService.users)
      }
    })
  }

  public editUser(user: IUser) {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      ...this.optionsForDialog,
      data: user
    })
    dialogRef.componentInstance.isEdit = true
    dialogRef.afterClosed().subscribe(userInfo => {
      if (userInfo) {
        let editedUser = {
          ...user,
          ...userInfo
        }
        this.userService.editUser(editedUser)
        this.localStorageService.saveUsers(this.userService.users)
      }
    })
  }

  public deleteUser(id: number, event: MouseEvent): void {
    event.stopPropagation()
    this.userService.deleteUser(id);
    this.localStorageService.deleteUser(id)
  }

}
