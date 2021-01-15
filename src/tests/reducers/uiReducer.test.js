import { uiCloseModal, uiOpenModal } from '../../actions/ui';
import { uiReducer } from '../../reducers/uiReducer';

const initState = {
  modelOpen: false,
};

describe('pruebas al uiReducer', () => {
  test('debe mostrar el valor por defecto', () => {
    const state = uiReducer(initState, {});
    expect(state).toEqual(initState);
  });

  test('debe abrir y cerrar el modal', () => {
    const openModal = uiOpenModal();
    const state = uiReducer(initState, openModal);
    // console.log(state);
    expect(state).toEqual({ modelOpen: false, modalOpen: true });

    const modalClose = uiCloseModal();
    const stateClose = uiReducer(state, modalClose);
    // console.log(stateClose);
    expect(stateClose).toEqual({ modelOpen: false, modalOpen: false });
  });
});
