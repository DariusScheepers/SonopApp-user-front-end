import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { Http } from '../../http-api';

@Component({
  selector: 'page-announcements',
  templateUrl: 'announcements.html'
})
export class AnnouncementsPage {

    announcements:any;
    announcement:any;

    constructor(public navCtrl: NavController, /*public http: Http*/) {

        this.updateAnnouncements();
    }

    public updateAnnouncements()
    {
        this.announcements = [];
        this.announcement = {};
        /*this.http.get("/reward/list/own").subscribe
        (
            (data) => //Success
            {
                var jsonResp = JSON.parse(data.text());
                this.announcements = jsonResp.rewards;
                this.announcement.forEach(el =>
                {
                    // TODO: creative something
                });                
            }
        );*/
    }

}