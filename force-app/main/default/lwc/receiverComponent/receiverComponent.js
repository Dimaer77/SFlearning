import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import MY_MESSAGE_CHANNEL from '@salesforce/messageChannel/MyMessageChannel__c';

export default class ReceiverComponent extends LightningElement {
    @wire(MessageContext) messageContext;
    message = '';

    connectedCallback() {
        this.subscription = subscribe(
            this.messageContext,
            MY_MESSAGE_CHANNEL,
            (message) => {
                this.handleMessage(message);
            }
        );
    }

    handleMessage(message) {
        this.message = message.message;
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}
