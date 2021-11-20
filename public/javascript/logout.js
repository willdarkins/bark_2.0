//async function that creates POST route logging user out of session
async function logout() {
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  });

  //conditional that sends user back to homepage if logout was successful
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}
//event listener to ultimatley logs user out
document.querySelector('#logout').addEventListener('click', logout);