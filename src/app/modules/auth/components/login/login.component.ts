import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginDto } from '../../models/login.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public defaultAuth: LoginDto = {
    email: '',
    password: '',
  };

  public loginForm = this.fb.group({
    email: [
      this.defaultAuth.email,
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
      ]),
    ],
    password: [
      this.defaultAuth.password,
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    ],
  });

  public hasError = false;
  public returnUrl = '/';
  public isLoading = false;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // redirect to home if already logged in
    /* if (this.authService.currentUser) {
      this.router.navigate(['/']);
    } */
  }

  public ngOnInit(): void {
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  async submit(): Promise<void> {
    if (this.isLoading) { return; }
    this.hasError = false;
    this.isLoading = true;
    try {
      await this.authService.login(this.f['email'].value, this.f['password'].value);
    } catch (error) {
      console.log('error :>> ', error);
      this.isLoading = false;
      this.hasError = true;
      return;
    }
    this.isLoading = false;
    this.router.navigate([this.returnUrl || 'dashboard']);
  }
}
