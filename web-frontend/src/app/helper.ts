export class Helper{
	
	private static readonly c:string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	/**
	 * @return random String constising of 16 chars from this.c
	**/
	static gen_random():string{
		return Array.from({length:16}, _ => Helper.c[Math.floor(Math.random()*62)]).join('');
	}
}