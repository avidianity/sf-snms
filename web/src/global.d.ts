declare global {
	interface Window {
		$: JQueryStatic;
		jQuery: JQueryStatic;
	}

	interface String {
		toNumber(): number;
	}

	interface Error {
		toJSON(): Object;
	}

	interface Array<T> {
		random(): T;
	}

	interface HTMLElement {
		disable(mode?: boolean): void;
	}

	interface StringConstructor {
		random(size?: number): string;
	}
}

export {};
