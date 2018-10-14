import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl} from '@angular/forms';
import { Http } from '../../http-api';
import { LoginPage } from '../login/login'

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
    regUser:any;

    constructor(public http: Http, public navCtrl: NavController, public toastCtrl: ToastController)
    {
        this.regUser = new FormGroup({
            fname: new FormControl(),
            sname: new FormControl(),
            email: new FormControl(),
            username: new FormControl(),
            studentnumber: new FormControl(),
            firstyearyear: new FormControl(),
            bedieningtable: new FormControl(),
            semi: new FormControl(),
            password: new FormControl(),
            confirmpassword: new FormControl(),
        });
    }

    public registerUser(value: any)
    {
        var regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value.fname == null || value.fname == "")
        {
            this.presentToast("Please fill in your name.");
            return false;
        }
        else if (value.sname == null || value.sname == "")
        {
            this.presentToast("Please fill in your surname.");
            return false;
        }
        else if (!regexEmail.test(value.email)) {
            this.presentToast("Please enter a valid email address.");
            return false;
        }
        else if (value.username == null || value.username == "")
        {
            this.presentToast("Please fill in your username.");
            return false;
        }
        else if (value.studentnumber == null || value.studentnumber == "")
        {
            this.presentToast("Please fill in your student number.");
            return false;
        }
        else if (value.firstyearyear == null || value.firstyearyear < 1916)
        {
            this.presentToast("Please fill in your first year year.");
            return false;
        }
        else if (value.bedieningtable == null || !(value.bedieningtable >= 1 && value.bedieningtable <= 11))
        {
            this.presentToast("Please select the table you sit at bedienings.");
            return false;
        }
        else if (value.password == null || value.password == "")
        {
            this.presentToast("Please fill in your password.");
            return false;
        }
        else if (value.confirmpassword == null || value.confirmpassword == "")
        {
            this.presentToast("Please fill in your confirm password.");
            return false;
        }
        else if (value.password != value.confirmpassword)
        {
            this.presentToast("Please ensure that your passwords match.");
            return false;
        }
        else
        {
            var HKMode = false;
            if (value.bedieningtable == 1)
            {
                HKMode = true;
            }

            if (value.semi == null)
                value.semi = false;
            var jsonArr: any = {
                username: value.username,
                password: value.password,
                email: value.email,
                name: value.fname,
                surname: value.sname,
                studentnumber: value.studentnumber,
                firstyearyear: value.firstyearyear,
                bedieningtable: value.bedieningtable,
                semi: value.semi,
                isHk: HKMode
            };        
            this.http.post("/addUser", jsonArr).subscribe
            (
                (response) => 
                {
                    var jsonResp = JSON.parse(response.text());
                    if(jsonResp.success)
                    {
                        this.navCtrl.setRoot(LoginPage);
                        this.presentToast("Registration successful! Please log in.");                        
                    }
                    else
                    {
                        this.presentToast("Username already exists.");
                        return false;
                    }
                },
                (error) =>
                {
                    alert("Error" + error);
                }   
            );
        }
    }

    presentToast(text)
    {
        let toast = this.toastCtrl.create(
        {
            message: text,
            duration: 1500,
            position: 'bottom',
            dismissOnPageChange: false
        });
        toast.present();
    }
}