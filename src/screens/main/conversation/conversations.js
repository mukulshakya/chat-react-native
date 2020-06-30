import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userListState } from "../../../recoil/atoms";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";

import UserRow from "../../../components/main/conversation/userRow";
import TopBarWithSettingIcon from "../../../components/main/conversation/topBarWithSettingIcon";
import SearchBar from "../../../components/main/conversation/searchBar";
import constants from "../../../constants";
import API from "../../../services/apiService";

export default function Conversations({ navigation }) {
  const [users, setUsers] = useRecoilState(userListState);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await API.getUsers();
    if (response.status === 200) {
      const { data, success } = response.data;
      success && setUsers([...data]);
    }
  };

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
            data={users}
            renderItem={({ item, index }) => (
              // console.log({ item }),
              <UserRow navigation={navigation} user={item} />
            )}
            keyExtractor={(item) => item._id}
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
