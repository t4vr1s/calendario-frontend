import { types } from '../../types/types';

describe('pruebas a los types', () => {
  test('los objetos types deben ser iguales', () => {
    expect(types).toEqual({
      uiOpenModal: '[ui] Open modal',
      uiCloseModal: '[ui] Close modal',

      eventStartAddNew: '[event] Start add new',
      eventLogout: '[event] Clear events',
      eventSetActive: '[event] Set active',
      eventAddNew: '[event] Add new',
      eventClearActive: '[event] Clear active event',
      eventUpdated: '[event] Event updated',
      eventDeleted: '[event] Event deletes',
      eventLoaded: '[event] Events loaded',

      authCheckingFinish: '[auth] Finish Checking login state',
      authStartLogin: '[auth] Start login',
      authLogin: '[auth] Login',
      authStartRegister: '[auth] Start register',
      authStartTokenRenew: '[auth] Start token renew',
      authLogout: '[auth] Logout',
    });
  });
});
