import { useState } from 'react';
import './App.css';
import { Text, Title } from '@mantine/core';
import { GridOfWords } from './GridOfWords';
import { GameButtons } from './GameButtons';
import { MistakesRemaining } from './MistakesRemaining';
import { connectWords } from './data';

function shuffleArray(array: any[]): any[] {
  return array.sort(() => Math.random() - 0.5);
}

function App() {
  // track the selected buttons
  const [selectedButtons, setSelectedButtons] = useState<string[]>([])
  const [shuffledData, setShuffledData] = useState(connectWords[0])
  // max number of selectable buttons.
  const maxSelections = 4

  const handleButtonClick = (word: string) => {
    setSelectedButtons((prevSelectedButtons) => {
      // If word is already selected, it removes it from selectedButtons.
      // If word is not selected and the max selections have not been reached, it adds the word to selectedButtons.
      if (prevSelectedButtons.includes(word)) {
        return prevSelectedButtons.filter((selectedWord) => selectedWord !== word)
      } else if (prevSelectedButtons.length < maxSelections) {
        return [...prevSelectedButtons, word]
      } else {
        return prevSelectedButtons
      }
    })
  }
  // If the number of selected buttons has reached the maximum and the button is not currently selected, then true.
  const isButtonDisabled = (word: string) => {
    return selectedButtons.length >= maxSelections && !selectedButtons.includes(word)
  }

  const handleDeselectAll = () => {
    setSelectedButtons([])
  }

  const handleShuffle = () => {
    const flattenedWords = connectWords[0].flatMap(item => item.words);
    const shuffledWords = shuffleArray(flattenedWords);
    const newShuffledData = connectWords[0].map(item => ({
      ...item,
      words: shuffledWords.splice(0, item.words.length)
    }));
    setShuffledData(newShuffledData);
  }

  return (
    <div 
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto", 
        alignItems: "center"
      }} >
      <Title size="h1" >Connections</Title>
      <Text size='lg' >Create four groups of four</Text>
      <GridOfWords data={shuffledData}
        selectedButtons={selectedButtons}
        handleButtonClick={handleButtonClick}
        isButtonDisabled={isButtonDisabled}
      />
      <MistakesRemaining />
      <GameButtons 
        selectedButtons={selectedButtons}
        handleDeselectAll={handleDeselectAll}
        handleShuffle={handleShuffle}
      />
    </div>
  )
}

export default App
