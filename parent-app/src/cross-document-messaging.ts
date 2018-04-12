/**
 * This listens for messages from allowed domains
 * that are expected to contain a Redux action.
 * For now, rather than dispatch the action to ngrx/store,
 * this just sets a property on the supplied object
 * using the action type as the property name
 * and the action payload as the value.
 */
export function addActionListener(obj, allowedDomains) {
  const listener = event => {
    const {data: action, origin} = event;
    if (allowedDomains.includes(origin)) {
      obj[action.type] = action.payload;
    }
  };
  window.addEventListener('message', listener, false);
}

/**
 * This posts a Redux action object to all iframes.
 */
export function postAction(type, payload) {
  const iframes = document.querySelectorAll('iframe');

  for (let i = 0; i < iframes.length; i++) {
    const iframe = iframes[i];

    // TypeScript thinks the iframe element doesn't have a contentWindow property.
    // That is why it is being accessed this way.
    const window = iframe['contentWindow'];

    window.postMessage({type, payload}, iframe.src);
  }
}
