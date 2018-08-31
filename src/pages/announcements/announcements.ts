import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '../../http-api';
//import { HTTP, HTTPResponse } from '@ionic-native/http';

@Component({
  selector: 'page-announcements',
  templateUrl: 'announcements.html'
})
export class AnnouncementsPage {

    announcements:any;
    announcement:any;

    votd:any;

    constructor(public navCtrl: NavController, public http: Http) {
        this.updateAnnouncements();
        this.getBibleVerseOfTheDay();
    }

    public getBibleVerseOfTheDay()
    {
        /*this.httpPlugin.setHeader("content-type", "application/json","");

        this.httpPlugin.get('https://www.ourmanna.com/verses/api/v1/', {}, {}).then((response) => {
            alert(response.data);
        }).catch(error => {

        });*/


        /*
        this.votd = {};
        this.http.get("https://www.ourmanna.com/verses/api/v1/", true).subscribe
        (
            (data)=>
            {
                var jsonResp = JSON.parse(data.text());
                alert("votdT: " + data.text());
                alert("votd: " + jsonResp);
            },
            (error) =>
            {
                alert("Error: " + error);
            }
        );*/
    }

    public updateAnnouncements()
    {
        this.announcements = [];
        this.announcement = {};
        this.http.get('/announcements').subscribe
        (
            (data) =>
            {
                var jsonResp = JSON.parse(data.text());
                this.announcements = jsonResp.announcements;
                this.announcements.forEach(element => {
                    element.message = element.message .replace(/\n/g, '<br>');
                });
            },
            (error) =>
            {
                alert("Error: " + error);
            }
        )
    }

}