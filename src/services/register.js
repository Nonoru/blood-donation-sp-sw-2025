export const register = (formData) => {
    const url = 'http://localhost:8080/api/register';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(formData),
        })
    .then(response => response.json())
    .then(result => console.log('Success:', result))
    .catch(error => console.error('Error:', error))
}