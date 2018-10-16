import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
//import { HomePage } from '../home/home';
import { Http } from '../../http-api';
import { AnnouncementsPage } from '../announcements/announcements';
import { RegisterPage } from '../register/register';
import { GlobalProvider } from "../../providers/global/global";
import { presentToast, handleError } from '../../app-functions';

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
          presentToast(this.toastCtrl,"Logged in!");
          this.global.myUsrID = jsonResp.JSONRes.usrID;
          this.global.mySurname = jsonResp.JSONRes.surname;
          this.global.isHK = jsonResp.JSONRes.isHK;
          if (jsonResp.JSONRes.isTheBestCoder)
            this.global.isHK = true;
          
          this.navCtrl.setRoot(AnnouncementsPage);
        }
        else
          presentToast(this.toastCtrl,"Your account has not yet been verified. Please try again later.");
			}
			else
			{
				presentToast(this.toastCtrl,"Invalid Login. Try Again.");
			}
		},
		(error) =>
		{
			handleError(this.navCtrl,error,this.toastCtrl);         
		}
	);
  }

  public openRegister()
  {
	  this.navCtrl.push(RegisterPage);
  }
}
