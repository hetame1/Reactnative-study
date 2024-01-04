import dayjs from "dayjs";
import React, { useState } from "react";

const defaultTodoList = [
  {
    id: 1,
    content: "Buy milk",
    date: dayjs(),
    isSuccess: true,
  },
  {
    id: 2,
    content: "Do homework",
    date: dayjs(),
    isSuccess: false,
  },
  {
    id: 3,
    content: "Read book",
    date: dayjs(),
    isSuccess: false,
  },
];

const useTodoList = (selectedDate) => {
  const [todoList, setTodoList] = useState(defaultTodoList);
  const [input, setInput] = useState("");

  const addTodo = () => {
    const len = todoList.length;
    const lastId = len === 0 ? 0 : todoList[len - 1].id;

    const newTodoList = [
      ...todoList,
      {
        id: lastId + 1,
        content: input,
        date: selectedDate,
        isSuccess: false,
      },
    ];

    setTodoList(newTodoList);
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  const toggleTodo = (id) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isSuccess: !todo.isSuccess,
        };
      }

      return todo;
    });

    setTodoList(newTodoList);
  };

  const filterTodoList = todoList.filter((todo) => {
    const isSameDate = dayjs(todo.date).isSame(selectedDate, "day");
    return isSameDate;
  });

  return {
    filterTodoList,
    input,
    setInput,
    addTodo,
    removeTodo,
    toggleTodo,
  };
};

export default useTodoList;
