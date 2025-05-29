export const register = (formData) => {
    const url = 'http://localhost:8080/api/register'
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
export const checkTaken = async (username) => {
  const url = 'http://localhost:8080/api/check-username';
  try {
    const response = await fetch(`${url}?username=${encodeURIComponent(username)}`);
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Lỗi khi kiểm tra username:', error);
    return false;
  }
};
