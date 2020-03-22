import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';

import { IUser } from 'src/app/shared/models';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
  ) {}

  createUser(name: string, email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        const user: IUser = {
          uid: resp.user.uid,
          email: resp.user.email,
          name,
        };

        this.afDB.doc(`${ user.uid }/user`)
          .set(user)
          .then(() => this.router.navigate(['/']))
          .catch(error => this.showError(error));
      })
      .catch(error => this.showError(error));
  }

  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['/']))
      .catch(error => this.showError(error));
  }

  logout() {
    this.afAuth.auth
      .signOut()
      .then(() => this.router.navigate(['/auth/login']))
      .catch(error => this.showError(error));
  }

  isAuth(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        map((fbUser: firebase.User) => {
          return fbUser != null;
        }),
      );
  }

  isNoAuth(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        map((fbUser: firebase.User) => {
          return fbUser == null;
        }),
      );
  }

  private showError(error: any) {
    console.error(error);
    this.snackBar.open(error.message, this.translate.instant('auth.login.close'), {
      duration: 5000,
    });
  }
}
