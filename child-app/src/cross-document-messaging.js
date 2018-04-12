import {dispatch} from 'redux-easy';

export function addActionListener() {
  function listener(event) {
    const {data: action, origin} = event;
    if (action.type !== 'INIT_INSTANCE') {
      dispatch(action.type, action.payload);
    }
  }
  window.addEventListener('message', listener, false);
}

export function postAction(type, payload) {
  window.parent.postMessage({type, payload}, 'http://localhost:4200');
}
