import { faker } from "@faker-js/faker";
import { RouterOutputs } from "./api";

type Customer = RouterOutputs["customer"]["getAll"][0];

interface Person extends Customer {
  subRows?: Person[];
}

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
    createdAt: faker.date.future(),
    updatedAt: faker.date.future(),
    businessId: faker.datatype.uuid(),
  };
};

const newItem = () => {};

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
