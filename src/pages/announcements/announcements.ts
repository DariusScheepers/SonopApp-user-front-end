import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http } from '../../http-api';
import { HTTP } from '@ionic-native/http';
import { GlobalProvider } from "../../providers/global/global";
import { FormGroup, FormControl } from '@angular/forms';
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

    newAnn:any;

    constructor(public navCtrl: NavController, public toastCtrl: ToastController, public http: Http, public HTTP: HTTP, public global: GlobalProvider) {
        this.newAnn = new FormGroup({
            title: new FormControl(),
            message: new FormControl()
        });
        
        this.getBibleVerseOfTheDay();
        this.updateAnnouncements();
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
                    let date = new Date(element.date);
                    let dateString = date.getMinutes() + ":" +
                        date.getHours() + " " + 
                        date.getDate() + "/" +
                        date.getMonth() + "/" +
                        date.getFullYear();
                    element.date = dateString;
                });
            },
            (error) =>
            {
                alert("Error: " + error);
            }
        )
    }

    public addAnnouncement(value: any)
    {
        if (value.title == null && value.message == null)
        {
            alert("Please complete form first");
            return;
        }

        let jsonArr = {
            title : value.title,
            message : value.message,
            id : this.global.myUsrID
        };
        this.http.post('/addAnnouncement', jsonArr).subscribe
        (
            (data) => 
            {
                this.presentToast("Successfully Submitted");
                this.updateAnnouncements();
                this.newAnn.reset();
            },
            (error) =>
            {
                alert("Error" + error);
            }
        );
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