import { useRoute } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { showSuccessToast } from "../../../helpers/toast";
import { useCost } from "../../../helpers/useCost";
import useAuthStore from "../../../hooks/useAuthStore";
import { useMainNavigation } from "../../../hooks/useTypedNavigation";
import Button from "../../atoms/Button";
import PageTemplate from "../../templates/PageTemplate";
import { getStyles } from "./styles";

const PaymentChange = () => {
  const route = useRoute();
  const { t } = useTranslation();
  const { setUserField } = useAuthStore();
  const styles = getStyles();
  const { navigate } = useMainNavigation();
  const { sliderId } = route.params as { sliderId: string };
  const subscriptionCost = useCost(sliderId || "0");

  return (
    <PageTemplate
      headerText={t("subscriptionPayment")}
      onHeaderClick={() =>
        navigate("SubscriptionChange", { direction: "backward" })
      }
      mustScroll={false}
    >
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          {t("subscriptionPaymentIntro")} {subscriptionCost} {t("rubles")}
        </Text>
        {sliderId && (
          <Button
            onPress={() => {
              setUserField("subscription", sliderId);
              navigate("Profile", { direction: "backward" });
              showSuccessToast(t("subscriptionPaid"));
              setTimeout(() => {
                showSuccessToast(t("subscriptionLevelChanged"));
              }, 2000);
            }}
            style={styles.btn}
            color="blue"
          >
            <Text style={styles.btnText}>{t("pay")}</Text>
          </Button>
        )}
      </View>
    </PageTemplate>
  );
};

export default PaymentChange;
