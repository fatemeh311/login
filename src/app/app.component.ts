import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isUsernameValid: boolean = true;
  username: string = '';
password: string = '';
error: any = null;

constructor(
  private loginService: LoginService,
) { }

ngOnInit(): void {
  this.loginService
    .errorMessage
    .subscribe((errorMessage: any) => {
      this.error = errorMessage;
    });
}

  validateUsername(): void {
    const pattern = RegExp(/^[\w-.]*$/);
    if (pattern.test(this.username)) {
        this.isUsernameValid = true;    
    } else {
        this.isUsernameValid = false;
    }
}

onKey(event: any, type: string) {
  if (type === 'username') {
      this.username = event.target.value;
  } else if (type === 'password') {
      this.password = event.target.value;
  }
}
onSubmit() {
  if (this.isUsernameValid) {
    this.loginService
      .login(this.username, this.password);
  }
}
}

