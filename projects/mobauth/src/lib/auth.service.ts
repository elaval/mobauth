import { Platform } from '@ionic/angular';
import { Injectable, NgZone } from '@angular/core';

import { IonicAuth, IonicAuthorizationRequestHandler, DefaultBrowser, AuthActions} from 'ionic-appauth';
import { CordovaRequestorService } from './cordova-requestor.service';
import { BrowserService } from './browser.service';
import { SecureStorageService } from './secure-storage.service';
import { StorageService } from './storage.service';
import { RequestorService } from './requestor.service';
import { IonicImplicitRequestHandler } from 'ionic-appauth/lib/implicit-request-handler';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import * as jwtnewLocal from "jwt-decode";

const JWT = jwtnewLocal;

export interface UserInfo {
  upn?: string;
  uniqueId?: string;
  email?: string;
  name?: string;
}

export interface Claims {
  "aud": string;
  "iss": string;
  "exp": number;
  "appid": string;
  "family_name": string;
  "given_name": string;
  "name": string;
  "unique_name": string;
  "upn": string;
}


@Injectable({
  providedIn: 'root'
})
//export class AuthService   {
export class AuthService extends IonicAuth  {
  tokenResponse: any;
  authenticated: boolean;

  authSubject = new BehaviorSubject(null);
  authObs = this.authSubject.asObservable();


  // Observable that notifies when login has succeded
  private loginSubject = new BehaviorSubject<UserInfo>(null)
  loginObservable = this.loginSubject.asObservable();
  _userInfo: any;

  constructor(
    requestor : RequestorService,
    cordovaRequestor : CordovaRequestorService,
    secureStorage : SecureStorageService,
    browser : BrowserService,
    private platform : Platform,
    private ngZone: NgZone,
  ){
    
    super(
      (platform.is('cordova')) ? browser : undefined,
      (platform.is('cordova')) ? secureStorage : undefined,
      (platform.is('cordova')) ? cordovaRequestor : requestor,
      undefined, undefined,
      (platform.is('cordova')) ? new IonicAuthorizationRequestHandler(browser, secureStorage) : new IonicImplicitRequestHandler(new DefaultBrowser(), undefined)
    );

    if(this.platform.is("cordova")){
      (<any>window).handleOpenURL = (callbackUrl) => {  
        this.ngZone.run(() => {
            this.handleCallback(callbackUrl);
        });
      };
    }    
    
    this.authObservable.subscribe(action => { 
      this.authSubject.next(action); 
    },
    err => {
      console.error(err);
      this.authSubject.error(err);
    })
    
    
  }

  public async startUpAsync() {
    super.startUpAsync();
  }

  
  addConfig(options){
    if(this.platform.is("cordova")){
      this.authConfig = { 
        identity_client: options.clientId, 
        identity_server: options.identityServer,
        redirect_url: options.redirectURL,
        scopes: options.scopes,
        usePkce: options.usePkce, 
        end_session_redirect_url:options.endSessionRedirectURL        
      }
    }else{
      this.authConfig = { 
        identity_client: options.clientId, 
        identity_server: options.identityServer, 
        redirect_url: options.redirectURL, 
        scopes: options.scopes,
        usePkce: options.usePkce,
        end_session_redirect_url: options.endSessionRedirectURL, 
      }
    }
  }
 
  private handleCallback(callbackUrl: string): void {
    if ((callbackUrl).indexOf(this.authConfig.redirect_url) === 0){
      this.AuthorizationCallBack(callbackUrl);
    }
    
    if ((callbackUrl).indexOf(this.authConfig.end_session_redirect_url) === 0){
      this.EndSessionCallBack();
    }
  }


  logout(): Promise<any>{
    const TOKEN_RESPONSE_KEY = "token_response";
    this.storage.removeItem(TOKEN_RESPONSE_KEY)
    .then((d) => {
      //console.log(`Removed: ${d}`)
    })
    .catch(err => {
      console.error(err);
    });
    return this.signOut();
  }

  login() {
    this.authSubject.next({
      action:"test-login"
    })

    return this.signIn()
    .then( d => {
      //console.log(d);
    })
    .catch( err => {
      console.error(err);
    });
  }

  silentLogin() {
    return this.startUpAsync();
  }

  /**
   * Gets the claims included in the access toke
   * Particularly:  upn (email) &  name
   */
   async getUserClaims() {
    return new Promise((resolve, reject) => {
      this.getToken()
      .subscribe(token => {
        const claims:Claims = JWT(token); 
        resolve(claims);
      },
      err => {
        reject(err);
      }
      );
    })
  }

  getToken():Observable<string> {
    const subject = new Subject<string>();

    this.getValidToken()
    .then(tokenResponse => {
      subject.next(tokenResponse['accessToken']);
    })
    .catch(err => {
      subject.error(err);
    })


    return subject.asObservable()
  }

  private notifyLogin() {

    this.getUserClaims()
    .then((claims:Claims) => {

      this._userInfo = {
        upn: claims.upn,
        uniqueId: claims.upn,
        email : claims.upn,
        name : claims.name
      };

      this.loginSubject.next(this._userInfo);
    })
    .catch(err => {
      this.loginSubject.error(err);
    })
  }
  
}
