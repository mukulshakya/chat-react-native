import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import constants from "../../../constants";

export default function Post({ title }) {
  const [expanded, setExpanded] = useState(false);
  const randomCaption = `gshghjgfjhgsfhjgsfhgsfhsfgshghjgfjhgsfhjgsfhgsfhsfgshghjgfjhgsfhjgsfhgsfhsfgshghjgfjhgsfhjgsfhgsfhsfgshghjgfjhgsfhjgsfhgsfhsfgshghjgfjhgsfhjgsfhgsfhsfgshghjgfjhgsfhjgsfhgsfhsfgshghjgfjhgsfhjgsfhgsfhsfgshghjgfjhgsfhjgsfhgsfhsf`;

  const renderCaption = () => {
    return (
      <Text style={styles.caption}>
        {expanded ? randomCaption : randomCaption.substr(0, 100) + "... "}
        <Text
          style={{ color: constants.colors.chatDate }}
          onPress={() => setExpanded(!expanded)}
        >
          {expanded ? " less" : "more"}
        </Text>
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.userDetails}>
        <Image
          source={{ uri: constants.dummy.images.user }}
          style={styles.userImg}
        />
        <Text style={styles.userName}>Username</Text>
      </View>
      <View>
        <Image
          source={{ uri: constants.dummy.images.post }}
          style={styles.postImg}
        />
      </View>
      <View style={styles.activity}>
        <View style={styles.likeComment}>
          <View style={styles.like}>
            <TouchableOpacity activeOpacity={0.8}>
              <MaterialCommunityIcons
                name="thumb-up-outline"
                color={constants.colors.username}
                size={30}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.comment}>
            <TouchableOpacity activeOpacity={0.8}>
              <MaterialCommunityIcons
                name="comment-processing-outline"
                color={constants.colors.username}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.save}>
          <TouchableOpacity activeOpacity={0.8}>
            <MaterialCommunityIcons
              name="bookmark-plus-outline"
              color={constants.colors.username}
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.captionWrapper}>{renderCaption()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingLeft: 10,
  },
  userImg: { height: 40, width: 40 },
  userName: {
    fontSize: 20,
    color: constants.colors.username,
    marginLeft: 10,
    fontWeight: "bold",
  },
  postImg: { width: "100%", height: constants.screen.height / 4 },
  activity: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeComment: { flexDirection: "row" },
  comment: { marginLeft: 10 },
  captionWrapper: { paddingHorizontal: 10 },
  caption: { color: constants.colors.username },
});
