import { CreateUserDto } from 'src/commons/dtos/create-user.dto';

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

export function getRandomNumber(): number {
  return Math.floor(Math.random() * 10);
}

export function getRandomCompleteName(): string {
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomSurname = surnames[Math.floor(Math.random() * surnames.length)];

  return `${randomName} ${randomSurname}`;
}

export function getEmailByCompleteName(completeName: string): string {
  const lowerCaseName = completeName.toLocaleLowerCase();
  const nameAndSurnamePartsArray = lowerCaseName.split(' ');

  return `${nameAndSurnamePartsArray[0]}.${nameAndSurnamePartsArray[1]}@example.com.br`;
}

export function getRandomPassword(userEmail: string): string {
  const userEmailPartsArray = userEmail.split('@');

  const randomNumbers: number[] = [];

  for (let i = 0; i < 5; i++) {
    const randomNumber = getRandomNumber();
    randomNumbers.push(randomNumber);
  }

  return `${userEmailPartsArray[0]}.${getRandomNumber()}#${userEmailPartsArray[1]}${randomNumbers.join('')}`;
}

export function getUserName(completeName: string): string {
  const completeNamePartsArray = completeName.split(' ');
  return `${completeNamePartsArray[0]}.${completeNamePartsArray[1]}`;
}

export function createDummyUsers(numberOfUsers: number): Array<CreateUserDto> {
  const dummyUsers: CreateUserDto[] = [];

  for (let i = 0; i < numberOfUsers; i++) {
    const completeName = getRandomCompleteName();
    const email = getEmailByCompleteName(completeName);
    const userName = getUserName(completeName);
    const password = getRandomPassword(email);

    const dummyUser: CreateUserDto = {
      name: completeName,
      email,
      password,
      telefone: '1234567890',
      nomeUsuario: userName,
    };
    dummyUsers.push(dummyUser);
  }

  return dummyUsers;
}

/*
  To run test this script uncomment line 100 and run in
  your cmd the command:

  $ ts-node src/database/seeders/utils/createDummyUsers.util.ts
*/

// createDummyUsers(10);
