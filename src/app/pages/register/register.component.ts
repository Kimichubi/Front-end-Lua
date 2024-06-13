import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertFailComponent } from '../common/alert-fail/alert-fail.component';
import { AlertSuccessComponent } from '../common/alert-success/alert-success.component';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    AlertFailComponent,
    AlertSuccessComponent,
  ],
  providers: [UserService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private userService: UserService) {}

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
