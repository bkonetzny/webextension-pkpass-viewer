function setHeader(headers, name, value) {
  for (var header of headers) {
    if (header.name.toLowerCase() == name.toLowerCase()) {
      header.value = value;
      return;
    }
  }

  headers.push({ name: name, value: value });
}

function removeHeader(headers, name) {
  for (var i = 0; i < headers.length; i++) {
    if (headers[i].name.toLowerCase() == name.toLowerCase()) {
      headers.splice(i, 1);
      return;
    }
  }
}

function changeResponseHeaders(details) {
  removeHeader(details.responseHeaders, 'Content-Disposition');
  setHeader(
    details.responseHeaders,
    'Content-Type',
    'text/html; charset=utf-8',
  );

  return {
    responseHeaders: details.responseHeaders,
  };
}

chrome.webRequest.onHeadersReceived.addListener(
  changeResponseHeaders,
  {
    urls: ['*://*/*.pkpass'],
    types: ['main_frame', 'sub_frame'],
  },
  ['blocking', 'responseHeaders'],
);
