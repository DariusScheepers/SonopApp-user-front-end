import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '../../http-api';

@Component({
	selector: 'page-sign-out',
	templateUrl: 'sign-out.html',
})
export class SignOutPage {

	meals:any;
	constructor(public navCtrl: NavController, public global: GlobalProvider, public http: Http) {
		this.loadSlotValues();
	}

	public loadSlotValues()
	{
		let reqSend = {
			id: this.global.myUsrID
		}
		this.http.post('/get-week', reqSend).subscribe
		( // 1 represents signed in
			(data) =>
			{
				var jsonResp = JSON.parse(data.text());
				this.meals = jsonResp.JSONRes;
			},
			(error) =>
			{
				alert("Error: " + error);
			}
		)
	}
	
	public updateSlot(meal)
	{
		meal.status = ++meal.status % 3;

		let reqSend = {
			id: this.global.myUsrID,
			wsoMondayLunch: this.meals[0].status,
			wsoMondayDinner: this.meals[1].status,
			wsoTuesdayLunch: this.meals[2].status,
			wsoTuesdayDinner: this.meals[3].status,
			wsoWednesdayLunch: this.meals[4].status,
			wsoWednesdayDinner: this.meals[5].status,
			wsoThursdayLunch: this.meals[6].status,
			wsoThursdayDinner: this.meals[7].status,
			wsoFridayLunch: this.meals[8].status
		};
		this.http.post('/updateWeeklySignOut', reqSend).subscribe
		(
			(data) =>
			{},
			(error) =>
			{
				alert("Error: " + error);
			}
		)
	}

}
