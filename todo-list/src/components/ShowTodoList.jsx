import React from 'react';
import { useState, useEffect } from 'react';
import './style.css';
import axios from 'axios';
import UpdateTodo from './UpdateTask';
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

function TodoCard({ data, handleDelete, handleEdit }) {
    const { _id, description } = data;
    const [body, setBody] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef();
    return (
        <li key={_id}>
            <div className="todo">
                <p>{description}</p>
                <div className="buttons">
                    <button className="button" name={_id} onClick={handleEdit}>
                        <i className="fa-regular fa-pen-to-square" onClick={onOpen}></i>
                    </button>

                    <button className="button" name={_id} onClick={handleDelete}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </li>
    );
}

export function ShowTodoList() {
    const [todo, setTodo] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState('');
    const [update, setUpdate] = useState(false);

    const [body, setBody] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef();

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/todo')
            .then((res) => {
                console.log(res.data);
                setTodo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [update]);

    function handleEdit(e) {
        setId(e.target.name);
        setOpen(true);
    }

    function handleUpdate() {
        console.log('update:', update, !update);
        setUpdate(!update);
    }

    function handleDelete(e) {
        axios.delete(`http://localhost:8000/api/todo/${e.target.name}`);

        setTodo((data) => {
            return data.filter((todo) => todo._id !== e.target.name);
        });
    }

    function handleClose() {
        setId('');
        setOpen(false);
    }

    return (
        <section className="container">
            <div className="contents">
                <ul className="list-container">
                    {todo.map((data) => (
                        <TodoCard data={data} handleDelete={handleDelete} handleEdit={handleEdit} />
                    ))}
                </ul>
            </div>
            {open ? (
                <section className="update-container">
                    <div className="update-contents">
                        {/* <p onClick={handleClose} className="close">
                            &times;
                        </p> */}
                        <UpdateTodo _id={id} handleClose={handleClose} handleUpdate={handleUpdate} />
                    </div>
                </section>
            ) : (
                ''
            )}
        </section>
    );
}
