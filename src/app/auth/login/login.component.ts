import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {environment} from '../../../environments/environment';
import {GlobalService} from '../../shared/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginError: string;
  registerForm: FormGroup;
  processing = false;
  isCaptchaNecessary;
  captcha = null;
  @ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private globalService: GlobalService) {
     this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });

    /*this.registerForm= this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      name: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      captcha: ['']

    });*/
  }

  ngOnInit(): void {
    this.globalService.isCaptchaNecessary.subscribe((res) => {
      this.isCaptchaNecessary = res;
     if(this.isCaptchaNecessary){
       console.log("rendering captcha");
       this.addRecaptchaScript();
     }
    /* else{
       this.unrenderCaptcha();
     }*/
    });

  }

  registerUser() {
    this.loginError = "";
    this.processing = true;
    let data = this.registerForm.value;
    data['captcha'] = this.captcha;
    this.authService.register(this.registerForm.value).subscribe((res) => {
      this.processing = false;
      alert("Registration Successful!");
      this.registerForm.reset();
      this.globalService.setCaptchaToNecessary(false);
      this.resetCaptcha();
      this.captcha = '';
      //this.router.navigateByUrl('dashboard');


    }, (err) => {
      console.log(err);
      this.processing = false;
      this.loginError = err.error.error;
      if(err.status === 406) {
       this.globalService.setCaptchaToNecessary(true);
      }

    });

  }

  addRecaptchaScript() {

    window['grecaptchaCallback'] = () => {
      if (this.isCaptchaNecessary) {
        this.renderReCaptcha();
      }

    };

    (function(d, s, id, obj){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));

  }
  unrenderCaptcha(){
    this.recaptchaElement.nativeElement = '';
  }
  renderReCaptcha() {
    window['grecaptcha'].render(this.recaptchaElement.nativeElement, {
      'sitekey' : environment.captchaKey,
      'callback': (response) => {
        this.captcha = response;
      }
    });
  }
  resetCaptcha(){
    window['grecaptcha'].reset();
  }

}
