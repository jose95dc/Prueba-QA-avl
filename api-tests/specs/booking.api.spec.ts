import { test, expect } from '@playwright/test';
import { performance } from 'node:perf_hooks';
import { buildBookingPayload } from '../data/bookingFactory.js';
import { authResponseSchema, bookingSchema, createBookingResponseSchema } from '../schemas/booking.schema.js';
import { expectSchema } from '../utils/schemaValidator.js';

const SLA_MS = Number(process.env.API_SLA_MS || 1500);

async function expectSla<T>(operation: () => Promise<T>) {
  const start = performance.now();
  const result = await operation();
  const elapsed = performance.now() - start;
  expect(elapsed, `La respuesta tardó ${elapsed.toFixed(0)} ms y supera el SLA de ${SLA_MS} ms`).toBeLessThan(SLA_MS);
  return result;
}

test.describe('API - Restful Booker: integración y contrato', () => {
  test('POST /auth debe generar token válido', async ({ request }) => {
    const response = await expectSla(() =>
      request.post('/auth', {
        data: {
          username: 'admin',
          password: 'password123'
        }
      })
    );

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expectSchema(authResponseSchema, body);
  });

  test('POST /booking debe crear reserva con payload dinámico y contrato válido', async ({ request }) => {
    const payload = buildBookingPayload();

    const response = await expectSla(() =>
      request.post('/booking', {
        data: payload
      })
    );

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expectSchema(createBookingResponseSchema, body);
    expect(body.booking.firstname).toBe(payload.firstname);
    expect(body.booking.lastname).toBe(payload.lastname);
  });

  test('PUT /booking/{id} debe actualizar reserva autenticada', async ({ request }) => {
    const authResponse = await request.post('/auth', {
      data: { username: 'admin', password: 'password123' }
    });
    const { token } = await authResponse.json();

    const createResponse = await request.post('/booking', {
      data: buildBookingPayload()
    });
    const created = await createResponse.json();
    const bookingId = created.bookingid;

    const updatedPayload = {
      ...buildBookingPayload(),
      additionalneeds: 'Dinner'
    };

    const updateResponse = await expectSla(() =>
      request.put(`/booking/${bookingId}`, {
        headers: {
          Cookie: `token=${token}`
        },
        data: updatedPayload
      })
    );

    expect(updateResponse.status()).toBe(200);
    const updatedBody = await updateResponse.json();
    expectSchema(bookingSchema, updatedBody);
    expect(updatedBody.additionalneeds).toBe('Dinner');
  });
});
