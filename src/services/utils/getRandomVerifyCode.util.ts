import { getOneRandomNumber } from "../../database/seeders/utils/createDummyUsers.util";

export function getRandomNumber(): string {
	return Array.from({ length: 4 }, () =>
		getOneRandomNumber(),
	)
		.join()
		.replaceAll(',', '');
}