import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { IAuthResData, AuthService } from "./auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
  isLoginMode = true;
  isLoading = false;
  errorMsg: string | null = null;
  authObsv: Observable<IAuthResData> | any ;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static :false}) alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(private authService: AuthService, private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    const {email, password } = form.value;
    console.log(email,password);
    if (!form.valid || !email || !password) return;

    if (this.isLoginMode) {
     this.authObsv
      = this.authService.loginWithEmailPassword({email, password,});

    } else {
     this.authObsv = this.authService.signUpWithEmailPassword({email, password,});
     }

    this.authObsv.subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/Welcome']);
      },

      error: (res: HttpErrorResponse) => {
        console.log(res);
        this.errorMsg = res?.error?.error?.message || 'Something went wrong... Ugh Oh!';
        this.showErrorAlert(this.errorMsg);
    },
      complete: () => {
        console.log('Complete!');
      form.reset();
    },
  });
};

   toggleAuthMode(): any {
    throw new Error("Function not implemented.");
  }
  onHandleError(){
    this.error = null;
  }

  ngOnDestroy(){
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });

  }


}




