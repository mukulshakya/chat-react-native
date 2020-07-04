import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import constants from "../../../constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function TopBarWithUsernameAndBack({
  navigation,
  username,
  fromUpload,
  sharePost,
  isPostReady,
}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={[styles.icon, { transform: [{ rotate: "-45deg" }] }]}
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons
          name="arrow-top-left"
          color={constants.colors.msgSent}
          size={35}
        />
      </TouchableOpacity>
      <Text style={styles.username}>{username}</Text>
      <TouchableOpacity
        disabled={fromUpload ? !isPostReady : false}
        style={[styles.icon, fromUpload && { marginTop: 18, marginRight: 5 }]}
        activeOpacity={0.7}
        onPress={() => {
          fromUpload ? sharePost() : navigation.navigate("Three");
        }}
      >
        {fromUpload ? (
          <Text
            style={[
              styles.shareText,
              {
                color: isPostReady
                  ? constants.colors.msgSent
                  : constants.colors.chatDate,
              },
            ]}
          >
            Share
          </Text>
        ) : (
          <MaterialCommunityIcons
            name="dots-vertical"
            color={constants.colors.msgSent}
            size={35}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

const {isIos, hasNotch} = constants.screen;
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingTop: isIos ? (hasNotch ? 30 : 10) : hasNotch ? 30 : 0,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  icon: { marginTop: 10 },
  username: { fontSize: 20, lineHeight: 60, color: constants.colors.username },
  shareText: { fontSize: 20 },
});
