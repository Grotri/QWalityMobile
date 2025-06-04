import useAuthStore from "@/src/hooks/useAuthStore";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { FC, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { formatDate } from "../../../helpers/formatDate";
import { getStyles } from "./styles";
import { IDatePicker } from "./types";

const DatePicker: FC<IDatePicker> = ({ date, setDate, datePickerStyle }) => {
  const styles = getStyles();
  const { language } = useAuthStore();
  const [show, setShow] = useState<boolean>(false);
  const defaultDate = new Date();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (event: any, selectedDate: any) => {
    setShow(false);
    if (event.type === "set") {
      setDate(selectedDate);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onIOSChange = (event: any, selectedDate: any) => {
    if (event.type === "set") {
      setDate(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const closeDatepicker = () => {
    setShow(false);
  };

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={showDatepicker}>
        <View style={[styles.datePicker, datePickerStyle]}>
          <Text style={styles.date}>
            {date ? formatDate(date) : "DD.MM.YYYY"}
          </Text>
        </View>
      </Pressable>
      {show &&
        (Platform.OS === "android" ? (
          <DateTimePicker
            value={date || defaultDate}
            mode="date"
            display="default"
            is24Hour={true}
            onChange={onChange}
            locale={language}
          />
        ) : (
          <Modal transparent visible={show} animationType="slide">
            <TouchableWithoutFeedback onPress={closeDatepicker}>
              <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={date || defaultDate}
                mode="date"
                display="spinner"
                onChange={onIOSChange}
                locale={language}
              />
            </View>
          </Modal>
        ))}
    </View>
  );
};

export default DatePicker;
