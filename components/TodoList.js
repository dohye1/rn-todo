import React from 'react';
import TodoItem from './TodoItem';
import {View, Text, FlatList, StyleSheet} from 'react-native';

function TodoList({todos, onToggle, onRemove}) {
  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      style={styles.list}
      data={todos}
      renderItem={({item}) => (
        <TodoItem {...item} onToggle={onToggle} onRemove={onRemove} />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
}

export default TodoList;

const styles = StyleSheet.create({
  list: {flex: 1},
  separator: {backgroundColor: '#e0e0e0', height: 1},
});
