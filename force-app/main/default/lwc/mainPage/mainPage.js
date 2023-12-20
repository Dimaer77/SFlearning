import { LightningElement, track, wire,api } from 'lwc';
import findAccount from '@salesforce/label/c.FindAccount';

export default class MainPage extends LightningElement {
    selectedTypeValue;
    accountId;
    labels= {
        findAccount:findAccount
    }

    typeChangeHandler(event){
        this.selectedTypeValue = event.detail;
    }

    accountTileIdHandler(event){
        this.accountId = event.detail;
        //console.log("MP acc id",this.accountId) BIG QUESTION
    }
}
