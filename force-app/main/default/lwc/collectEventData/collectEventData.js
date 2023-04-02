import { LightningElement } from 'lwc';
import createEvent from '@salesforce/apex/EventController.createEvent';
import createUczestnik from '@salesforce/apex/EventController.createUczestnik';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LwcForm extends LightningElement {
  wydarzenieName;
  wydarzenieData;
  wydarzenieMiejsce;
  wydarzenieOpis;
  uczestnikImie;
  uczestnikNazwisko;
  uczestnikDataUrodzenia;
  uczestnikEmail;

  handleWydarzenieNameChange(event){
    this.wydarzenieName = event.target.value;
  }

  handleWydarzenieDataChange(event){
    this.wydarzenieData = event.target.value;
  }

  handleWydarzenieMiejsceChange(event){
    this.wydarzenieMiejsce = event.target.value;
  }

  handleWydarzenieOpisChange(event){
    this.wydarzenieOpis = event.target.value;
  }

  handleUczestnikImieChange(event){
    this.uczestnikImie = event.target.value;
  }

  handleUczestnikNazwiskoChange(event){
    this.uczestnikNazwisko = event.target.value;
  }

  handleUczestnikDataUrodzeniaChange(event){
    this.uczestnikDataUrodzenia = event.target.value;
  }

  handleUczestnikEmailChange(event){
    this.uczestnikEmail = event.target.value;
  }

  async handleSubmit() {
    if (!this.wydarzenieName || !this.wydarzenieData || !this.wydarzenieMiejsce || !this.wydarzenieOpis || !this.uczestnikImie || !this.uczestnikNazwisko ||
        !this.uczestnikDataUrodzenia || !this.uczestnikEmail) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Błąd',
                message: 'Proszę wypełnić wszystkie wymagane pola.',
                variant: 'error'
            })
        );
        return;
        }
      
    try {
      const createdEventId = await createEvent({
        name: this.wydarzenieName,
        date: this.wydarzenieData,
        place: this.wydarzenieMiejsce,
        description: this.wydarzenieOpis
      });
      
      
      await createUczestnik({
        wydarzenieId: createdEventId.Id,  
        firstName: this.uczestnikImie,
        lastName: this.uczestnikNazwisko,
        birthdate: this.uczestnikDataUrodzenia,
        email: this.uczestnikEmail
      });

      this.dispatchEvent(new ShowToastEvent({
        title: 'Sukces!',
        message: 'Wydarzenie i uczestnik zostały utworzone.',
        variant: 'success'
      }));
    } catch (error) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: 'Błąd',
          message: error.body.message,
          variant: 'error'
        })
      );
    }
  }
}
