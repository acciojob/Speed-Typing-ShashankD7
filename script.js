
function getRandomQuote() {
  return fetch('http://api.quotable.io/random')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      return data.content;
    })
    .catch(function(error) {
      alert(error);
    });
}


async function updateQuote() {
  const quoteElement = document.getElementById('quote');
  const quoteInput = document.getElementById('quoteInput');
  quoteInput.value = ''; // Clear the input area
  quoteInput.disabled = true; // Disable input during quote fetch
  quoteElement.innerText = 'Fetching a quote...';

  const quote = await getRandomQuote();
  quoteElement.innerText = quote;
  quoteInput.disabled = false; // Re-enable input
}

// Function to compare typed text with the quote
function checkQuote() {
  const quote = document.getElementById('quote').innerText;
  const quoteInput = document.getElementById('quoteInput');
  const timerElement = document.getElementById('time');

  const typedText = quoteInput.value;
  const correctText = quote.slice(0, typedText.length);
  const remainingText = quote.slice(typedText.length);

  if (typedText === quote) {
    quoteInput.className = 'correct';
    setTimeout(updateQuote, 3000); // Wait for 3 seconds before updating the quote
    quoteInput.disabled = true; // Disable input temporarily
    clearInterval(timer); // Stop the timer
    timerElement.innerText = '0';
  } else if (typedText === correctText) {
    quoteInput.className = '';
  } else {
    quoteInput.className = 'incorrect';
  }
}

// Function to start the timer
function startTimer() {
  let time = 0;
  const timerElement = document.getElementById('time');
  timerElement.innerText = time;

  timer = setInterval(() => {
    time++;
    timerElement.innerText = time;
  }, 1000);
}

// Event listener for input changes
document.getElementById('quoteInput').addEventListener('input', checkQuote);

// Initial setup
updateQuote();
startTimer();

