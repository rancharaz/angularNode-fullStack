import { Injectable,EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';/* use to call api */
import { SignUp, login } from '../data-type/data-type';
import { BehaviorSubject } from 'rxjs';/* adding datatype for change */
import { Router } from '@angular/router';/* router directing page */



@Injectable({
  providedIn: 'root'
})
export class SellerService {
/* instantiate isSellerLoggedIn add datatype as false behaviour */
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);


  isLoginError= new EventEmitter<boolean>(false);

/* instantiate httpclient for calling api for usage */
  constructor(private http:HttpClient, private router:Router) { }

  /* signup service */
  /* data object from data function signup  //datatype in data  */
  userSignup(data:SignUp){
    /* post method */
    this.http.post('http://localhost:3000/seller', data, {
      observe:'response'
    }).subscribe((result) => {
      /* turn isSellerLoggedIn true  */
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
     

    })
  }
  /* if seller data true navigate */
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }




/* datatype in datatype file */
  userLogin(data:login){
    /* api call code will be there */
    /* auto filter by url */
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, {
      observe:'response'
    }).subscribe((result:any) => {
      console.warn(result);
      /* if in result is data =  login else !login */
      if(result && result.body && result.body.length){
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      } else {
 
        this.isLoginError.emit(true);
      }
    })
  }


}
