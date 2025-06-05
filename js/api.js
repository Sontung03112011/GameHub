const apiKey = 'AIzaSyATfCFV-NcfZpV_xL2s5kBJh6TubyxzRkI'; // Replace with your actual API key
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

const requestData = {
  contents: [{
    parts: [{text: "Explain how AI works"}]
  }]
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(requestData)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));