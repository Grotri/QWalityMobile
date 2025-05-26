import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import {
  ArrowAccordionIcon,
  PlusIcon,
  SearchIcon,
} from "../../../../assets/icons";
import { showErrorToast } from "../../../helpers/toast";
import { useCameraLimits } from "../../../helpers/useCameraLimits";
import useAuthStore from "../../../hooks/useAuthStore";
import useCamerasStore from "../../../hooks/useCamerasStore";
import { usePalette } from "../../../hooks/usePalette";
import IconRotated from "../../atoms/IconRotated";
import Input from "../../atoms/Input";
import Loader from "../../atoms/Loader/Loader";
import BottomFixIcon from "../../molecules/BottomFixIcon";
import AddCameraModal from "../../organisms/AddCameraModal";
import CameraAccordion from "../../organisms/CameraAccordion";
import PageTemplate from "../../templates/PageTemplate";
import { getStyles } from "./styles";
import { ICamera, IDefect } from "./types";

const Main = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const styles = getStyles();
  const palette = usePalette();
  const { cameras: camerasInfo, loading, error } = useCamerasStore();
  const cameraLimits = useCameraLimits();
  const [cameras, setCameras] = useState<ICamera[]>([]);
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [isAddCameraModalOpen, setIsAddCameraModalOpen] =
    useState<boolean>(false);
  const [selectedCamera, setSelectedCamera] = useState<ICamera | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean | null>(
    null
  );
  const [isSortCameraModalOpen, setIsSortCameraModalOpen] =
    useState<boolean>(false);
  const [isSortOflCameraModalOpen, setIsSortOflCameraModalOpen] =
    useState<boolean>(false);
  const [isFilterCameraModalOpen, setIsFilterCameraModalOpen] =
    useState<boolean>(false);
  const [isFilterCameraOflModalOpen, setIsFilterCameraOflModalOpen] =
    useState<boolean>(false);
  const [selectedDefect, setSelectedDefect] = useState<IDefect | null>(null);
  const [onlineSearch, setOnlineSearch] = useState<string>("");
  const [offlineSearch, setOfflineSearch] = useState<string>("");

  const onlineCameras = cameras.filter((camera) => camera.online);
  const offlineCameras = cameras.filter((camera) => !camera.online);

  const sections = [
    {
      title: `${t("online")} (${onlineCameras.length})`,
      cameras: onlineCameras,
    },
    {
      title: `${t("offline")} (${offlineCameras.length})`,
      cameras: offlineCameras,
    },
  ];

  const handleSectionChange = (sections: number[]) => {
    setActiveSections(sections);
  };

  useEffect(() => {
    setCameras([...camerasInfo.filter((c) => !c.deletedAt)]);
  }, [camerasInfo]);

  useEffect(() => {
    setIsAddCameraModalOpen(false);
  }, [camerasInfo.length]);

  const renderHeader = (section: (typeof sections)[number], index: number) => (
    <View style={styles.header}>
      <View style={styles.headerSearch}>
        <Text style={styles.title}>{section.title}</Text>
        {section.cameras.length > 0 && (
          <Input
            placeholder={t("searchPlaceholder")}
            placeholderTextColor={palette.mainText}
            value={index === 0 ? onlineSearch : offlineSearch}
            onChangeText={(text) =>
              index === 0 ? setOnlineSearch(text) : setOfflineSearch(text)
            }
            customStyles={styles.input}
            customInputStyles={styles.customInputStyles}
            rightIcon={<SearchIcon />}
            cursorColor={palette.subTextMainScreenPopup}
            onPress={() => setActiveSections([index === 0 ? 0 : 1])}
          />
        )}
      </View>
      <IconRotated
        icon={<ArrowAccordionIcon />}
        isActive={activeSections.includes(index)}
      />
    </View>
  );

  const renderContent = (section: (typeof sections)[number], index: number) => {
    const searchText = index === 0 ? onlineSearch : offlineSearch;
    const filteredCameras = section.cameras.filter((camera) =>
      camera.title.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filteredCameras.length === 0) {
      return (
        <View style={styles.emptyList}>
          <Text style={styles.emptyText}>
            {!section.cameras.length
              ? t("noCamerasInCategory")
              : t("noCamerasFound")}
          </Text>
        </View>
      );
    }

    return (
      <CameraAccordion
        sections={filteredCameras}
        selectedCamera={selectedCamera}
        setSelectedCamera={setSelectedCamera}
        isHistoryModalOpen={isHistoryModalOpen}
        setIsHistoryModalOpen={setIsHistoryModalOpen}
        isSortCameraModalOpen={
          index === 0 ? isSortCameraModalOpen : isSortOflCameraModalOpen
        }
        setIsSortCameraModalOpen={
          index === 0 ? setIsSortCameraModalOpen : setIsSortOflCameraModalOpen
        }
        isFilterCameraModalOpen={
          index === 0 ? isFilterCameraModalOpen : isFilterCameraOflModalOpen
        }
        setIsFilterCameraModalOpen={
          index === 0
            ? setIsFilterCameraModalOpen
            : setIsFilterCameraOflModalOpen
        }
        selectedDefect={selectedDefect}
        setSelectedDefect={setSelectedDefect}
      />
    );
  };

  return (
    <PageTemplate
      hasMenu
      bottomIcon={
        user.role !== "user" ? (
          <BottomFixIcon
            icon={<PlusIcon />}
            text={t("addCamera")}
            onPress={() => {
              if (cameras.length < cameraLimits) {
                setIsAddCameraModalOpen(true);
              } else {
                showErrorToast(t("camerasLimitReached"));
              }
            }}
            marginRight={20}
          />
        ) : null
      }
      isBlurOn={
        isAddCameraModalOpen ||
        !!selectedCamera ||
        isSortCameraModalOpen ||
        isSortOflCameraModalOpen ||
        isFilterCameraModalOpen ||
        isFilterCameraOflModalOpen ||
        !!selectedDefect
      }
    >
      {loading && <Loader />}
      {!loading && error && <Text style={styles.errorText}>{error}</Text>}
      {!loading && !error && (
        <>
          <View style={styles.wrapper}>
            <Accordion
              sections={sections}
              activeSections={activeSections}
              renderHeader={renderHeader}
              renderContent={renderContent}
              onChange={handleSectionChange}
              touchableComponent={Pressable}
            />
          </View>
          <AddCameraModal
            isOpen={isAddCameraModalOpen}
            setIsOpen={setIsAddCameraModalOpen}
          />
        </>
      )}
    </PageTemplate>
  );
};

export default Main;
