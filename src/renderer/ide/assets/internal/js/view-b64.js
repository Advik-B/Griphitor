const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const img = document.getElementById("viewer");
const b64data = urlParams.get('b64data')
if (urlParams.has('b64data')) {
  console.log(b64data);
  img.src=b64data;
} else {
  console.error("No b64data provided!");
};