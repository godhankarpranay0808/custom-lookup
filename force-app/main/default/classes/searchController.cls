public with sharing class searchController {
    @AuraEnabled(cacheable=true)

    public static List<Contact> retrieveContactData(string keySearch){
    
    List<Contact> contactlist = [Select Id, FirstName, LastName, Email, Phone, Account.Name From Contact Where Account.Name=:keySearch];
    
    return contactList;
    
    }
    
    }