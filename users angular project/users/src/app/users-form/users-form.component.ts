import { UsersService } from './../users.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formdata } from '../user';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css'],
})
export class UsersFormComponent implements OnInit {
  constructor(private fb: FormBuilder, private userService: UsersService) {}

  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  passwordPattern: string = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,12}$';
  api: string = 'https://test111.free.beeceptor.com/my/api/path';

  userForm: any;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(this.emailPattern),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(this.passwordPattern),
            Validators.minLength(6),
            Validators.maxLength(12),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(this.passwordPattern),
            Validators.minLength(6),
            Validators.maxLength(12),
          ],
        ],
      },
      this.mustMatch('password', 'confirmPassword')
    );
  }

  onSubmit() {
    const { email, password, confirmPassword } = this.userForm.getRawValue();
    const data = this.userForm.getRawValue();
    const newObj: any = {
      email: email,
      password: password,
    };
    if (this.userForm.valid) {
      this.userService.postFormData(newObj);
    }
  }

  mustMatch(pass: string, confirmPass: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls[pass];
      const confirmPassword = formGroup.controls[confirmPass];

      if (confirmPassword.errors && !confirmPassword.errors['mustMatch']) {
        return;
      }

      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ mustMatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
      return null;
    };
  }
}
// Dugme submit na koje ce ako je forma validna slati podatke na endpoint https://test111.free.beeceptor.com/my/api/path
// (objekat sa emailom i passwordom samo)
