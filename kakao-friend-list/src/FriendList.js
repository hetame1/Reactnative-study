import React from "react";
import { ScrollView, View } from "react-native";
import Profile from "./Profile";
import Margin from "./Margin";

const FriendList = (props) => {
  if (!props.isOpened) return null;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {props.data.map((profile, index) => {
        return (
          <View key={index}>
            <Profile
              uri={profile.uri}
              name={profile.name}
              introduction={profile.introduction}
            />
            <Margin height={13} />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default FriendList;
