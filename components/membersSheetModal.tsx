import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { forwardRef, useMemo, useCallback, useState, SetStateAction, Dispatch } from "react";
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
interface MembersSheetModalProps {
  members: Array<String>;
  setMembers: Dispatch<SetStateAction<any[]>>
  setMembersLenght: Dispatch<SetStateAction<number>>
}

const MembersSheetModal = forwardRef<Ref, Navigator & MembersSheetModalProps>(
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
    const { members, setMembers, setMembersLenght } = props;
    const [membersState, setMemberState] = useState(members)

    function handleRemoveMember(item: String) {

      let filteredMembers = membersState.filter(member => member != item)
      setMemberState(filteredMembers)
      setMembers(filteredMembers)
      setMembersLenght(filteredMembers.length)
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
        <FlatList
          data={membersState}
          numColumns={1}
          style={{
            flex: 1,
            backgroundColor: colors.backgroundColor
          }}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
          renderItem={(item) => {
            return (
              <View key={item.index} style={styles.textContainer}>
                <View>
                  <Text style={{ color: colors.primaryColor }} >{item.index + 1}.</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 15, fontWeight: "400", color: "#fff" }}>{item.item}</Text>
                </View>
                <TouchableOpacity onPress={() => handleRemoveMember(item.item)}>
                  <Ionicons
                    name="person-remove-outline"
                    size={18}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  textContainer: {
    width: 350,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    marginVertical: 13,
    backgroundColor: colors.secondaryBackgroundColor,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10

  },
  text: {
    color: "#fff",
  },
  icon: {
    color: "red",
  },
});

export default MembersSheetModal;
