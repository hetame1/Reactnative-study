import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getCalendarColumns, getDayColor, getDayText } from "./src/util";
import { runPracticeDayjs } from "./src/practice-dayjs";
import { SimpleLineIcons } from "@expo/vector-icons";

const columnSize = 35;

const Column = ({ text, color, opacity, disabled, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        width: columnSize,
        height: columnSize,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isSelected ? "#c2c2c2" : "transparent",
        borderRadius: columnSize / 2,
      }}
    >
      <Text
        style={{
          color,
          opacity,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const ArrowButton = ({ onPress, iconName }) => {
  return (
    <TouchableOpacity style={{ paddingVertical: 15, paddingHorizontal: 20 }}>
      <SimpleLineIcons name={iconName} size={15} color="#404040" />
    </TouchableOpacity>
  );
};

export default function App() {
  const now = dayjs();
  const columns = getCalendarColumns(selectedDate);

  const [selectedDate, setSelectedDate] = useState(now);

  // 헤더 ( 요일, 날짜, 화살표 )
  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format("YYYY.MM.DD");

    return (
      <View>
        {/* < YYYY.MM.DD > */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* < 화살표 */}
          <ArrowButton iconName="arrow-left" />

          {/* 선택한 날짜 */}
          <Text
            style={{
              fontSize: 20,
              color: "#404040",
            }}
          >
            {currentDateText}
          </Text>

          {/* > 화살표 */}
          <ArrowButton iconName="arrow-right" />
        </View>

        {/* 일 ~ 토 */}
        <View style={{ flexDirection: "row" }}>
          {[0, 1, 2, 3, 4, 5, 6].map((day) => {
            const dayText = getDayText(day);
            const color = getDayColor(day);

            return (
              <Column
                key={`day-${day}`}
                text={dayText}
                color={color}
                opacity={1}
                disabled={true}
              />
            );
          })}
        </View>
      </View>
    );
  };

  // 날짜 ( 1 ~ 30 )
  const renderItem = ({ item: date }) => {
    const dateText = dayjs(date).get("date");
    const day = dayjs(date).get("day");
    const color = getDayColor(day);
    const isCurrentMonth = dayjs(date).isSame(selectedDate, "month");

    const onPress = () => {
      setSelectedDate(date);
    };

    const isSelected = dayjs(date).isSame(selectedDate, "date");

    return (
      <Column
        text={dateText}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.4}
        onPress={onPress}
        isSelected={isSelected}
      />
    );
  };

  useEffect(() => {
    runPracticeDayjs();
  }, []);

  useEffect(() => {
    console.log("selectedDate", dayjs(selectedDate).format("YYYY.MM.DD"));
  }, [selectedDate]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(_, index) => `column-${index}`}
        data={columns}
        numColumns={7}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
      />
    </SafeAreaView>
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
