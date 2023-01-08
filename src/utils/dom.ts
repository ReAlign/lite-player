export function injectStyleTag(cont: string) {
  const styleTag = document.createElement('style');
  styleTag.innerHTML = cont;
  document.getElementsByTagName('head')[0].appendChild(styleTag);
}

export function injectJsTag(src: string) {
  const jsTag = document.createElement('script');
  jsTag.src = src;
  document.body.appendChild(jsTag);
}
