import { LightningElement, api, wire, track } from 'lwc';
import searchAccount from '@salesforce/apex/getAllContacts.searchAccounts';
import getRelatedContact from '@salesforce/apex/getAllContacts.getRelatedContacts';
export default class showRelatedContactOfAccount extends LightningElement {
    //@api
    searchKey = '';

    @wire(searchAccount, {searchKey : '$searchKey'})
    accounts({ error, data }) {
        if (data) {
            this.error = undefined;
            this.records = data;
        } else if (error) {
            this.error = error;
            this.records = undefined;
        }
    }

    @api objName;
    @api iconName;
    @api filter = '';
    @api searchPlaceholder='Search';
    @track selectedName;
    @track records;
    @track isValueSelected;
    @track blurTimeout;
    //css
    @track boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    @track inputClass = '';
   
    handleClick() {
        this.searchTerm = '';
        this.inputClass = 'slds-has-focus';
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }
    onBlur() {
        this.blurTimeout = setTimeout(() =>  {this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus'}, 300);
    }
    onSelect(event) {
        let selectedId = event.currentTarget.dataset.id;
        let selectedName = event.currentTarget.dataset.name;
        console.log('onSelect' + selectedId);
        this.getContactsForSelection(event.currentTarget.dataset.id);
        console.log('onSelect222' + selectedId);
        const valueSelectedEvent = new CustomEvent('lookupselected', {detail:  selectedId });
        //this.dispatchEvent(valueSelectedEvent);
        this.isValueSelected = true;
        this.selectedName = selectedName;
        if(this.blurTimeout) {
            clearTimeout(this.blurTimeout);
        }
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
        
    }
    @track
    contactData;
    @track
    contactError;

    getContactsForSelection(accountId){
        console.log('Account Selected' + accountId);
        getRelatedContact({accId : accountId})
        .then(result =>{
            console.log('Data Found: ' + result);
            if(result.length >0)
            {
                this.contactData = result;
                this.contactError = undefined;
            }else{
                this.contactData = undefined;
            this.contactError = 'No Contacts Available....';
            }
        })
        .catch(error => {
            console.log('error: ' + error);
            this.contactData = undefined;
            this.contactError = error.body.message;
        });
    }
    handleRemovePill() {
        this.isValueSelected = false;
    }

    onChange(event) {
        this.searchKey = event.target.value;
    }
}