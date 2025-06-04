import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, View } from "react-native";
import { ArrowLeftIcon, ArrowRightIcon } from "../../../../assets/icons";
import { screenWidth } from "../../../constants/screenSize";
import {
  accountLimits,
  cameraLimits,
  subscriptions,
} from "../../../constants/subscriptions";
import { getAllowedRolesBySubscription } from "../../../helpers/getAllowedRolesBySubscription";
import { showErrorToast, showSuccessToast } from "../../../helpers/toast";
import useAccountStore from "../../../hooks/useAccountStore";
import useAuthStore from "../../../hooks/useAuthStore";
import useCamerasStore from "../../../hooks/useCamerasStore";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import Button from "../../atoms/Button";
import SliderCard from "../../organisms/SliderCard";
import GradientPageTemplate from "../../templates/GradientPageTemplate";
import { getStyles } from "./styles";

const SubscriptionChange = () => {
  const { navigate } = useMainNavigation();
  const { t } = useTranslation();
  const { user, handleDemoLicense, logout } = useAuthStore();
  const styles = getStyles();
  const { cameras } = useCamerasStore();
  const { accounts, clearAccounts } = useAccountStore();
  const [currentSlide, setCurrentSlide] = useState<number>(
    user.subscription ? +user.subscription : 0
  );
  const flatListRef = useRef<FlatList>(null);

  const scrollToIndex = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      setCurrentSlide(index);
    }
  };

  const handleChangeSubscription = (sliderId: string) => {
    const camerasLimit = cameraLimits[sliderId];
    const accountLimit = accountLimits[sliderId];
    const allowedRoles = getAllowedRolesBySubscription(sliderId);

    const hasTooManyAccounts = accountLimit < accounts.length;
    const hasTooManyCameras =
      camerasLimit < cameras.filter((c) => !c.deletedAt).length;
    const invalidAccounts = accounts.filter(
      (account) => !allowedRoles.includes(account.role)
    );

    if (hasTooManyAccounts) {
      showErrorToast(t("cannotSwitchPlanDueToSubAccounts"));
    } else if (hasTooManyCameras) {
      showErrorToast(t("cannotSwitchPlanDueToCameras"));
    } else if (invalidAccounts.length > 0) {
      const rolesList = [...new Set(invalidAccounts.map((a) => a.role))].join(
        ", "
      );
      showErrorToast(
        `${t("cannotSwitchPlanDueToRoles")}: ${rolesList}, ${t(
          "rolesNotAllowedInPlan"
        )}`,
        3000
      );
    } else {
      if (sliderId === "0") {
        handleDemoLicense(() => {
          navigate("Profile", { direction: "backward" });
          showSuccessToast(t("subscriptionLevelChanged"));
        });
      } else {
        navigate("PaymentChange", { sliderId });
      }
    }
  };

  return (
    <GradientPageTemplate
      headerText={t("selectSubscriptionLevel")}
      onHeaderClick={() => navigate("Profile", { direction: "backward" })}
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
                currentId={user.subscription ? +user.subscription : undefined}
                title={item.title}
                description={item.description}
                radioLabels={item.radioLabels}
                price={item.price}
                onPress={() => handleChangeSubscription(item.id.toString())}
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
        <Button
          color="welcomeBlue"
          style={styles.cancelBtn}
          onPress={() => logout(clearAccounts)}
        >
          <Text style={styles.cancelBtnText}>{t("cancelSubscription")}</Text>
        </Button>
      </View>
    </GradientPageTemplate>
  );
};

export default SubscriptionChange;
