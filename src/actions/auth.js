import Swal from 'sweetalert2'
import { fetchSinToken, fetchConToken } from '../helpers/fetch'
import { types } from '../types/types'
import { eventLogout } from './events'

export const starLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken('auth', { email, password }, 'POST')
    const body = await resp.json()
    const { ok, name, uid, token, msg } = body
    if (ok) {
      localStorage.setItem('token', token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(
        login({
          uid: uid,
          name: name
        })
      )
    } else {
      Swal.fire('Error', msg, 'error')
    }
  }
}

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      'auth/new',
      { name, email, password },
      'POST'
    )
    const body = await resp.json()
    const { ok, name: nameUser, uid, token, msg } = body
    if (ok) {
      localStorage.setItem('token', token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(
        login({
          uid: uid,
          name: nameUser
        })
      )
    } else {
      Swal.fire('Error', msg, 'error')
    }
  }
}

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken('auth/renew')
    const body = await resp.json()
    const { ok, name: nameUser, uid, token } = body
    if (ok) {
      localStorage.setItem('token', token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(
        login({
          uid: uid,
          name: nameUser
        })
      )
    } else {
      dispatch(checkingFinish())
    }
  }
}

const checkingFinish = () => ({
  type: types.authCheckingFinish
})

const login = (user) => ({
  type: types.authLogin,
  payload: user
})

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear()
    dispatch(eventLogout())
    dispatch(logout())
  }
}

const logout = () => ({
  type: types.authLogout
})
