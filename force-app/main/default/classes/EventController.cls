public with sharing class EventController {
    @AuraEnabled
    public static Wydarzenie__c createEvent(String name, Date eventDate, String place, String description) {
        List<Wydarzenie__c> w = [SELECT Id, Name FROM Wydarzenie__c WHERE Name = :name];
        if(w.size() > 0) {
            system.debug(w[0].Id);
            return w[0];
        }
        else {
            Wydarzenie__c event = new Wydarzenie__c();
            event.Name = name;
            event.Data__c = eventDate;
            event.Miejsce__c = place;
            event.Opis__c = description;
            System.debug(event);
            insert event;
            return event;
        }    

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

    @AuraEnabled(cacheable=true)
    public static List<Wydarzenie__c> getEventsList() {
        return [SELECT Name, Data__c, Miejsce__c FROM Wydarzenie__c LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static List<Uczestnik__c> getRelatedAttendee(Id wydarzenieId) {
        return [SELECT Imie__c, Nazwisko__c, Wydarzenie__r.Name FROM Uczestnik__c WHERE Wydarzenie__c = :wydarzenieId];
    }
}