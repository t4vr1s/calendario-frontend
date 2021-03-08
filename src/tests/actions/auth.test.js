import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import { starLogin, startChecking, startRegister } from '../../actions/auth'
import Swal from 'sweetalert2'
import * as fetchModule from '../../helpers/fetch'
import { types } from '../../types/types'

const middlewares = [thunk]
const moskStore = configureStore(middlewares)

const initState = {}
let store = moskStore(initState)

Storage.prototype.setItem = jest.fn()

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}))

describe('pruebas en las action de auth', () => {
  beforeEach(() => {
    store = moskStore(initState)
    jest.clearAllMocks()
  })

  test('startLogin debe iniciar correctamente', async () => {
    await store.dispatch(starLogin('eescobar@computin.cl', 'gracielita'))
    const actions = store.getActions()
    // console.log(actions);

    expect(actions[0]).toEqual({
      type: '[auth] Login',
      payload: { uid: expect.any(String), name: expect.any(String) }
    })

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      expect.any(String)
    )

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number)
    )

    // token = localStorage.setItem.mock.calls[0][1]
  })

  test('startLogin debe fallar', async () => {
    await store.dispatch(starLogin('eescobar@computin.cl', 'pass-incorrecto'))
    let actions = store.getActions()
    // console.log(actions);
    expect(actions).toEqual([])
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'password invalido',
      'error'
    )
    await store.dispatch(starLogin('eduardoescobar@computin.cl', 'gracielita'))
    actions = store.getActions()
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'no existe el email',
      'error'
    )
  })

  test('startRegister correcto', async () => {
    fetchModule.fetchSinToken = jest.fn(() => ({
      json () {
        return {
          ok: true,
          uid: 123,
          name: 'carlos',
          token: 'eladfil3jol9a393oi0'
        }
      }
    }))

    await store.dispatch(startRegister('test@computin.cl', 'computin', 'test'))
    const actions = store.getActions()
    // console.log(actions);
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: 123,
        name: 'carlos'
      }
    })

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      'eladfil3jol9a393oi0'
    )

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number)
    )
  })

  test('startChecking correcto', async () => {
    fetchModule.fetchConToken = jest.fn(() => ({
      json () {
        return {
          ok: true,
          uid: 123,
          name: 'carlos',
          token: 'eladfil3jol9a393oi0'
        }
      }
    }))

    await store.dispatch(startChecking())
    const actions = store.getActions()
    // console.log(actions);
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: 123,
        name: 'carlos'
      }
    })

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      'eladfil3jol9a393oi0'
    )
  })
})
