import { types } from '../types/types'

//  {
//       id: new Date().getTime(),
//       title: 'Cumpleaños de Graciela',
//       start: moment().toDate(),
//       end: moment().add(2, 'hours').toDate(),
//       notes: 'Comprar la torta',
//       user: {
//         _id: '123',
//         name: 'Eduardo',
//       },
//     },

const initState = {
  events: [],
  activeEvent: null
}

export const calendarReducer = (state = initState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload
      }

    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload]
      }

    case types.eventClearActive:
      return {
        ...state,
        activeEvent: null
      }

    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        )
      }

    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter(
          (event) => event.id !== state.activeEvent.id
        ),
        activeEvent: null
      }

    case types.eventLoaded:
      return {
        ...state,
        events: [...action.payload]
      }

    case types.eventLogout:
      return {
        ...initState
      }
    default:
      return state
  }
}
