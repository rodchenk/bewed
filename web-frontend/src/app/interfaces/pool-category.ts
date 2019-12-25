export interface PoolCategoryAbstract {
	value: string;
  	viewValue: string;
}

export class PoolCategory{
	public static categories: PoolCategoryAbstract[] = [
    	{value: 'art', 	 viewValue: 'Art'},
    	{value: 'eng', 	 viewValue: 'Engineering'},
    	{value: 'sport', viewValue: 'Sport'}
  	];
}