import { Badge, Flex, Text } from "@mantine/core";

export function MistakesRemaining() {
    return (
        // try to chance the visibility of the circles like the body parts in hangman
        <Flex
            direction={{ base: 'row', sm: 'row' }}
            gap={{ base: 'sm', sm: 'xs' }}
            justify={{ sm: 'center' }}
            wrap="nowrap"
        >
            <Text > Mistakes Remaining: </Text>
            <Badge size="xs" circle color="rgba(211, 154, 252, 1)"
                style={{marginTop:"5px"}}
            ></Badge>
            <Badge size="xs" circle color="rgba(211, 154, 252, 1)"
                style={{marginTop:"5px"}}
            ></Badge>
            <Badge size="xs" circle color="rgba(211, 154, 252, 1)"
                style={{marginTop:"5px"}}
            ></Badge>
            <Badge size="xs" circle color="rgba(211, 154, 252, 1)"
            style={{marginTop:"5px"}}
            ></Badge>
        </Flex>
    )
}