import { useState } from 'react';
import { Button, HStack, Input } from '@chakra-ui/react';
import axios from 'axios';

function CreateTodo() {
    const [data, setData] = useState({ description: '' });

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const todo = {
            description: data.description,
        };

        console.log({ todo });
        axios
            .post('http://localhost:8000/api/todo', data)
            .then((res) => {
                setData({ description: '' });
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Error, couldn't create TODO");
                console.log(err.message);
            });
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <HStack mt="4" mb="4">
                <Input
                    h="46"
                    type="text"
                    name="description"
                    borderColor={'transparent'}
                    variant="filled"
                    placeholder="Enter your task"
                    value={data.description}
                    onChange={handleChange}
                />
                <Button colorScheme="twitter" px="8" pl="10" pr="10" h="46" type="submit">
                    Add
                </Button>
            </HStack>
        </form>
    );
}

export default CreateTodo;
