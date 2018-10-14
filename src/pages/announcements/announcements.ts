import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { Http } from '../../http-api';
import { GlobalProvider } from "../../providers/global/global";
import { FormGroup, FormControl } from '@angular/forms';
import { AnnouncementsAddPage } from '../announcements-add/announcements-add';

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

    constructor(public navCtrl: NavController, public toastCtrl: ToastController, public http: Http,
            public global: GlobalProvider, public modalCtrl: ModalController) {
        this.newAnn = new FormGroup({
            title: new FormControl(),
            message: new FormControl()
        });
        this.getBibleVerseOfTheDay();
        this.updateAnnouncements();
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
        this.http.get('/getAnnouncements').subscribe
        (
            (data) =>
            {
                var jsonResp = JSON.parse(data.text());
                this.announcements = jsonResp.announcements;
                this.announcements.forEach(element => {
                    element.message = element.message .replace(/\n/g, '<br>');
                    
                    let date = new Date(element.date);
                    element.date = date.toLocaleString(); //date.toTimeString() + " - " + date.toDateString() + date.toISOString() + 
                });
            },
            (error) =>
            {
                alert("Error: " + error);
            }
        )
    }

    public addAnnouncement()
    {
        let addModal = this.modalCtrl.create(AnnouncementsAddPage);
        addModal.onDidDismiss(result => 
        {
            if (result) {                        
                this.http.post("/addAnnouncement", result).subscribe
                (
                    (data) =>
                    {
                        this.presentToast("Successfully Submitted");
                        this.updateAnnouncements();
                    },
                    (error) =>
                    {
                        
                    }
                );            
            }
        });
        addModal.present();
    }

    public refresh()
    {
        this.updateAnnouncements();
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