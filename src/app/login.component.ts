import { Component, OnInit } from '@angular/core';
import { Routes, Router, RouteSegment, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import {
  AuthMethods,
  AuthProviders,
  defaultFirebase,
  AngularFire,
  FIREBASE_PROVIDERS,
  FirebaseListObservable,
  FirebaseAuthState,
  FirebaseApp} from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})

export class LoginComponent {

  loginAlert: boolean;
  loginAlertMsg: string;
  loginAlertType: string;

  user: FirebaseAuthState;

  constructor(
    public af: AngularFire,
    public router: Router) {
    af.auth
          .do(v => this.userCredentials(v))
          .subscribe(user => this.userCredentials(user))
  }

  /* login user */
  loginUser(email: string, password: string) {
    this.af.auth.login({ email, password }, {
      method: AuthMethods.Password,
      provider: AuthProviders.Password
    })
      .then((user) => this.loginSuccess(user))
      .catch(e => this.loginFailed(e));
  }
  logoutUser() {
    this.af.auth.logout();
    this.router.navigate(['/login']);
  }
  loginSuccess(user) {
    this.loginalert('info', 'Login successfull.', true);
    this.checkCredentials();
  }
  loginFailed(e) {
    this.loginalert('danger', 'Login ' + e, true);
  }

  userCredentials(user) {
    this.user = user;
  }
  checkCredentials() {
    if (this.user != null)
      this.router.navigate(['/howdy']);
    else
      this.router.navigate(['/login']);
  }

  /* Alert */
  loginalert(type, msg, status) {
    this.loginAlertType = type;
    this.loginAlertMsg = msg;
    this.loginAlert = status;
  }
  closeAlert() {
    this.loginAlert = false;
  }

}