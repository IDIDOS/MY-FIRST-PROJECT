import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../../models/user';

export interface IUserCardEmitter {
  event: MouseEvent,
  id: number
}
@Component({
  selector: 'user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  @Input({ required: true })
  user!: IUser

  @Output()
  onDeleteUser = new EventEmitter<IUserCardEmitter>();

  deleteUser(event: MouseEvent, id: number) {
    this.onDeleteUser.emit({ event, id });
  }
}
