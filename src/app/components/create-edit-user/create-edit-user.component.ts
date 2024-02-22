import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,

} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { inject } from '@angular/core';

@Component({
  selector: 'create-edit-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    ReactiveFormsModule

  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.css'
})
export class CreateEditUserComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<CreateEditUserComponent>)
  public formGroup!: FormGroup
  public isEdit: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required, Validators.minLength(2)
      ]),
      phone: new FormControl('', [
        Validators.required, Validators.minLength(5)
      ]),
      email: new FormControl('', [
        Validators.required, Validators.email
      ]),
      company: new FormControl('', [
        Validators.required, Validators.minLength(4)
      ])
    });
    if (this.data) {
      this.formGroup.patchValue({
        name: this.data.name,
        phone: this.data.phone,
        email: this.data.email,
        company: this.data.company.name || this.data.company
      })
    }
  }
  public onSubmit(): void {
    this.dialogRef.close(this.formGroup.value)
  }
}
