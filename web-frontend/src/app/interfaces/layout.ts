export interface LayoutAbstract {
	value: string;
	viewValue: string;
}

export class Layout{
	public static KANBAN:string = 'kanban'
	public static CHAIN:string = 'chain'
	public static GALLERY:string = 'gallery'

	public static layouts: LayoutAbstract[] = [
		{value: Layout.KANBAN, viewValue: 'Kanban'},
		{value: Layout.CHAIN, viewValue: 'Chain'},
		{value: Layout.GALLERY, viewValue: 'Gallery'}
	]
}
