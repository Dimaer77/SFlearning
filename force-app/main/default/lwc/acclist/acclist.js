import { LightningElement, api, wire} from 'lwc';
import getAccontsData from '@salesforce/apex/AccountController.getAccontsData';
export default class Acclist extends LightningElement {
    filteredAccounts;
    allAccounts;
    _selectedAccType;
    @wire(getAccontsData)
    getWiredAccount({error, data}) {
        this.filteredAccounts = data;
        this.allAccounts = data;
    }
 
    // accTileIdHandler(evt) {
    //     const event = new CustomEvent('acctileid', {
    //         detail: evt.detail
    //     });
    //     this.dispatchEvent(event);
    //     console.log("list id",event.detail)
    // }

    set selectedAccType(value) {
       if(value){
        console.log("value list",value)
        this._selectedAccType = value;
        if(this.allAccounts) {
            // console.log("filteracc", JSON.stringify(this.filteredAccounts))
           this.filteredAccounts = this.allAccounts?.filter(acc => acc.Type === value);
        //    console.log("ARRLIST", JSON.stringify(this.filteredAccounts));
        }
       }
    }

// getter for productId
    @api get selectedAccType(){
        console.log("get:",this._selectedAccType);
    
        return this._selectedAccType;
    }

}