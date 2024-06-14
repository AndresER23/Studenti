import {
    BottomSheetBackdrop,
    BottomSheetModal,
    useBottomSheet,
    useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo, useCallback, useState, SetStateAction, Dispatch } from "react";
import { View } from 'react-native';
export type Ref = BottomSheetModal;

interface Navigator {
    navigator: any;
}

interface SubjectSheetModalProps {
    children: any,
    backgroundStyle: {},
    style: {}
}
const SheetModal = forwardRef<Ref, Navigator & SubjectSheetModalProps>(
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

        return (
            <BottomSheetModal
                snapPoints={snapPoints}
                backdropComponent={renderBackDrop}
                ref={reference}
                enableOverDrag={false}
                backgroundStyle={props.backgroundStyle}
                style={props.style}
            >
                {props.children}
            </BottomSheetModal>
        )
    })


export default SheetModal;
