export interface LayoutAbstract {
	value: string;
	viewValue: string;
}

export class Layout{
	public static CANBAN:string = 'canban'
	public static CHAIN:string = 'chain'
	public static GALLERY:string = 'gallery'

	public static layouts: LayoutAbstract[] = [
		{value: Layout.CANBAN, viewValue: 'Canban'},
		{value: Layout.CHAIN, viewValue: 'Chain'},
		{value: Layout.GALLERY, viewValue: 'Gallery'}
	]
}
