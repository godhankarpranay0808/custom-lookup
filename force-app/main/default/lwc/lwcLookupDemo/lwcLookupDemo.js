import { LightningElement, track } from 'lwc';  
export default class LwcLookupDemo extends LightningElement {  
  @track accountName;  
  handleChangeAccName(event){

    this.currentAccountName = event.target.value;
    
    }
    

  onAccountSelection(event){  
  this.accountName = event.detail.selectedValue;  
  this.accountRecordId = event.detail.selectedRecordId;  
  }  
}  