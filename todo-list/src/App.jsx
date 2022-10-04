import { Heading, IconButton, VStack, useColorMode } from '@chakra-ui/react';
import { ShowTodoList } from './components/ShowTodoList';
import CreateTodo from './components/CreateTodo';
import { FaSun, FaMoon } from 'react-icons/fa';

const App = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <VStack p={4} minH="100vh" pb={28}>
            <IconButton
                icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
                isRound="true"
                size="md"
                alignSelf="flex-end"
                onClick={toggleColorMode}
                aria-label="toogle-dark-mode"
            />

            <Heading
                p="5"
                fontWeight="extrabold"
                size="xl"
                bgGradient="linear(to-r, red.500, yellow.500)"
                bgClip="text"
            >
                Todo list
            </Heading>
            <CreateTodo />
            <ShowTodoList />
        </VStack>
    );
};

export default App;
