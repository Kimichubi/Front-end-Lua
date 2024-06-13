import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../service/user.service';
import { AlertFailComponent } from '../common/alert-fail/alert-fail.component';
import { AlertSuccessComponent } from '../common/alert-success/alert-success.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    AlertFailComponent,
    AlertSuccessComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UserService],
})
export class LoginComponent {
  constructor(private userService: UserService) {}

  @Input() loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  textFail: string = '';
  textSuccess: string = 'Redirecionando em 3 segundos';
  isNotMatch: boolean = false;
  isMatch: boolean = false;

  handleSubmit() {
    this.userService
      .login(this.loginForm.value.email!, this.loginForm.value.password!)
      .subscribe(
        (response) => {
          if (response) {
            sessionStorage.setItem('token-api', response.access_token);
          }
          this.isMatch = true;
          setTimeout(() => {
            this.isMatch = false;
          }, 3000);
        },
        (error) => {
          console.error('Erro ao fazer login:', error);
          this.textFail = 'Erro ao fazer login. Por favor, tente novamente.';
          this.isNotMatch = true;
          setTimeout(() => {
            this.isNotMatch = false;
          }, 3000);
        }
      );
  }
}
