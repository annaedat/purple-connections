import { useState } from 'react';
import './App.css';
import { Button, Paper, SimpleGrid, Text, Title } from '@mantine/core';
import { GridOfWords } from './GridOfWords';
import { GameButtons } from './GameButtons';
import { MistakesRemaining } from './MistakesRemaining';
import { connectWords } from './data';

// randomizes order of elements in array
function shuffleArray(array: string[]): string[] {
  return array.sort(() => Math.random() - 0.5);
}

// Creates a single array that contains all the words from all DataItem objects in the data array.
const wordDataToArray = () => {
  return connectWords[0].flatMap(item => item.words)
}

function App() {
  // track the selected buttons
  const [selectedButtons, setSelectedButtons] = useState<string[]>([])
  const [shuffledWords, setShuffledWords] = useState<string[]>(shuffleArray(wordDataToArray()))
  //const [guessCandidates, setGuessCandidates] = useState<>
  const [paperRows, setPaperRows] = useState<number>(0);
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

  // Create shallow copy of the shuffledWords array, shuffles it and updates shuffledWords state with the shuffled array using setShuffledWords.
  const handleShuffle = () => {
    setShuffledWords(shuffleArray([...shuffledWords]))
  }

  const handleSubmit = () => {
    const selectedCategories = new Set<string>()
    // Checks if the selected buttons belong to the same category.
    selectedButtons.forEach((word) => {
      const tempcategory = connectWords[0].find((item) => item.words.includes(word))?.category
      if (tempcategory) {
        selectedCategories.add(tempcategory)
      }
    });

    if (selectedCategories.size === 1) {
      if (paperRows < 4) {
        // Move other buttons to remaining rows
        const remainingWords = shuffledWords.filter((word) => !selectedButtons.includes(word))
        // Update shuffledWords state
        setShuffledWords([...selectedButtons, ...remainingWords])
        setSelectedButtons([]) // Clear selected buttons
        setPaperRows(paperRows + 1);
      } else {
        console.log("All rows are transformed to papers.");
      }
    } else {
      // Handle error or display message indicating buttons are not from the same category
      console.log("Buttons are not from the same category.")
    }
  }

  return (
    <div 
      style={{
        maxWidth: "800px", display: "flex", flexDirection: "column",
        gap: "2rem", margin: "0 auto", alignItems: "center",
      }} 
      >
      <Title size="h1" >Connections</Title>
      <Text size='lg' >Create four groups of four</Text>
      <GridOfWords data={connectWords[0]}
        shuffledWords={shuffledWords}
        selectedButtons={selectedButtons}
        handleButtonClick={handleButtonClick}
        isButtonDisabled={isButtonDisabled}
        paperRows={paperRows}
      />
      <MistakesRemaining />
      <GameButtons 
        selectedButtons={selectedButtons}
        handleDeselectAll={handleDeselectAll}
        handleShuffle={handleShuffle}
        handleSubmit={handleSubmit}
        paperRows={paperRows}
      />
    </div>
  )
}

export default App
