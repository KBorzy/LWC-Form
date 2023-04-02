import { LightningElement, wire } from 'lwc';
import getEventsList from '@salesforce/apex/EventController.getEventsList';
import getRelatedAttendee from '@salesforce/apex/EventController.getRelatedAttendee';

export default class EventList extends LightningElement {
    events = [];
    attendees = [];

    @wire(getEventsList)
    wiredEvents({ error, data }) {
        if (data) {
            this.events = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleClick(event) {
        let eventId = event.currentTarget.dataset.id;
        getRelatedAttendee({ wydarzenieId: eventId })
            .then((result) => {
                this.attendees = result;
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
