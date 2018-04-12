export function addActionListener(obj) {
  const frame = window.frames; // Why not an array?
  const listener = event => {
    const {data: action, origin} = event;
    obj.message = action.payload;
  };
  frame.addEventListener('message', listener, false);
}

export function postAction(type, payload) {
  const iframe = document.getElementById('foo-container');
  iframe.contentWindow.postMessage({type, payload}, 'http://localhost:3000');
}
