import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalProvider } from "../../providers/global/global";
import { Http } from '../../http-api';

@Component({
	selector: 'page-weekend',
	templateUrl: 'weekend.html'
})
export class WeekendPage {

	meals:any;
	constructor(public navCtrl: NavController, public global: GlobalProvider, public http: Http) {
		this.loadSlotValues();
	}

	public loadSlotValues()
	{
		let reqSend = {
			id: this.global.myUsrID
		}
		this.http.post('/weekend', reqSend).subscribe
		(
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
		meal.status = !meal.status;

		let reqSend = {
			id: this.global.myUsrID,
			wsiFridayDinner: this.meals[0].status,
			wsiSaturdayBrunch: this.meals[1].status,
			wsiSaturdayDinner: this.meals[2].status,
			wsiSundayBreakfast: this.meals[3].status,
			wsiSundayLunch: this.meals[4].status,
			wsiSundayDinner: this.meals[5].status
		}
		this.http.post('/updateWeekend', reqSend).subscribe
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
