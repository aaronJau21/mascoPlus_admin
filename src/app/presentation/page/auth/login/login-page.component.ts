import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../../../use-case/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  private route = inject(Router);

  public isLoadin = signal<boolean>(false);

  public loginForm = this.fb.group({
    user_name: ['', Validators.required],
    password: ['', Validators.required],
  });

  public loginSubmit() {
    const data = {
      user_name: this.loginForm.value.user_name as string,
      password: this.loginForm.value.password as string,
    };

    if (data.user_name === '' || data.password === '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    this.isLoadin.set(true);

    return this.authService.login(data).subscribe({
      next: () => {
        this.toastr.success(`Bienvenido`, 'Exitoso');
        setTimeout(() => {
          this.route.navigateByUrl('/dashboard/home');
        }, 2000);
      },
      error: (r) => {
        if (r.status === 404) {
          this.toastr.error('Credenciales Incorrectas', 'Error');
          this.timeoutSpinner();
        } else {
          this.toastr.error('Error del Servidor', 'Error');
          this.timeoutSpinner();
        }
      },
      complete: () => {
        this.timeoutSpinner();
      },
    });
  }

  private timeoutSpinner() {
    setTimeout(() => {
      this.isLoadin.set(false);
    }, 2000);
  }
}
