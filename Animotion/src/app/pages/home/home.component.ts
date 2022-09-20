import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  SelectModel(model: string) {
    window.localStorage.setItem("vrm-model", model);
    window.location.href='menu';
  }
}
