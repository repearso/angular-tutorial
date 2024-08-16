import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import {HousingLocation} from '../housing-location';
import {HousingService} from '../housing.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, FormsModule],
  template: `
    <section>
      <form (ngSubmit)="filterResults()" #filterForm='ngForm'>
        <input type="text" placeholder="Filter by city" [(ngModel)]='filterText' name='filter' #filter='ngModel' required>        
        <button class="primary" type="submit" [disabled]="filterForm.invalid">Search</button>      
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of filteredLocationList"[housingLocation]="housingLocation"/>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  housingLocationList: HousingLocation[] = inject(HousingService).getAllHousingLocations();
  filteredLocationList: HousingLocation[] = [];
  filterText = '';

  constructor() {
    this.filteredLocationList = this.housingLocationList;
  }
  
  filterResults() {
    if (!this.filterText) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(this.filterText.toLowerCase()) || housingLocation?.name.toLowerCase().includes(this.filterText.toLowerCase()),
    );
  }
}