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
            <Modal isCentered initialFocusRef={initialRef} isOpen={true} onClose={onClose}>
                <ModalOverlay />
                <ModalContent w="90%">
                    <ModalHeader>Update your task</ModalHeader>
                    <ModalCloseButton onClick={handleClose} />
                    <ModalBody pb={6}>
                        <FormControl
                            className="form-container"
                            onSubmit={(e) => {
                                handleSubmit(e);
                                handleEdited();
                                handleClose();
                            }}
                        >
                            <Input
                                ref={initialRef}
                                type="text"
                                name="description"
                                onChange={handleChange}
                                placeholder="Enter your task"
                            />
                            <ModalFooter pr={0}>
                                <Button type="submit" onClick={handleSubmit} colorScheme="blue">
                                    Save
                                </Button>
                            </ModalFooter>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UpdateTodo;
