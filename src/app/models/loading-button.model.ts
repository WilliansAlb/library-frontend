export class ButtonLoading {
	button_class: string;
    loading: boolean;
    message: string;
    icon: string;
	
	constructor(button_class, loading, message, icon){
		this.button_class = button_class;
		this.loading = loading;
		this.message = message;
		this.icon = icon;
	}
}