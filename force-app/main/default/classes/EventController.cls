public with sharing class EventController {
    @AuraEnabled
    public static Wydarzenie__c createEvent(String name, Date eventDate, String place, String description) {
        Wydarzenie__c event = new Wydarzenie__c();
        event.Name = name;
        event.Data__c = eventDate;
        event.Miejsce__c = place;
        event.Opis__c = description;
        insert event;
        return event;
    }
    
    @AuraEnabled
    public static Uczestnik__c createUczestnik(Id wydarzenieId, String firstName, String lastName, Date birthdate, String email) {
        Uczestnik__c uczestnik = new Uczestnik__c();
        uczestnik.Wydarzenie__c = wydarzenieId;
        uczestnik.Imie__c = firstName;
        uczestnik.Nazwisko__c = lastName;
        uczestnik.DataUrodzenia__c = birthdate;
        uczestnik.Email__c = email;

        if(birthdate.year() < Date.today().year() - 18) {
            insert uczestnik;
            return uczestnik;
        } else {
            throw new AuraHandledException('Uczestnik nie jest pełnoletni!');
        }
    }
}