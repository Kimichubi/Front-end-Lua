import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertFailComponent } from '../common/alert-fail/alert-fail.component';
import { AlertSuccessComponent } from '../common/alert-success/alert-success.component';

import { NgOptimizedImage } from '@angular/common';
import { UserService } from '../../service/user/user.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    AlertFailComponent,
    AlertSuccessComponent,
    NgOptimizedImage,
  ],
  providers: [UserService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  textFail: string = 'Senhas inseridas são diferentes!';
  textSuccess: string = 'Sucesso conta criada!';
  isNotMatch: boolean = false;
  isMatch: boolean = false;

  handleSubmit() {
    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      this.isNotMatch = true;
      setTimeout(() => {
        this.isNotMatch = false;
      }, 3000);
      return;
    } else {
      this.userService
        .createUser(
          this.registerForm.value.email!,
          this.registerForm.value.name!,
          this.registerForm.value.password!
        )
        .subscribe(
          (response) => {
            this.isMatch = true;
            if (this.isMatch) {
              this.router.navigate([''], { queryParams: { registered: true } });
            }
            setTimeout(() => {
              this.isMatch = false;
            }, 3000);
          },
          (error) => {
            console.error('Erro ao criar conta:', error);
            this.textFail = 'Erro ao criar conta. Por favor, tente novamente.';
            this.isNotMatch = true;
            setTimeout(() => {
              this.isNotMatch = false;
            }, 3000);
          }
        );
    }
  }
}
