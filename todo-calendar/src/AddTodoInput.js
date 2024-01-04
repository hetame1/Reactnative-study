import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { ITEM_WIDTH, bottomSpace } from "./util";
import { AntDesign } from "@expo/vector-icons";

const AddTodoInput = ({
  value,
  onChangeText,
  placeholder,
  onPressAdd,
  onSubmitEditing,
  onFocus,
}) => {
  return (
    <View
      style={{
        width: ITEM_WIDTH,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={{
          flex: 1,
          padding: 5,
          color: "#595959",
        }}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
        onFocus={onFocus}
      />
      <TouchableOpacity
        style={{
          padding: 5,
        }}
        onPress={onPressAdd}
      >
        <AntDesign name="plus" size={18} color="#595959" />
      </TouchableOpacity>
    </View>
  );
};

export default AddTodoInput;
