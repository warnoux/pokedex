import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-key-hd',
  templateUrl: './key-hd.component.html',
  styleUrls: ['./key-hd.component.scss']
})
export class KeyHDComponent implements OnInit {
  @Input() isActive: any;

  constructor() { }

  ngOnInit(): void {
  }

}
