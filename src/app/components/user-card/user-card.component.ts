import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../models/user';

@Component({
  selector: 'user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input()
  user!: IUser

  @Output()
  onDeleteUser = new EventEmitter<MouseEvent>();

  deleteUser(event: MouseEvent) {
    this.onDeleteUser.emit(event);
  }
}
