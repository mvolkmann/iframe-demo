import {dispatch} from 'redux-easy';

export function addActionListener(allowedDomains) {
  function listener(event) {
    const {data: action, origin} = event;
    if (allowedDomains.includes(origin)) {
      dispatch(action.type, action.payload);
    }
  }
  window.addEventListener('message', listener, false);
}

export function postActionToParent(parentDomain, type, payload) {
  window.parent.postMessage({type, payload}, parentDomain);
}
