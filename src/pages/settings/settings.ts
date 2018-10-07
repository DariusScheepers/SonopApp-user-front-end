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

	bedieningTableID:any;
	constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public global: GlobalProvider, public http: Http) {
		this.loadCurrentTable();
	}

	public loadCurrentTable()
	{
		let jsonSend = {
			id: this.global.myUsrID
		};
		this.http.post('/getBedieningTable', jsonSend).subscribe
		(
			(data) =>
			{
				var jsonResp = JSON.parse(data.text());
				this.bedieningTableID = jsonResp.result0.tblBedieningTable_talID;
			},
			(error) =>
			{
				alert("Error: " + error);
			}
		)
	}

	public updateBedieningTable(value)
	{
		let jsonSend = {
			id: this.global.myUsrID,
			bedieningTableID: value
		}
		this.http.post('/updateBedieningTable', jsonSend).subscribe
		(
			(data) =>
			{
				this.presentToast("Updated!");
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
