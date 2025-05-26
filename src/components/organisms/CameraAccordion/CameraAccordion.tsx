import { formatUptime } from "@/src/helpers/formatUptime";
import React, { FC, Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import {
  ArrowAccordionIcon,
  CameraIcon,
  FilterIcon,
  SettingsIcon,
  SortIcon,
} from "../../../../assets/icons";
import useAuthStore from "../../../hooks/useAuthStore";
import useCamerasStore from "../../../hooks/useCamerasStore";
import { usePalette } from "../../../hooks/usePalette";
import Button from "../../atoms/Button";
import IconRotated from "../../atoms/IconRotated";
import CameraPagination from "../../molecules/CameraPagination";
import Defect from "../../molecules/Defect";
import { ICamera, IDefect } from "../../pages/Main/types";
import CameraFilterModal from "../CameraFilterModal";
import { ICameraFilter, initialCameraFilter } from "../CameraFilterModal/types";
import CameraSettingsModal from "../CameraSettingsModal";
import CameraSortModal from "../CameraSortModal";
import { ESortOptions } from "../CameraSortModal/enums";
import DefectSaveModal from "../DefectSaveModal";
import { getStyles } from "./styles";
import { ICameraAccordion } from "./types";
import { filterDefects, sortDefects } from "./utils";

const CameraAccordion: FC<ICameraAccordion> = ({
  sections,
  selectedCamera,
  setSelectedCamera,
  isHistoryModalOpen,
  setIsHistoryModalOpen,
  isSortCameraModalOpen,
  setIsSortCameraModalOpen,
  isFilterCameraModalOpen,
  setIsFilterCameraModalOpen,
  selectedDefect,
  setSelectedDefect,
}) => {
  const DEFAULT_PAGE_CAPACITY = 5;
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const styles = getStyles();
  const palette = usePalette();
  const { activeSections, setActiveSections, deleteDefect } = useCamerasStore();
  const [cameraPages, setCameraPages] = useState<Record<string, number>>({});
  const [sortModalCameraId, setSortModalCameraId] = useState<string | null>(
    null
  );
  const [cameraSortOptions, setCameraSortOptions] = useState<
    Record<string, keyof typeof ESortOptions>
  >({});
  const [filterModalCameraId, setFilterModalCameraId] = useState<string | null>(
    null
  );
  const [cameraFilterOptions, setCameraFilterOptions] = useState<
    Record<string, ICameraFilter>
  >({});

  const handleSectionChange = (sections: number[]) => {
    setActiveSections(sections);
  };

  const handlePageChange = (cameraId: string, newPage: number) => {
    setCameraPages({ ...cameraPages, [cameraId]: newPage });
  };

  const getPagedDefects = (
    defects: IDefect[],
    page: number,
    pageSize = DEFAULT_PAGE_CAPACITY
  ) => {
    const start = (page - 1) * pageSize;
    return defects.slice(start, start + pageSize);
  };

  const handleSortApply = (
    cameraId: string,
    selectedOption?: keyof typeof ESortOptions
  ) => {
    if (selectedOption) {
      setCameraSortOptions({
        ...cameraSortOptions,
        [cameraId]: selectedOption,
      });
    } else {
      const updatedSorts = Object.fromEntries(
        Object.entries(cameraSortOptions).filter(([key]) => key !== cameraId)
      );
      setCameraSortOptions(updatedSorts);
    }
  };

  const handleFilterApply = (cameraId: string, filter: ICameraFilter) => {
    if (JSON.stringify(filter) === JSON.stringify(initialCameraFilter)) {
      const updatedFilters = Object.fromEntries(
        Object.entries(cameraFilterOptions).filter(([key]) => key !== cameraId)
      );
      setCameraFilterOptions(updatedFilters);
    } else {
      setCameraFilterOptions({
        ...cameraFilterOptions,
        [cameraId]: filter,
      });
    }
    if (cameraPages[cameraId]) {
      handlePageChange(cameraId, 1);
    }
  };

  const renderHeader = (camera: ICamera, index: number) => {
    const defects = camera.defects.filter((defect) => !defect.deletedAt);
    const uptime = formatUptime(camera.uptime);

    return (
      <View style={styles.header} key={camera.id}>
        <View style={styles.headerMain}>
          <View style={styles.cameraNameWrapper}>
            <View style={styles.cameraName}>
              <CameraIcon />
              <Text style={styles.cameraTitle}>{camera.title}</Text>
            </View>
            <Text style={styles.defectText}>
              {defects.length}/100 {t("defects")}
            </Text>
            <Text style={styles.defectText}>{defects.length}%</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.stateWrapper}>
            <View style={styles.state}>
              <View
                style={[
                  styles.circle,
                  {
                    backgroundColor: camera.online
                      ? palette.greenOnline
                      : palette.red,
                  },
                ]}
              />
              <Text style={styles.stateName}>
                {camera.online ? t("online") : t("offline")}
              </Text>
            </View>
            <Text style={styles.uptime}>
              {t("uptime")} {uptime[0]}
              {t("day")} {uptime[1]}
              {t("hour")} {uptime[2]}
              {t("minute")}
            </Text>
          </View>
        </View>
        <IconRotated
          icon={<ArrowAccordionIcon />}
          isActive={activeSections.includes(index)}
        />
      </View>
    );
  };

  const renderContent = (camera: ICamera) => {
    const defects = camera.defects.filter((defect) => !defect.deletedAt);
    const page = cameraPages[camera.id] || 1;
    const sortOption = cameraSortOptions[camera.id];
    const filterOption = cameraFilterOptions[camera.id];
    const sortedDefects = sortOption
      ? sortDefects(defects, sortOption)
      : defects;
    const filteredDefects = filterOption
      ? filterDefects(sortedDefects, filterOption)
      : sortedDefects;
    const pagedDefects = getPagedDefects(filteredDefects, page);

    return (
      <Fragment>
        <View style={styles.contentWrapper}>
          {(user.role !== "user" || defects.length > 0) && (
            <View style={styles.settingsWrapper}>
              <View style={styles.settingsIcons}>
                {user.role !== "user" && (
                  <Button
                    style={styles.icon}
                    onPress={() => {
                      setSelectedCamera(camera);
                    }}
                  >
                    <SettingsIcon width={19} height={19} stroke={2} />
                    <Text style={styles.iconTitle}>{t("settings")}</Text>
                  </Button>
                )}
                {defects.length > 0 && (
                  <>
                    <Button
                      style={styles.icon}
                      onPress={() => {
                        setSortModalCameraId(camera.id);
                        setIsSortCameraModalOpen(true);
                      }}
                    >
                      <SortIcon
                        color={sortOption ? palette.brightBlue : palette.white}
                      />
                      <Text
                        style={[
                          styles.iconTitle,
                          sortOption && styles.activeOption,
                        ]}
                      >
                        {t("sort")}
                      </Text>
                    </Button>
                    <Button
                      style={styles.icon}
                      onPress={() => {
                        setFilterModalCameraId(camera.id);
                        setIsFilterCameraModalOpen(true);
                      }}
                    >
                      <FilterIcon
                        color={
                          filterOption ? palette.brightBlue : palette.white
                        }
                      />
                      <Text
                        style={[
                          styles.iconTitle,
                          filterOption && styles.activeOption,
                        ]}
                      >
                        {t("filter")}
                      </Text>
                    </Button>
                  </>
                )}
              </View>
              <View style={styles.horizontalLine} />
            </View>
          )}
          <View
            style={[
              styles.defects,
              filteredDefects.length <= DEFAULT_PAGE_CAPACITY && {
                marginBottom: 4,
              },
            ]}
          >
            {filteredDefects.length > 0 ? (
              pagedDefects.map((defect: IDefect) => (
                <Defect
                  key={defect.id}
                  defect={defect}
                  textBtn={user.role !== "user" ? t("hide") : undefined}
                  setSelectedDefect={setSelectedDefect}
                  onPress={() => deleteDefect(camera.id, defect.id)}
                  pressableIcon
                />
              ))
            ) : (
              <Text style={styles.noDefects}>{t("noDefectsFound")}</Text>
            )}
          </View>
          <CameraPagination
            total={filteredDefects.length}
            current={page}
            onPageChange={(newPage) => handlePageChange(camera.id, newPage)}
          />
        </View>
        <CameraSettingsModal
          camera={selectedCamera}
          setCamera={setSelectedCamera}
          isHistoryModalOpen={isHistoryModalOpen}
          setIsHistoryModalOpen={setIsHistoryModalOpen}
        />
        <CameraSortModal
          initialOption={
            sortModalCameraId && cameraSortOptions[sortModalCameraId]
              ? cameraSortOptions[sortModalCameraId]
              : undefined
          }
          isOpen={isSortCameraModalOpen}
          setIsOpen={(isOpen) => {
            setIsSortCameraModalOpen(isOpen);
            if (!isOpen) {
              setSortModalCameraId(null);
            }
          }}
          onApply={(option) => {
            if (sortModalCameraId) {
              handleSortApply(sortModalCameraId, option);
            }
          }}
        />
        <CameraFilterModal
          isOpen={isFilterCameraModalOpen}
          setIsOpen={(isOpen) => {
            setIsFilterCameraModalOpen(isOpen);
            if (!isOpen) setFilterModalCameraId(null);
          }}
          initialFilter={
            filterModalCameraId && cameraFilterOptions[filterModalCameraId]
              ? cameraFilterOptions[filterModalCameraId]
              : { ...initialCameraFilter }
          }
          onApply={(filter) => {
            if (filterModalCameraId) {
              handleFilterApply(filterModalCameraId, filter);
            }
          }}
        />
        <DefectSaveModal
          defect={selectedDefect}
          onClose={() => setSelectedDefect(null)}
        />
      </Fragment>
    );
  };

  return (
    <Accordion
      sections={sections}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={handleSectionChange}
      touchableComponent={Pressable}
    />
  );
};

export default CameraAccordion;
