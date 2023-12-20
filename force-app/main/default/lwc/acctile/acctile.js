import { LightningElement,api,track,wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import MY_MESSAGE_CHANNEL from '@salesforce/messageChannel/MyMessageChannel__c';


export default class Acctile extends LightningElement {
     @api account;
     @api valueType;
     @track valueSelector;
     imageUrl = "https://st3.depositphotos.com/1006318/15649/v/450/depositphotos_156492248-stock-illustration-profile-icon-male-emotion-avatar.jpg"

     @wire(MessageContext) messageContext;
     accTileClick() {
          const message = {
            recordId: this.account.Id, // Замените этот ID на актуальный
        };
        publish(this.messageContext, MY_MESSAGE_CHANNEL, message);
      }
      @api recordId; // Принимаем Id аккаунта из родительской компоненты


    
           
}