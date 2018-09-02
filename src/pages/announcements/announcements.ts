import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '../../http-api';
import { HTTP } from '@ionic-native/http';
//import { HTTP, HTTPResponse } from '@ionic-native/http';

@Component({
  selector: 'page-announcements',
  templateUrl: 'announcements.html'
})
export class AnnouncementsPage {

    announcements:any;
    announcement:any;

    votd:any;
    votdRef:any;

    constructor(public navCtrl: NavController, public http: Http, public HTTP: HTTP) {
        this.updateAnnouncements();
        this.getBibleVerseOfTheDay();
    }

    public getBibleVerseOfTheDay()
    {
        var pref = 'http://cors-anywhere.herokuapp.com/';   
        var bv = pref + 'http://beta.ourmanna.com/api/v1/get/?format=json';
        this.votd = {};
        this.http.get(bv, true).subscribe
        (
            (data) =>
            {

                var jsonResp = JSON.parse(data.text());
                this.votd = jsonResp.verse.details;
                this.votdRef = jsonResp.verse.notice;
            },
            (error) =>
            {
                alert("Error: " + error);
            }
        ); 
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