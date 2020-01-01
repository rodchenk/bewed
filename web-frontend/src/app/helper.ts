export class Helper{
	
	private static readonly c:string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	/**
	 * @return random String constising of 16 chars from this.c
	**/
	static gen_random():string{
		return Array.from({length:16}, _ => Helper.c[Math.floor(Math.random()*62)]).join('');
	}
}

export class UPDATE_TRIGGER{
	public static readonly CREATED:number = 	0
	public static readonly EDIT_STATUS:number = 1
	public static readonly COMMENTED:number = 	2
	public static readonly EDIT_CONTENT:number= 3
}