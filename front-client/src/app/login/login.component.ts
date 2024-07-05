import { Component } from '@angular/core';
import { AuthService } from '@app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.username, this.password);
  }
}