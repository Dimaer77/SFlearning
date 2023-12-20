import { LightningElement, track, wire } from 'lwc';
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import TYPE_FIELD from "@salesforce/schema/Account.Type";
export default class ComboboxBasic extends LightningElement {

    @track wiredOptions;
    valueSelector;


    @wire(getPicklistValues, { recordTypeId: "012000000000000AAA", fieldApiName: TYPE_FIELD })
    pickListValuesData({ error, data }){
        this.wiredOptions = data?.values;
    }

    get options() {
        let arr = this.wiredOptions?.map(i=> ({label:i.label,value:i.value}));
        return arr;
    }

    handleChange(evt) {
        this.valueSelector = evt.detail.value;
        const event = new CustomEvent('typechange', {
            // detail contains only primitives
            detail: this.valueSelector
        }
        );
        // Fire the event from c-tile

        this.dispatchEvent(event);
    }
}
