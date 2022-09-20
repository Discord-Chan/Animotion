import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let model = localStorage.getItem("vrm-model");
    localStorage.removeItem("vrm-model");
    alert(model)
  }

}
