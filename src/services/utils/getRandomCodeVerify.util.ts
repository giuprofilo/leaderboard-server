import { getOneRandomNumber } from "../../database/seeders/utils/createDummyUsers.util";

export function getRandomCode(): string {
	return Array.from({ length: 4 }, () =>
		getOneRandomNumber(),
	)
		.join()
		.replaceAll(',', '');
}