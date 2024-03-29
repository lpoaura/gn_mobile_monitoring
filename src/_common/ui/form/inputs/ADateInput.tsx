import React from "react";
import DateTimePicker, { AndroidNativeProps, IOSNativeProps } from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { ATextInput } from "./ATextInput";
import { TouchableOpacity } from "react-native";

type Props = IOSNativeProps | AndroidNativeProps;

export function ADateInput(props: Props) {
  const [showPicker, setShowPicker] = React.useState(false);
  const displayValue = dayjs(props.value).format(props.mode === "time" ? "HH:mm" : "DD/MM/YYYY");
  return (
    <>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <ATextInput value={displayValue} editable={false} />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          {...props}
          onChange={(event: any, date) => {
            setShowPicker(false);
            if (date) {
              props.onChange?.(event, date);
            }
          }}
        />
      )}
    </>
  );
}
