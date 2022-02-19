/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import todoStorage from './storages/todoStorage';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  useColorScheme,
  View,
  Platform,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import DateHead from './components/DateHead';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Empty from './components/Empty';

const App = () => {
  const today = new Date();

  const [todos, setTodos] = useState([
    {id: 1, text: '작업환경 설정', done: true},
    {id: 2, text: '리액트 네이티브 기초 공부', done: false},
    {id: 3, text: '투두 리스트 만들어보기', done: false},
  ]);

  const onInsert = text => {
    const nextId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const newTodo = {
      id: nextId,
      text,
      done: false,
    };
    setTodos([...todos, newTodo]);
  };

  const onToggle = todoId => {
    const plate = todos.map(todo => {
      if (todo.id === todoId) {
        return {...todo, done: !todo.done};
      }
      return todo;
    });
    setTodos(plate);
  };

  const onRemove = todoId => {
    setTodos(todos.filter(({id}) => id !== todoId));
  };

  useEffect(() => {
    todoStorage.get().then(setTodos).catch(console.error);
  }, []);

  useEffect(() => {
    todoStorage.set(todos).catch(console.error);
  }, [todos]);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['bottom']} style={styles.block}>
        <KeyboardAvoidingView
          style={styles.avoid}
          behavior={Platform.select({ios: 'padding'})}>
          <DateHead date={today} />
          {todos.length > 0 ? (
            <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
          ) : (
            <Empty />
          )}
          <AddTodo onInsert={onInsert} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
  },
});
export default App;
