import { Button, Flex } from "@mantine/core";

type GameProps = {
    selectedButtons: string[]
    handleDeselectAll: any
    handleShuffle: () => void
    handleSubmit: () => void
    paperRows: number
}

export function GameButtons({ selectedButtons, handleDeselectAll, paperRows,
    handleShuffle, handleSubmit } : GameProps) {
    // when four words are selected enable Submit button
    // when one or more words are selected enable Deselect all button
        // after Deselect all is clicked, disable Deselect all and Submit buttons
    // Shuffle is always enabled
    
    return (
        <Flex
            direction={{ base: 'row', sm: 'row' }}
            gap={{ base: 'sm', sm: 'xs' }}
            justify={{ sm: 'center' }}
        >
            <Button variant="default" radius="xl" size="md"
                onClick={handleShuffle}
                disabled={paperRows === 4}
            >
                Shuffle
            </Button>
            <Button variant="default" radius="xl" size="md"
                disabled={selectedButtons.length < 1}
                onClick={handleDeselectAll}
            >
                Deselect All
            </Button>
            <Button variant="default" radius="xl" size="md"
                disabled={selectedButtons.length != 4}
                onClick={handleSubmit}
            >
                Submit
            </Button>
        </Flex>
    )
}