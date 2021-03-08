import { fetchConToken } from '../helpers/fetch'
import { types } from '../types/types'
import { prepareEvents } from '../helpers/prepareEvents'
import Swal from 'sweetalert2'

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth
    try {
      const resp = await fetchConToken('events', event, 'POST')
      const body = await (await resp).json()
      console.log(body)
      console.log(event)
      if (body.ok) {
        event.id = body.evento.id
        event.user = {
          _id: uid,
          name: name
        }
        console.log(event)
        dispatch(eventAddNew(event))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event
})

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
})

export const eventClearActive = () => ({
  type: types.eventClearActive
})

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`events/${event.id}`, event, 'PUT')
      const body = await resp.json()
      if (body.ok) {
        dispatch(eventUpdated(event))
      } else {
        Swal.fire('Error', body.msg, 'error')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event
})

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent
    try {
      const resp = await fetchConToken(`events/${id}`, {}, 'DELETE')
      const body = await resp.json()
      if (body.ok) {
        dispatch(eventDeleted())
      } else {
        Swal.fire('Error', body.msg, 'error')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const eventDeleted = () => ({
  type: types.eventDeleted
})

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken('events')
      const body = await resp.json()
      const eventos = prepareEvents(body.eventos)
      dispatch(eventLoaded(eventos))
    } catch (error) {
      console.log(error)
    }
  }
}

const eventLoaded = (eventos) => ({
  type: types.eventLoaded,
  payload: eventos
})

export const eventLogout = () => ({
  type: types.eventLogout
})
