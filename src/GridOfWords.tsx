import { Button, Paper, SimpleGrid, Text } from "@mantine/core";
import React from "react";

interface DataItem {
    category: string
    words: string[]
    difficulty: number
}

type GridProps = {
    data: DataItem[]
    shuffledWords: string[]
    selectedButtons: string[]
    handleButtonClick: (word: string) => void
    isButtonDisabled: (word: string) => boolean
    paperRows: number
}
export function GridOfWords({data, shuffledWords, selectedButtons, 
    handleButtonClick, isButtonDisabled, paperRows} : GridProps) {
    /*// track the selected buttons
    const [selectedButtons, setSelectedButtons] = useState<string[]>([])
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
    }*/

    return (
        <SimpleGrid cols={4}>
            {Array.from({ length: 4 }).map((_, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        {rowIndex < paperRows ? (
                            <Paper
                                shadow="xs"
                                p="md"
                                style={{
                                    gridColumn: "span 4",
                                    textAlign: "center",
                                    backgroundColor: "#f5f5f5",
                                }}
                            >
                                <Text size="sm"
                                    style={{ 
                                        padding: "3px",
                                        textTransform: "uppercase"
                                    }}
                                >
                                    {shuffledWords.slice(rowIndex * 4, rowIndex * 4 + 4).join(' ')} 
                                </Text>
                                
                            </Paper>
                        ) : (
                            shuffledWords.slice(rowIndex * 4, rowIndex * 4 + 4).map((word, index) => (
                                <Button
                                    key={index}
                                    variant="light" color="violet" size="md" 
                                    onClick={() => handleButtonClick(word)}
                                    disabled={isButtonDisabled(word)}
                                    style={{
                                        display: "flex", justifyContent: "center", height:"70px",
                                        textTransform: "uppercase",
                                        backgroundColor: selectedButtons.includes(word) ? "#6E48EB" : '',
                                        color: selectedButtons.includes(word) ? 'white' : '',
                                    }}
                                >
                                    {word}
                                </Button>
                            ))
                        )}
                    </React.Fragment>
                ))}
            
            {/*}
            {shuffledWords.map((word, index) => (
                    <Button 
                        key={index}
                        variant="light" color="violet" size="md" 
                        onClick={() => handleButtonClick(word)}
                        disabled={isButtonDisabled(word)}
                        style={{
                            display: "flex", justifyContent: "center", height:"70px",
                            textTransform: "uppercase",
                            backgroundColor: selectedButtons.includes(word) ? "#6E48EB" : '',
                            color: selectedButtons.includes(word) ? 'white' : '',
                        }}
                    >
                        {word}
                    </Button>
                    
                ))
            }*/}
        </SimpleGrid>
    )
}