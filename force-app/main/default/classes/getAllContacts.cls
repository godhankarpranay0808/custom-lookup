public with sharing class getAllContacts {
    public getAllContacts() {

    }
    @AuraEnabled(cacheable=true)
    public static List<contact> getContacts(){
        List<contact> ct = new List<contact>();
        try {
            ct = [select id, firstname, lastname, email, phone from contact order by createdDate desc];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return ct;
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAcc()
    {
        return[select Id,phone,Name from Account];
    }

    @AuraEnabled
    public static contact insertContact(Contact c){
        contact ct = c;
        try {
            insert ct;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return ct;
    }

    @AuraEnabled(cacheable=true)
    public static List<account> getAllAccounts(){
        try {
            return [select id, name, phone, industry, description from account where id in (select accountid from contact)];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Account insertAccount(Account acc){
        try{
            insert acc;
        }catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return acc;
    }
    @AuraEnabled(cacheable=true)
    public static List<contact> getRelatedContacts(Id accId){
        try {
            return [select id, accountid, name, firstname, lastname, mailingAddress, phone, email from contact where accountid = :accid];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(string searchKey){
        system.debug(searchKey + ' Keyed');
        try {
            String squery = 'select id, name, industry, description from account where name like \'%' + searchKey + '%\' limit 5';
            List<account> ac =database.query(squery);
            system.debug(ac + ' Keyed');
            return ac;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}