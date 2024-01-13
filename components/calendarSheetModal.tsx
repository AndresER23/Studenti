import { View, Text } from "react-native";
import React, { forwardRef, useMemo, useCallback, useState } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheet,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Calendar, DateData } from "react-native-calendars";
import colors from "../commons/colors";

export type Ref = BottomSheetModal;
interface Navigator {
  navigator: any;
}
interface CalendarSheetModalProps {
  setDate: React.Dispatch<React.SetStateAction<string | DateData>>;
}
const CalendarSheetModal = forwardRef<Ref, Navigator & CalendarSheetModalProps>(
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
    const [selected, setSelected] = useState("");

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
        <Calendar
          onDayPress={(day) => {
            setSelected(day.dateString);
            props.setDate(day);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: colors.primaryColor,
            },
          }}
          style={{ backgroundColor: colors.secondaryBackgroundColor }}
          theme={{
            calendarBackground: colors.backgroundColor,
          }}
        ></Calendar>
      </BottomSheetModal>
    );
  }
);

export default CalendarSheetModal;
