public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccontsData() {
       return [
        SELECT Name, Id, imageurl__c, Budget__c,NumberOfEmployees,Type, Owner.Name,Industry,Description
        FROM Account 
        LIMIT 50000
        ];
       
    }
    
}
