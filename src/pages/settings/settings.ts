import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '../../http-api';
import { FormGroup, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  	selector: 'page-settings',
  	templateUrl: 'settings.html',
})
export class SettingsPage {

	settings:any;
	bedieningTableID:any;
	semi:any;
	constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public global: GlobalProvider, public http: Http) {
		this.settings = new FormGroup({
			table: new FormControl(),
			semi: new FormControl(),
			oldpassword: new FormControl(),
			newpassword: new FormControl(),
			confirmpassword: new FormControl()
		})
		this.loadCurrentTable();
	}

	public loadCurrentTable()
	{
		let jsonSend = {
			id: this.global.myUsrID
		};
		this.http.post('/getSettings', jsonSend).subscribe
		(
			(data) =>
			{
				var jsonResp = JSON.parse(data.text());
				this.bedieningTableID = jsonResp.result0.tblBedieningTable_talID;
				this.semi = jsonResp.result0.usrIsSemi;
			},
			(error) =>
			{
				alert("Error: " + error);
			}
		)
	}

	public updateInformation(value: any)
	{
		var jsonSend = {
			id: this.global.myUsrID,
			bedieningTableID: value.table,
			semi: value.semi,
			oldpassword: "",
			newpassword: "",
		}

		if (value.newpassword != null || value.newpassword != "")
		{
			if (value.newpassword != value.confirmpassword)
			{
				this.presentToast("Please ensure that your passwords match.");
            	return false;
			}
			jsonSend.oldpassword = value.oldpassword;
			jsonSend.newpassword = value.newpassword;
		}		
		this.http.post('/updateSettings', jsonSend).subscribe
		(
			(data) =>
			{
				var jsonResp = JSON.parse(data.text());
				if (jsonResp.jsonRes.success)
				{
					this.presentToast("Updated!");
				}
				else
				{
					this.presentToast("Old Password is incorrect. Please try again. Nothing is updated.");
					return false;
				}
			},
			(error) =>
			{
				alert("Error: " + error);
			}
		)
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
