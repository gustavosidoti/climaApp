import { Component, Input, OnInit } from '@angular/core';
import { Weather } from '../../interfaces/clima-response';

@Component({
  selector: 'app-clima-ciudad',
  templateUrl: './clima-ciudad.component.html',
  styleUrls: ['./clima-ciudad.component.css']
})
export class ClimaCiudadComponent implements OnInit {

  @Input() clima: Weather[];

  constructor() { }

  ngOnInit() {
    console.log(this.clima);
  }

}
