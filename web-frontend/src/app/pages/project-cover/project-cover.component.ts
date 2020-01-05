import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PoolCategory, PoolCategoryAbstract } from './../../interfaces/pool-category';

@Component({
	selector: 'app-project-cover',
	templateUrl: './project-cover.component.html',
	styleUrls: ['./project-cover.component.scss']
})
export class ProjectCoverComponent implements OnInit {

	@Input() private size:string
	@Input() private project:any

  	constructor(private router:Router) { }

  	ngOnInit() {
  		this.project.viewCategory = PoolCategory.categories.filter( (category:PoolCategoryAbstract) => category.value === this.project.category)[0].viewValue
  		this.project.progress = Math.round(this.project.completed_tasks / this.project.tasks * 100)
  	}

  	private openPool():void{
  		this.router.navigate(['/studio/' + this.project.user + '/' + this.project._id])
  	}

}