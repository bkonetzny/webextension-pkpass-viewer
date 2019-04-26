document.body.innerHTML = `
<div id="container">
	<div id="result"></div>
	<div id="pass">
		<div class="side front">
			<div class="headerFields"></div>
			<div class="primaryFields"></div>
			<div class="secondaryFields"></div>
			<div class="auxiliaryFields"></div>
			<div id="qrcode"></div>
			<div class="switch switchToBack">(i)</div>
		</div>
		<div class="side back">
			<div class="switch switchToFront">&lt; back</div>
			<div class="backFields"></div>
		</div>
	</div>
	<div id="meta">
		<dl></dl>
	</div>
	<div id="files">
		<ul></ul>
	</div>
</div>
`;

var blob = null;
var xhr = new XMLHttpRequest();
xhr.open('GET', window.location.href);
xhr.responseType = 'arraybuffer';
xhr.onload = function() {
  const zip = new JSZip();
  zip.loadAsync(xhr.response).then(
    function(zip) {
      handleZip(zip);
    },
    function(e) {
      console.log(e);
    },
  );
};
xhr.send();
