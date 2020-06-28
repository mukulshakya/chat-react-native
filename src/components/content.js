import React, { useState, useRef } from "react";
import {
  StyleSheet,
  FlatList,
  Dimensions,
  SafeAreaView,
  View,
  Animated,
} from "react-native";
import UserRow from "./conversation/userRow";
import UserDetails from "./userDetailsModal";

const screenHeight = Math.round(Dimensions.get("window").height);
const viewHeight = screenHeight - 238;

export default function Body(props) {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [currentUser, setCurrentUser] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // console.log({ props });

  const renderUserDetailsModal = ({ count }) => {
    setCurrentUser(count);
    setShowUserDetails(true);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
    }).start(() => setShowUserDetails(false));
  };

  return (
    <View>
      <View style={{ paddingHorizontal: 20 }}>
        <SafeAreaView style={{ height: viewHeight }}>
          <FlatList
            data={Array(100)
              .fill()
              .map((e, i) => i)}
            renderItem={({ index }) => (
              <UserRow
                count={index + 1}
                showUserDetailsModal={(param) => renderUserDetailsModal(param)}
              />
            )}
            keyExtractor={(index) => index + ""}
            styles={{ overflow: "none" }}
          />
        </SafeAreaView>
      </View>
      {showUserDetails && (
        <UserDetails
          image={"https://i.ya-webdesign.com/images/user-avatar-png-7.png"}
          username={"username " + currentUser}
          viewHeight={viewHeight}
          closeModal={() => closeModal()}
          animate={fadeAnim}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
