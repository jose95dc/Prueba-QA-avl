import { faker } from '@faker-js/faker';

export function buildBookingPayload() {
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    totalprice: faker.number.int({ min: 100, max: 900 }),
    depositpaid: faker.datatype.boolean(),
    bookingdates: {
      checkin: '2026-06-10',
      checkout: '2026-06-15'
    },
    additionalneeds: 'Breakfast'
  };
}
