import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    FormControl,
    useDisclosure,
    IconButton,
} from '@chakra-ui/react';

function UpdateTodo({ _id, handleClose, handleEdited }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [body, setBody] = useState('');

    const initialRef = React.useRef();
    const [data, setData] = useState({ description: '' });

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        console.log({ _id }, { data });

        axios
            .put(`http://localhost:8000/api/todo/${_id}`, data)
            .then((res) => {
                setData({ description: '' });
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log('Failed to update todo');
                console.log(err.message);
            });
    }

    return (
        <>
            <form
                className="form-container"
                onSubmit={(e) => {
                    handleSubmit(e);
                    handleEdited();
                    handleClose();
                }}
            >
                <input type="text" name="description" placeholder="Enter your task" onChange={handleChange} />
                <button type="submit" colorScheme="blue" onClick={handleSubmit}>
                    Save
                </button>
            </form>
        </>
    );
}

export default UpdateTodo;
