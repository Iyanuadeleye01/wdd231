const urlStrings= window.location.search;
console.log(urlStrings);

const formInfo = new URLSearchParams(urlStrings);
console.log(formInfo);

// console.log(formInfo.get("firstName"));

document.querySelector("#form-submission").innerHTML =`
<p>First Name: ${formInfo.get("firstName")}</p>
<p>Last Name: ${formInfo.get("lastName")}</p>
<p>Email: ${formInfo.get("email")}</p>
<p>Phone Number: ${formInfo.get("phone")}</p>
<p>Business Name: ${formInfo.get("organization")}</p>
<p>Organization Title: ${formInfo.get("orgTitle")}</p>
<p>The form was submitted at: ${formInfo.get("timestamp")}</p>

`;
