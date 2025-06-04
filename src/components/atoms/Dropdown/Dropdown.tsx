import React, { FC } from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useSharedValue } from "react-native-reanimated";
import { ArrowBottomIcon } from "../../../../assets/icons";
import { usePalette } from "../../../hooks/usePalette";
import IconRotated from "../IconRotated";
import { getStyles } from "./styles";
import { IDropdown } from "./types";

const Dropdown: FC<IDropdown> = ({
  data,
  setValue,
  value,
  label,
  isOpen,
  setIsOpen,
  wrapperStyle,
  dropdownStyle,
  selectedTextStyle,
  labelStyle,
  itemContainerStyle,
  borderColor,
  arrowIconComponent,
  maxHeight,
}) => {
  const palette = usePalette();
  const styles = getStyles();
  const rotation = useSharedValue(0);

  const renderIcon = () => (
    <IconRotated
      icon={arrowIconComponent || <ArrowBottomIcon />}
      isActive={isOpen}
      rotation={rotation}
    />
  );

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <DropDownPicker
        items={data}
        open={isOpen}
        setOpen={setIsOpen}
        multiple={false}
        setValue={(callback) => {
          setValue(callback(value));
        }}
        value={value}
        maxHeight={maxHeight}
        style={[
          styles.dropdown,
          dropdownStyle,
          { borderColor: borderColor || palette.bg },
        ]}
        textStyle={[styles.textStyle, selectedTextStyle]}
        dropDownContainerStyle={{ borderColor: borderColor || palette.bg }}
        listItemContainerStyle={[styles.item, itemContainerStyle]}
        selectedItemContainerStyle={styles.selectedItem}
        listMessageTextStyle={{ color: palette.black }}
        showTickIcon={false}
        ArrowDownIconComponent={renderIcon}
        ArrowUpIconComponent={renderIcon}
        closeAfterSelecting
        closeOnBackPressed
        onClose={() => setIsOpen(false)}
        flatListProps={{
          scrollEnabled: false,
        }}
        dropDownDirection="BOTTOM"
      />
    </View>
  );
};

export default Dropdown;
