import { fetchConToken, fetchSinToken } from '../../helpers/fetch';

describe('pruebas al helper fetch', () => {
  let token = '';

  test('fetchSinToken debe responder cop una instancia del response', async () => {
    const resp = await fetchSinToken(
      'auth',
      { email: 'eescobar@computin.cl', password: 'gracielita' },
      'POST'
    );
    expect(resp instanceof Response).toBe(true);
    const body = await resp.json();
    token = body.token;
    expect(body.ok).toBe(true);
  });

  test('debe responder el mensaje cuando no existe la nota', async () => {
    localStorage.setItem('token', token);
    const resp = await fetchConToken(
      'events/5fe4e7679e685c1da841184d',
      {},
      'DELETE'
    );
    const body = await resp.json();
    expect(body.msg).toBe('no existe un evento con ese id');
  });
});
