type ErrorData = {
	message: string;
	status: number;
	errors: any;
};

export class HttpException extends Error {
	public status: number;
	public errors: any = [];

	constructor(data?: Partial<ErrorData>) {
		super(data?.message);
		this.status = data?.status || 500;
		this.errors = data?.errors || [];
	}
}
