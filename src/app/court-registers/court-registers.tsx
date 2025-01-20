import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "@/app/court-registers/styles";
import { Feather } from "@expo/vector-icons";
import { ptBR } from "../../utils/localeCalendarConfig";
//import { InsertModal } from "../components/insert-modal";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { X } from "react-native-feather";

import {
  Calendar,
  DateData,
  LocaleConfig,
  Timeline,
} from "react-native-calendars";
import { DayState } from "react-native-calendars/src/types";

//Come in English by default, so you have to move to pt br if you want
LocaleConfig.locales["pt-BR"] = ptBR;
LocaleConfig.defaultLocale = "pt-BR";

export default function CourtRegisters() {
  const router = useRouter(); // Hook para navegar entre as telas
  const [day, setDay] = useState<DateData>();

  const { districtId, id, name, opening, closest } = useLocalSearchParams();

  function handleDatePress(date: DateData) {
    setDay(date);
    const formattedDate = `${date.day.toString().padStart(2, "0")}/${date.month
      .toString()
      .padStart(2, "0")}/${date.year.toString()}`;
    router.push({
      pathname: "/handle-details/handle-details",
      params: {
        districtId,
        selectedDate: formattedDate,
        courtId: id,
        name: name,
        opening,
        closest,
      },
    });
  }
  console.log("District:ID: ", districtId);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Escolha uma data: {name}</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Link href={"/"}>
            <X width={30} height={30} color="#A1A1A1" />
          </Link>
        </TouchableOpacity>
      </View>

      <Calendar
        style={styles.calendar}
        renderArrow={(direction: "right" | "left") => (
          <Feather size={24} color={"#e8e8e8"} name={`chevron-${direction}`} />
        )}
        headerStyle={{
          borderBottomWidth: 0.5,
          borderBottomColor: "#e8e8e8",
          PaddingBottom: 10,
          marginBottom: 10,
        }}
        theme={{
          textMonthFontSize: 20,
          monthTextColor: "#e8e8e8",
          todayTextColor: "#f06543",
          selectedDayBackgroundColor: "#f06543",
          selectedDayTextColor: "#e8e8e8",
          arrowColor: "#e8e8e8",
          calendarBackground: "#transparent",
          textDayStyle: {
            color: "#e8e8e8",
          },
          textDisabledColor: "#717171",
          arrowStyle: {
            margin: 0,
            padding: 0,
          },
        }}
        minDate={new Date().toDateString()} // MINIMUM DATE OF THE CALENDAR
        hideExtraDays={true}
        markedDates={
          day && {
            [day.dateString]: { selected: true },
          }
        }
        // //Creation and customization system of 0 on the calendar, overlapping theme in the interface, that is, this customization is being shown
        dayComponent={({
          date,
          state,
        }: {
          date: DateData;
          state: DayState;
        }) => {
          console.log(state === "disabled");
          return (
            <TouchableOpacity
              style={[
                styles.day,
                date.dateString == day?.dateString &&
                  state !== "disabled" &&
                  state !== "inactive" &&
                  styles.selectedDay,
              ]}
              onPress={() => handleDatePress(date)}
            >
              <Text
                style={[
                  styles.dayText,
                  (state === "inactive" || state === "disabled") &&
                    styles.disabled,
                  state === "today" && styles.today,
                  date.dateString == day?.dateString &&
                    state !== "disabled" &&
                    state !== "inactive" &&
                    styles.dayText,
                ]}
              >
                {date.day}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
