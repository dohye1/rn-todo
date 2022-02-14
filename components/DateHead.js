import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

export default function DateHead({date}) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${year}년 ${month}월 ${day}일`;
  const {top} = useSafeAreaInsets();
  return (
    <>
      <View style={[styles.StatusBarPlaceholder, {height: top}]} />
      <StatusBar backgroundColor="#26a69a" barStyle="light-content" />
      <View style={styles.block}>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  StatusBarPlaceholder: {
    backgroundColor: '#26a69a',
  },
  block: {
    padding: 16,
    backgroundColor: '#26a69a',
  },
  dateText: {
    fontSize: 24,
    color: 'white',
  },
});
