import { Component } from '@angular/core';
import { Satellite } from './satellite';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';

  sourceList: Satellite[];
  displayList: Satellite[];

	constructor() {
		this.sourceList = [];
		this.displayList = [];
		let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';

		window.fetch(satellitesUrl).then(function (response) {
			response.json().then(function (data) {

				let fetchedSatellites = data.satellites;
				// loop over satellites
				for(let i=0; i < fetchedSatellites.length; i++) {
					// create a Satellite object 
					let satellite = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
					// add the new Satellite object to sourceList 
					this.sourceList.push(satellite);
				 }

				 // make a copy of the sourceList to be shown to the user
				 this.displayList = this.sourceList.slice(0);
	  
			}.bind(this));
		}.bind(this));

	}

	search(searchTerm: string): void {
		let matchingSatellites: Satellite[] = [];
		searchTerm = searchTerm.toLowerCase();
		let result = {found: false, name:false, type:false, orbitType:false}
		if(result.found == false && result.name == false){
			for(let i=0; i < this.sourceList.length; i++) {
				let name = this.sourceList[i].name.toLowerCase();
				if (name.indexOf(searchTerm) >= 0) {
					matchingSatellites.push(this.sourceList[i]);
					result.found = true;
				}
			}
			result.name = true;
		} 
		if(result.found == false && result.name == true && result.orbitType == false){
			for(let i=0; i < this.sourceList.length; i++) {
				let name = this.sourceList[i].orbitType.toLowerCase();
				if (name.indexOf(searchTerm) >= 0) {
					matchingSatellites.push(this.sourceList[i]);
					result.found = true;
				}
			}
			result.orbitType = true;
		}
		if(result.found == false && result.name == true && result.orbitType == true && result.type == false){
			for(let i=0; i < this.sourceList.length; i++) {
				let name = this.sourceList[i].type.toLowerCase();
				if (name.indexOf(searchTerm) >= 0) {
					matchingSatellites.push(this.sourceList[i]);
					result.found = true;
				}
			}
			result.type = true;
		}
		
		// assign this.displayList to be the array of matching satellites
		// this will cause Angular to re-make the table, but now only containing matches
		this.displayList = matchingSatellites;
	}


}
