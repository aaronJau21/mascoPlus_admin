import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { ILoginResponse, IUser, LoginDto } from '../../domain';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly api = environment.API_URL;

  public token = signal<string>('');
  public user = signal<IUser>({
    name: '',
    role: '',
  });

  public login(dto: LoginDto): Observable<boolean> {
    const url = `${this.api}/auth/login`;
    return this.http
      .post<ILoginResponse>(url, dto)
      .pipe(map((r: ILoginResponse) => this.saveLocalStorage(r)));
  }

  private saveLocalStorage(res: ILoginResponse) {
    if (res && res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      return true;
    }

    return false;
  }
}
