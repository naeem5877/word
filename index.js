const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint to get definition of a word
app.get('/api/word/:word', async (req, res) => {
  const { word } = req.params;

  try {
    const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`);
    const data = response.data;

    // If the word is found, return the definition
    if (data.length > 0) {
      const definition = data[0].meanings[0].definitions[0].definition;
      res.json({ word, definition });
    } else {
      res.status(404).json({ error: 'Word not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
