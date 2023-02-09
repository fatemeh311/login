import { AuthService } from './services/guards/auth.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
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
  private auth: AuthService,
  private router: Router
) { }

ngOnInit(): void {
  // this.loginService
  //   .errorMessage
  //   .subscribe((errorMessage: any) => {
  //     this.error = errorMessage;
  //   });
}

onSubmit() {
  this.auth.login(this.username, this.password)
  .pipe(first()).subscribe(
    result => this.router.navigate(['dashboard']),
    err => this.error = 'دسترسي ندارين'
  );
}
}

