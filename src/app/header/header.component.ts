import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();
  onSelect(feautre: string) {
    this.featureSelected.emit(feautre);
  }

  constructor() {}

  ngOnInit(): void {}
}
