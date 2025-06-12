import { CreateUserDto } from '../../../common/dtos/create-user.dto';

const names: string[] = [
  'João',
  'Maria',
  'Pedro',
  'Ana',
  'Carlos',
  'Laura',
  'Miguel',
  'Sofia',
  'Antônio',
  'Luíza',
];

const surnames: string[] = [
  'Santos',
  'González',
  'Rossi',
  'Müller',
  'Wang',
  'Kim',
  'Ivanova',
  'Dubois',
  'Okafor',
  'Smith',
];

const DEFAULT_IMAGE =
  'https://res.cloudinary.com/leaderboard-cloud/image/upload/v1749571270/default-pfp_wv7y98.jpg';

export function getOneRandomNumber(): number {
  return Math.floor(Math.random() * 10);
}

export function getRandomNumber(): number {
  return +Array.from({ length: getOneRandomNumber() }, () =>
    getOneRandomNumber(),
  )
    .join()
    .replaceAll(',', '');
}

export function getRandomCompleteName(): string {
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];

  return `${randomName} ${randomSurname}`;
}

export function getEmailByCompleteName(completeName: string): string {
  const lowerCaseName = completeName.toLocaleLowerCase();
  const nameAndSurnamePartsArray = lowerCaseName.split(' ');
  const randomEmail = `${nameAndSurnamePartsArray[0]}.${nameAndSurnamePartsArray[1]}${getRandomNumber()}@example.com.br`;

  return randomEmail;
}

export function getRandomPassword(userEmail: string): string {
  const userEmailPartsArray = userEmail.split('@');
  const randomNumbers: number[] = [];

  for (let i = 0; i < 5; i++) {
    const randomNumber = getOneRandomNumber();
    randomNumbers.push(randomNumber);
  }

  return (
    userEmailPartsArray[0] +
    getOneRandomNumber() +
    '#' +
    userEmailPartsArray[1] +
    randomNumbers.join('')
  );
}

export function getUserName(completeName: string): string {
  const completeNamePartsArray = completeName.split(' ');
  return `${completeNamePartsArray[0]}.${completeNamePartsArray[1]}${getRandomNumber()}`;
}

export function createDummyUsers(numberOfUsers: number): Array<CreateUserDto> {
  const dummyUsers: CreateUserDto[] = [];

  console.log('Dummy Users: creating...');
  for (let i = 0; i < numberOfUsers; i++) {
    const completeName = getRandomCompleteName();
    const email = getEmailByCompleteName(completeName);
    const username = getUserName(completeName);
    const password = getRandomPassword(email);
    const points = getRandomNumber();
    const avatar = DEFAULT_IMAGE;

    const dummyUser: CreateUserDto = {
      name: completeName,
      email,
      password,
      telefone: '1234567890',
      username,
      points,
      avatar,
    };

    dummyUsers.push(dummyUser);
  }

  console.log(`Dummy Users: create ${dummyUsers.length} users.`);
  return dummyUsers;
}

/*
  To run test this script uncomment line 111 and run in
  your cmd the command:

  $ ts-node src/database/seeders/utils/createDummyUsers.util.ts
*/

// createDummyUsers(10);
