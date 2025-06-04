import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, View } from "react-native";
import { ArrowLeftIcon, ArrowRightIcon } from "../../../../assets/icons";
import { screenWidth } from "../../../constants/screenSize";
import { subscriptions } from "../../../constants/subscriptions";
import useAuthStore from "../../../hooks/useAuthStore";
import { useSubscriptionNavigation } from "../../../hooks/useTypedNavigation";
import SliderCard from "../../organisms/SliderCard";
import GradientPageTemplate from "../../templates/GradientPageTemplate";
import { styles } from "./styles";

const Subscription = () => {
  const { navigate } = useSubscriptionNavigation();
  const { t } = useTranslation();
  const { handleDemoLicense } = useAuthStore();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

  const scrollToIndex = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      setCurrentSlide(index);
    }
  };

  return (
    <GradientPageTemplate
      headerText={t("selectSubscriptionLevel")}
      mustScroll={false}
    >
      <View style={styles.wrapper}>
        <View style={styles.flatWrapper}>
          {currentSlide > 0 && (
            <ArrowLeftIcon
              style={styles.leftIcon}
              onClick={() => scrollToIndex(currentSlide - 1)}
            />
          )}
          <FlatList
            ref={flatListRef}
            data={subscriptions}
            renderItem={({ item }) => (
              <SliderCard
                id={item.id}
                title={item.title}
                description={item.description}
                radioLabels={item.radioLabels}
                price={item.price}
                onPress={() => {
                  if (item.id !== 0) {
                    navigate("Payment", { sliderId: item.id.toString() });
                  } else {
                    handleDemoLicense();
                  }
                }}
              />
            )}
            keyExtractor={({ id }) => id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEnabled={false}
            initialScrollIndex={currentSlide}
            getItemLayout={(_, index) => ({
              length: screenWidth,
              offset: screenWidth * index,
              index,
            })}
          />
          {currentSlide < subscriptions.length - 1 && (
            <ArrowRightIcon
              style={styles.rightIcon}
              onClick={() => scrollToIndex(currentSlide + 1)}
            />
          )}
        </View>
        <View style={styles.dots}>
          {subscriptions.map(({ id }) => (
            <View
              key={id}
              style={id === currentSlide ? styles.activeDot : styles.dot}
            />
          ))}
        </View>
      </View>
    </GradientPageTemplate>
  );
};

export default Subscription;
