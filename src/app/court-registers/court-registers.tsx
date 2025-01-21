import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, SectionList } from "react-native";
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
import { api } from "@/server/api";
import { SafeAreaProvider } from "react-native-safe-area-context";

//Come in English by default, so you have to move to pt br if you want
LocaleConfig.locales["pt-BR"] = ptBR;
LocaleConfig.defaultLocale = "pt-BR";

export default function CourtRegisters() {
  const router = useRouter(); // Hook para navegar entre as telas
  const [day, setDay] = useState<DateData>();
  const [isLoading, setIsLoading] = useState(false);
  const [weekList, setWeekList] = useState<
    {
      id: string;
      enabled: number;
      init_hour: string;
      end_hour: string;
      observations?: string | null;
      sports_cout_id: string;
      responsible_id: string;
      responsible: {
        id: string;
        name: string;
        address: string;
        phone: string;
        email: string;
        created_at: string;
        updated_at: string;
      };
    }[]
  >([]);

  const { districtId, id, name, opening, closest } = useLocalSearchParams();

  const isResponsibleFetched = useRef(false);

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

  useEffect(() => {
    if (!isResponsibleFetched.current) {
      handleWeeklyReservationSchedules();
      isResponsibleFetched.current = true;
    }
  }, []);

  async function handleWeeklyReservationSchedules() {
    try {
      setIsLoading(true);
      const { data } = await api.get(
        `districts/${districtId}/sports_couts/${id}/sports_cout_has_responsibles/weekly_schedules`
      );

      setWeekList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  const groupByDateForSectionList = (
    weekList: {
      id: string;
      enabled: number;
      init_hour: string;
      end_hour: string;
      observations?: string | null;
      sports_cout_id: string;
      responsible_id: string;
      responsible: {
        id: string;
        name: string;
        address: string;
        phone: string;
        email: string;
        created_at: string;
        updated_at: string;
      };
    }[]
  ) => {
    const groupedData = weekList.reduce(
      (acc: { [date: string]: any[] }, item) => {
        const date = item.init_hour.split("T")[0]; // Pega apenas a data sem a hora
        if (!acc[date]) {
          acc[date] = []; // Cria um array para cada data
        }
        acc[date].push({
          id: item.id,
          init_hour: item.init_hour,
          end_hour: item.end_hour,
          observations: item.observations,
          responsible: item.responsible,
        }); // Adiciona as propriedades relevantes ao item
        return acc;
      },
      {}
    );

    // Transformando o objeto em um array de seções conforme SectionList espera
    return Object.entries(groupedData).map(([date, items]) => ({
      title: date,
      data: items,
    }));
  };

  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  function getDayOfWeek(dateString: string) {
    // Cria um objeto Date a partir da string da data
    const dateParts = dateString.split("-");
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Mês é 0-indexado no objeto Date
    const day = parseInt(dateParts[2], 10);

    const date = new Date(year, month, day);

    // Array com os dias da semana
    const daysOfWeek = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];

    // Obtém o índice do dia da semana (0 é Domingo, 1 é Segunda-feira, etc.)
    const dayIndex = date.getDay();

    // Retorna o nome do dia da semana correspondente
    return daysOfWeek[dayIndex];
  }

  //console.log(groupByDateForSectionList(weekList));

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{name}</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Link href={"/"}>
            <X width={30} height={30} color="#A1A1A1" />
          </Link>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

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
      <View style={styles.separator} />

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Lista Semanal</Text>
      </View>
      <SectionList
        sections={groupByDateForSectionList(weekList)}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItemContainer}>
            <Text style={styles.listItemText}>
              {formatTime(item.init_hour)} - {formatTime(item.end_hour)}:{" "}
              {item.responsible.name}
            </Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>
            {getDayOfWeek(section.title)}
          </Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
      />
    </View>
  );
}
