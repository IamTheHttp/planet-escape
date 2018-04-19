/* istanbul ignore next */
if (!document.getElementsByTagName('title')[0]) {
  let titleElm = document.createElement('title');
  document.head.appendChild(titleElm);
}

let title = document.getElementsByTagName('title')[0];
title.innerHTML = 'Planet Escape!';


let meta = document.createElement('meta');
meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
meta.name = 'viewport';
document.head.appendChild(meta);
