import React, { FC } from "react";
import { Text, View } from "react-native";
import { ArrowPaginationIcon } from "../../../../assets/icons";
import { usePalette } from "../../../hooks/usePalette";
import Button from "../../atoms/Button";
import { getStyles } from "./styles";
import { ICameraPagination } from "./types";

const CameraPagination: FC<ICameraPagination> = ({
  total,
  current,
  onPageChange,
}) => {
  const styles = getStyles();
  const palette = usePalette();

  const pages = Math.ceil(total / 5);
  if (pages <= 1) return null;

  const createRange = () => {
    const range: (number | string)[] = [];
    const pagesToShow = 5;

    if (pages <= pagesToShow) {
      return Array.from({ length: pages }, (_, i) => i + 1);
    }

    range.push(1);

    const start = Math.max(2, current - 1);
    const end = Math.min(pages - 1, current + 1);

    if (start > 2) range.push("...");

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    if (end < pages - 1) range.push("...");

    range.push(pages);

    return range;
  };

  return (
    <View style={styles.pagination}>
      <ArrowPaginationIcon
        onClick={() => onPageChange(Math.max(current - 1, 1))}
        color={
          current === 1 ? palette.supportTransparentText : palette.mainText
        }
        disabled={current === 1}
      />
      {createRange().map((item, index) => (
        <Button
          key={index}
          disabled={item === current || typeof item === "string"}
          onPress={() => {
            if (typeof item === "number") {
              onPageChange(item);
            }
          }}
        >
          <Text
            style={[styles.pageText, item === current && styles.pageTextActive]}
          >
            {item}
          </Text>
        </Button>
      ))}
      <ArrowPaginationIcon
        onClick={() => onPageChange(Math.min(current + 1, pages))}
        color={
          current === pages ? palette.supportTransparentText : palette.mainText
        }
        style={{ transform: [{ scaleX: -1 }] }}
        disabled={current === pages}
      />
    </View>
  );
};

export default CameraPagination;
