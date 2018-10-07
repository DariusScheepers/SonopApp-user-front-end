import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http } from '../../http-api';
import { HTTP } from '@ionic-native/http';
import { GlobalProvider } from "../../providers/global/global";
import { FormGroup, FormControl } from '@angular/forms';
import { LocalNotifications } from '@ionic-native/local-notifications';
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
    priorityMessage:boolean = false;

    constructor(public navCtrl: NavController, public toastCtrl: ToastController, public http: Http, public HTTP: HTTP, public global: GlobalProvider, private localNotifications: LocalNotifications) {
        this.newAnn = new FormGroup({
            title: new FormControl(),
            message: new FormControl()
        });
        this.getBibleVerseOfTheDay();
        this.updateAnnouncements();
        //this.scheduleANotification();
        //this.testNotf();
    }

    public getBibleVerseOfTheDay()
    {
        
        this.votd = {};
        this.http.get('/bibleVerse').subscribe
        (
            (data) =>
            {
                var jsonResp = JSON.parse(data.text());
                if (!jsonResp.bibleVerseJSON)
                    alert("Cant retreive Bible Verse of the Day");
                else
                {
                    
                    this.votd = jsonResp.bibleVerseJSON.verse.details;
                    this.votdRef = jsonResp.bibleVerseJSON.verse.notice;
                }    
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
        this.http.get('/get-announcements').subscribe
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
                        (date.getMonth()+1) + "/" + // For some reason the getMonth returns one value short.
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
            id : this.global.myUsrID,
            priority: this.priorityMessage
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

    public scheduleANotification ()
    {
        this.localNotifications.schedule({
            title: 'Weekend Sign In',
            text: "Remember to sign in!",
            every: {'week':4, 'hour': 17, 'minute': 40}
        });
    }

    public testNotf()
    {
        this.localNotifications.schedule({
            title: 'Weekend Sign In',
            text: "Remember to sign in!",
            foreground: true//,
            //every: {'hour': 16, 'minute': 3}
        });
    }
}