export class Config {

	private static readonly HOST = 'http://127.0.0.1:3000'
	private static readonly API = '/api'
	private static readonly AUTH = '/auth'


	public static readonly API_URL: string = Config.HOST + Config.API
	public static readonly API_AUTH: string = Config.HOST + Config.AUTH
}
