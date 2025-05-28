export const register = ({userName, userPasswordHash,userEmail}) => {
    const url = 'http://localhost:8080/api/register';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify({ userName, userPasswordHash, userEmail }),
        })
    .then(response => response.json())
    .then(result => console.log('Success:', result))
    .catch(error => console.error('Error:', error))
}