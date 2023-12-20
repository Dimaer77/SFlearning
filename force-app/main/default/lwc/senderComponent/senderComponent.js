import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import MY_MESSAGE_CHANNEL from '@salesforce/messageChannel/MyMessageChannel__c';

export default class SenderComponent extends LightningElement {
    @wire(MessageContext) messageContext;

    handleClick() {
        const message = {
            recordId: '001XXXXXXXXXXXXXXX', // Замените этот ID на актуальный
            message: 'Hello from SenderComponent!'
        };
        publish(this.messageContext, MY_MESSAGE_CHANNEL, message);
    }
}
