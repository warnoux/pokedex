import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-key-game-boy',
  templateUrl: './key-game-boy.component.html',
  styleUrls: ['./key-game-boy.component.scss']
})
export class KeyGameBoyComponent implements OnInit {
  @Input() isActive: any;

  constructor() { }

  ngOnInit(): void {
  }
}
