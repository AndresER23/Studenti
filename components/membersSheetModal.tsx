import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { forwardRef, useMemo, useCallback } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheet,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import colors from "../commons/colors";
import { FlatList } from "react-native-gesture-handler";
export type Ref = BottomSheetModal;
import Ionicons from "@expo/vector-icons/Ionicons";

interface Navigator {
  navigator: any;
}
interface CalendarSheetModalProps {
  members: Array<String>;
}

const MembersSheetModal = forwardRef<Ref, Navigator & CalendarSheetModalProps>(
  (props, reference) => {
    const snapPoints = useMemo(() => ["35%"], []);
    const renderBackDrop = useCallback(
      (props) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      ),
      []
    );
    const { dismiss } = useBottomSheetModal();
    const { members } = props;

    let NumColumns = 1;
    if (members.length > 6) {
      NumColumns = 2;
    } else if (members.length > 12) {
      NumColumns = 3;
    }
    return (
      <BottomSheetModal
        snapPoints={snapPoints}
        backdropComponent={renderBackDrop}
        ref={reference}
        enableOverDrag={false}
        handleStyle={{
          backgroundColor: "#232229",
          borderTopStartRadius: 13,
          borderTopEndRadius: 13,
          height: 35,
        }}
      >
        <View style={styles.container}>
          <FlatList
            data={members}
            numColumns={1}
            style={{
              flex: 1,
              gap: 20,
            }}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
            renderItem={(item) => {
              return (
                <View key={item.index} style={styles.textContainer}>
                  <Text>{item.index + 1}.</Text>
                  <Text style={styles.text}>{item.item}</Text>
                  <Ionicons
                    name="person-remove-outline"
                    size={18}
                    style={styles.icon}
                  />
                </View>
              );
            }}
          />
        </View>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: 20,
  },
  textContainer: {
    backgroundColor: "yellow",
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "#fff",
  },
  icon: {
    color: "red",
    right: 5,
    backgroundColor: "red",
  },
});

export default MembersSheetModal;
