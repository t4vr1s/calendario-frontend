import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab'
import { eventStartDelete } from '../../../actions/events'

jest.mock('../../../actions/events', () => ({
  eventStartDelete: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}
const store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
)

describe('pruebas al componente <DeleteEventFab />', () => {
  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('debe llamar al onClick=eventStartDelete', () => {
    wrapper.find('button').prop('onClick')()
    expect(eventStartDelete).toHaveBeenCalled()
  })
})
