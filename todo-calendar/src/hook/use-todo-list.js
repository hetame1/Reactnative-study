import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const TODO_LIST_KEY = "todoList";

const useTodoList = (selectedDate) => {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");

  const saveTodoList = (newTodoList) => {
    setTodoList(newTodoList);
    AsyncStorage.setItem(TODO_LIST_KEY, JSON.stringify(newTodoList));
  };

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

    saveTodoList(newTodoList);
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);

    saveTodoList(newTodoList);
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

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const result = await AsyncStorage.getItem(TODO_LIST_KEY);
    if (result) {
      setTodoList(JSON.parse(result));
    }
  };

  return {
    filterTodoList,
    todoList,
    input,
    setInput,
    addTodo,
    removeTodo,
    toggleTodo,
  };
};

export default useTodoList;
