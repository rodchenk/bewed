export interface PoolCategoryAbstract {
	value: string;
  	viewValue: string;
}

export class PoolCategory{
	public static ART:string = 'art'
	public static ENGINEERING:string = 'eng'
	public static SPORT:string = 'sport'

	public static categories: PoolCategoryAbstract[] = [
    	{value: PoolCategory.ART, 	 		viewValue: 'Art'},
    	{value: PoolCategory.ENGINEERING, 	viewValue: 'Engineering'},
    	{value: PoolCategory.SPORT, 		viewValue: 'Sport'}
  	];
}