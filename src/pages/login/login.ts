import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
//import { HomePage } from '../home/home';
import { Http } from '../../http-api';
import { AnnouncementsPage } from '../announcements/announcements';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  adminUser: any;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public http: Http) {
    this.adminUser = new FormGroup({user: new FormControl(), pass: new FormControl()});
  }

  public loginAdmin(value: any)
  {
    var jsonArr = {
      "username" : "",
      "password" : ""
    };
    jsonArr.username = value.user;
    jsonArr.password = value.pass;

    this.http.post("/login", jsonArr).subscribe
    (
      (data) =>
      {      
        var jsonResp = JSON.parse(data.text());
        if(jsonResp.success)
        {
          this.presentToast("Logged in!");
          this.navCtrl.setRoot(AnnouncementsPage);
        }
        else
        {
          alert("Invalid Login. Try Again.");
        }
      },
      (error) =>
      {
        alert("Error: " + error);         
      }
    );
  }

  public openRegister()
  {
    alert("open reg page");
    this.navCtrl.push(RegisterPage);
  }

  presentToast(text){
    let toast = this.toastCtrl.create(
      {
        message: text,
        duration: 1500,
        position: 'bottom',
        dismissOnPageChange: false
      }
    );
    toast.present();
  }

}
