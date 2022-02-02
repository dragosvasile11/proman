export async function isUserLoggedIn() {
    
    const requestUrl = '/api/check-if-user-logged-in';
    const request = new Request(requestUrl);
    
    const response = await fetch(request);

    await response.json()
    .then(value => localStorage.setItem('userLoggedIn', value.response))

}