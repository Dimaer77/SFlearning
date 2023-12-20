import { LightningElement,api,wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { subscribe, MessageContext } from 'lightning/messageService';
import ACCOUNT_CHANNEL from '@salesforce/messageChannel/MyMessageChannel__c';
import getAccontsData from '@salesforce/apex/AccountController.getAccontsData';
import selectAccount from '@salesforce/label/c.SelectAccount';




export default class Accdetail extends NavigationMixin(LightningElement) {
    filteredAccount;
    allAccounts;
    _accountId;
    labels={
        selectAccount:selectAccount};
     @wire(MessageContext) messageContext;
     testmessagetext;
     connectedCallback() {
        this.subscription = subscribe(
        this.messageContext,
            ACCOUNT_CHANNEL,
            (message) => {
                this.handleMessage(message);
            }
        );
    }

    handleMessage(message) {
        console.log("handleMessage",message)
        // this.accountId = message.recordId;
        this.filteredAccount = this.allAccounts?.find(acc => acc.Id === message.recordId);
    }

    disconnectedCallback() {
        // Отписываемся при уничтожении компонента
        unsubscribe(this.subscription);
        this.subscription = null;
    }
    @wire(getAccontsData)
    getWiredAccount({error, data}) {
        this.allAccounts = data;
        console.log("accountsDet", this.allAccounts)
    }
    navigateToRecord() {
         
        console.log("click",this.filteredAccount.Id)
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
            recordId: this.filteredAccount.Id,
            objectApiName: 'Account',
            actionName: 'view'
            }
            });
    }
}