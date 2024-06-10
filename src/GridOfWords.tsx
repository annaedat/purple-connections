import { Button, SimpleGrid } from "@mantine/core";

interface DataItem {
    category: string
    words: string[]
    difficulty: number
}

type GridProps = {
    data: DataItem[]
    selectedButtons: string[]
    handleButtonClick: (word: string) => void
    isButtonDisabled: (word: string) => boolean
}
export function GridOfWords({ data, selectedButtons, handleButtonClick, isButtonDisabled} : GridProps) {
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
            {data.flatMap((item, index) => (
                item.words.map((word, wordIndex) => (
                    <Button 
                        key={`${index}-${wordIndex}`}
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
                ))
            }
        </SimpleGrid>
    )
}