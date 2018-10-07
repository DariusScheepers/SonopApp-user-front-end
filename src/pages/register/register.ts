import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, ModalController, ViewController} from 'ionic-angular';
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
            password: new FormControl(),
            confirmpassword: new FormControl(),
        });
    }

    public registerUser(value: any)
    {
        var regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value.fname == null || value.sname == null || value.username == null || value.email == null || value.password == null || value.confirmpassword == null)
            this.presentToast("Please fill in all fields");
        else if (!regexEmail.test(value.email)) {
            this.presentToast("Please enter a valid email address");
        }
        else if (value.password === value.confirmPassword && value.password != value.confirmPassword)
        {
            this.presentToast("Please ensure that your passwords match");
        }
        else if (value.studentnumber.length > 10)
        {
            this.presentToast("Student number too long");
        }
        else
        {
            var HKMode = false;
            if (value.bedieningtable == 1)
            {
                HKMode = true;
            }

            var jsonArr: any = {
                username: value.username,
                password: value.password,
                email: value.email,
                name: value.fname,
                surname: value.sname,
                studentnumber: value.studentnumber,
                firstyearyear: value.firstyearyear,
                bedieningtable: value.bedieningtable,
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