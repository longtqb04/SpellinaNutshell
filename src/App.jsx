import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [words, setWords] = useState([]);
  const [word, setWord] = useState("");
  const [revealed, isRevealed] = useState(false);

  useEffect(() => {
    fetch("assets/wordlist_sf.txt")
      .then((response) => response.text())
      .then((text) => {
        const wordArray = text.split("\n").map(w => w.trim()).filter(Boolean)
        setWords(wordArray)
        if (wordArray.length > 0) {
          getNewWord(wordArray)
        }
      })
      .catch((error) => console.error("Error loading wordlist:", error))
  }, [])

  const getNewWord = (wordArray = words) => {
    if (wordArray.length > 0) {
      const newWord = wordArray[Math.floor(Math.random() * wordArray.length)]
      setWord(newWord)
      isRevealed(false)
      speakWord(newWord)
    }
  }

  const speakWord = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-GB";
      utterance.voice = speechSynthesis.getVoices().find(v => v.name.includes("Google UK English Male")) || null;
      utterance.pitch = 1;
      utterance.rate = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Text-to-Speech is not supported in this browser.");
    }
  }

  return (
    <>
      <div>
        <img src="assets/spell_2025_logo.png" className="logo spell" alt="Spell in a Nutshell logo"/>
      </div>
      <div>
        <div>
          <h1 class="word">{revealed ? word : ""}</h1>
        </div>
        <div class="card">
          <button onClick={() => isRevealed(true)}>Reveal</button>
          <button onClick={() => speakWord(word)}>Repeat</button>
          <button onClick={() => getNewWord()}>Get New Word</button>
        </div>
      </div>
      <br/>
      <br/>
      <p>Format by DTP Education Solutions. All rights reserved.</p>
    </>
  )
}

export default App
