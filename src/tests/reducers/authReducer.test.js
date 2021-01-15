import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

const initState = {
  checking: true,
};

describe('pruebas al authReducer', () => {
  test('debe tener el estado por defecto', () => {
    const state = authReducer(initState, {});
    // console.log(state);
    expect(state).toEqual(initState);
  });

  test('debe retornar el usuario validado', () => {
    const user = {
      uid: '8384621adf0ec5f1e9',
      name: 'test',
    };

    const login = (user) => ({
      type: types.authLogin,
      payload: user,
    });

    const loginTest = login(user);
    const state = authReducer(initState, loginTest);
    expect(state).toEqual({
      checking: false,
      name: 'test',
      uid: '8384621adf0ec5f1e9',
    });
  });
});
