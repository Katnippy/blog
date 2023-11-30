function info(...params) {
  console.log(...params);
}

function error(...params) {
  console.error(...params);
}

export default { info, error };