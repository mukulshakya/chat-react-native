import React from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import UserRow from "../../components/conversation/userRow";
import constants from "../../constants";
import TopBarWithSettingIcon from "../../components/conversation/topBarWithSettingIcon";
import SearchBar from "../../components/conversation/searchBar";

export default function Conversations({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TopBarWithSettingIcon
          title="Chat"
          icon="tune"
          navigation={navigation}
        />
        <SearchBar navigation={navigation} />
        <SafeAreaView style={{ height: constants.screen.height - 250 }}>
          <FlatList
            data={Array(100)
              .fill()
              .map((e, i) => i)}
            renderItem={({ index }) => (
              <UserRow
                count={index + 1}
                showUserDetailsModal={(param) => renderUserDetailsModal(param)}
                navigation={navigation}
              />
            )}
            keyExtractor={(index) => index + ""}
            styles={{ overflow: "none" }}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: "100%", backgroundColor: constants.colors.chatBg },
  innerContainer: { width: constants.screen.width - 40, marginLeft: 20 },
});
