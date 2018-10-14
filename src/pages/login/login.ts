import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
//import { HomePage } from '../home/home';
import { Http } from '../../http-api';
import { AnnouncementsPage } from '../announcements/announcements';
import { RegisterPage } from '../register/register';
import { GlobalProvider } from "../../providers/global/global";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  adminUser: any;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public http: Http, public global: GlobalProvider) {
    this.adminUser = new FormGroup({user: new FormControl(), pass: new FormControl()});
  }

  public login(value: any)
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
			if (jsonResp.JSONRes.success)
			{
        if (jsonResp.JSONRes.verified)
        {
          this.presentToast("Logged in!");
          this.global.myUsrID = jsonResp.JSONRes.usrID;
          this.global.mySurname = jsonResp.JSONRes.surname;
          this.global.isHK = jsonResp.JSONRes.isHK;
          
          this.navCtrl.setRoot(AnnouncementsPage);
        }
        else
          this.presentToast("Your account has not yet been verified. Please try again later.");
			}
			else
			{
				this.presentToast("Invalid Login. Try Again.");
			}
		},
		(error) =>
		{
			this.presentToast("Error: " + error);         
		}
	);
  }

  public openRegister()
  {
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
