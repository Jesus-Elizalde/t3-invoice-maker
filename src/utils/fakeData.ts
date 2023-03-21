import { faker } from "@faker-js/faker";

export type Person = {
  id: String;
  firstName: String;
  lastName: String;
  email: String;
  phone: String;
  status: "ACTIVE" | "INACTIVE";
  address: String;
  city: String;
  state: String;
  country: String;
  postalCode: String;
  lat: String;
  lang: String;
  subRows?: Person[];
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Person => {
  return {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    status: faker.helpers.shuffle<Person["status"]>(["ACTIVE", "INACTIVE"])[0]!,
    address: faker.address.streetAddress(),
    city: faker.address.cityName(),
    state: faker.address.state(),
    country: faker.address.country(),
    postalCode: faker.address.zipCode(),
    lat: faker.address.latitude(),
    lang: faker.address.longitude(),
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!;
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
