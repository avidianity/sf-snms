export interface UltrasonicContract {
	distance: number;
}

export enum UltrasonicNames {
	WATER_MAIN = 'water-main',
	WATER_BACKUP = 'water-backup',
	NITROGEN = 'nitrogen',
	PHOSPHORUS = 'phosphorus',
	POTASSIUM = 'potassium',
}
