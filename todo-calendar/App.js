import dayjs from "dayjs";
import { useEffect } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";

import {
  ITEM_WIDTH,
  bottomSpace,
  getCalendarColumns,
  statusBarHeight,
} from "./src/util";
import { runPracticeDayjs } from "./src/practice-dayjs";
import useCalendar from "./src/hook/use-calendar";
import useTodoList from "./src/hook/use-todo-list";
import Calendar from "./src/Calendar";
import Margin from "./src/Margin";
import AddTodoInput from "./src/AddTodoInput";

export default function App() {
  const now = dayjs();
  const columns = getCalendarColumns(selectedDate);

  const {
    selectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtractMonth,
    addMonth,
    setSelectedDate,
  } = useCalendar(now);

  const { todoList, input, setInput, addTodo, removeTodo, toggleTodo } =
    useTodoList(selectedDate);

  const onPressLeftArrow = subtractMonth;
  const onPressRightArrow = addMonth;

  useEffect(() => {
    runPracticeDayjs();
  }, []);

  const ListHeaderComponent = () => (
    <View>
      <Calendar
        selectedDate={selectedDate}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
        onPressHeaderDate={showDatePicker}
        onPressDate={setSelectedDate}
        columns={columns}
      />
      <Margin height={15} />
      <View
        style={{
          width: 4,
          height: 4,
          borderRadius: 4 / 2,
          backgroundColor: "#a3a3a3",
          alignSelf: "center",
        }}
      />

      <Margin height={15} />
    </View>
  );

  const renderItem = ({ item: todo }) => {
    const isSuccess = todo.isSuccess;

    return (
      <View
        style={{
          flexDirection: "row",
          width: ITEM_WIDTH,
          // backgroundColor: todo.id % 2 === 0 ? "pink" : "skyblue",
          alignSelf: "center",
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderBottomWidth: 0.2,
          borderColor: "#a6a6a6",
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 14,
            color: "#595959",
          }}
        >
          {todo.content}
        </Text>

        <Ionicons
          name="ios-checkmark"
          size={17}
          color={isSuccess ? "#595959" : "#bfbfbf"}
        />
      </View>
    );
  };

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2018/02/15/14/37/paper-3155438_1280.jpg",
        }}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <>
          <FlatList
            data={todoList}
            ListHeaderComponent={ListHeaderComponent}
            contentContainerStyle={{
              paddingTop: statusBarHeight + 20,
            }}
            renderItem={renderItem}
          />

          <AddTodoInput
            value={input}
            onChangeText={setInput}
            placeholder={`${dayjs(selectedDate).format("MM.D")}에 추가할 투두`}
            // onPressAdd={onPressAdd}
          />
        </>
      </KeyboardAvoidingView>

      <Margin height={50} />

      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
