export const bookingSchema = {
  type: 'object',
  additionalProperties: true,
  required: ['firstname', 'lastname', 'totalprice', 'depositpaid', 'bookingdates', 'additionalneeds'],
  properties: {
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    totalprice: { type: 'number' },
    depositpaid: { type: 'boolean' },
    bookingdates: {
      type: 'object',
      required: ['checkin', 'checkout'],
      properties: {
        checkin: { type: 'string' },
        checkout: { type: 'string' }
      }
    },
    additionalneeds: { type: 'string' }
  }
} as const;

export const createBookingResponseSchema = {
  type: 'object',
  additionalProperties: true,
  required: ['bookingid', 'booking'],
  properties: {
    bookingid: { type: 'number' },
    booking: bookingSchema
  }
} as const;

export const authResponseSchema = {
  type: 'object',
  additionalProperties: true,
  required: ['token'],
  properties: {
    token: { type: 'string', minLength: 1 }
  }
} as const;
