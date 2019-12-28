import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-layout-gallery',
  templateUrl: './layout-gallery.component.html',
  styleUrls: ['./layout-gallery.component.scss']
})
export class LayoutGalleryComponent implements OnInit {

	@Input() private pool_id:string

  	constructor() { }

  	ngOnInit() {
  	}

}
