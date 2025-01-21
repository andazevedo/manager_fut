import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { styles } from "@/components/list-reservations/style";

import { SafeAreaView } from "react-native-safe-area-context";
import { ModalReservation } from "../modal-infos";
import { useLocalSearchParams } from "expo-router";

type ListReservationsProps = {
  data: {
    id: string;
    enabled: number;
    init_hour: string;
    end_hour: string;
    observations?: string | null;
    responsible_id: string;
    responsible_name: string;
    responsible_address: string;
    responsible_phone: string;
    responsible_email: string;
  }[];
  responsibleInfos: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  reservationInfo: {
    districtId: string;
    courtId: string;
    date: string;
    opening: string;
    closest: string;
  };
};

export function ListReservations(props: ListReservationsProps) {
  const [isModalReservationsOpen, setIsModalReservationsOpen] = useState(false);
  const [reservationId, setReservationId] = useState("");

  const { districtId, courtId } = useLocalSearchParams();

  const selectedDistrictId = Array.isArray(districtId)
    ? districtId[0]
    : districtId || "0";
  const selectedCourtId = Array.isArray(courtId) ? courtId[0] : courtId || "0";

  function openModalReservation(reservationId: string) {
    setReservationId(reservationId);

    setIsModalReservationsOpen(true);
  }

  function closeModalReservation() {
    setIsModalReservationsOpen(false);
  }

  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <SafeAreaView>
      <FlatList
        data={props.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => openModalReservation(item.id.toString())}
          >
            <View style={styles.listItemContainer}>
              <Text style={styles.listItemText}>
                {formatTime(item.init_hour)} - {formatTime(item.end_hour)}:{" "}
                {item.responsible_name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
        contentContainerStyle={styles.listContainer}
      />
      {isModalReservationsOpen && (
        <ModalReservation
          visible={isModalReservationsOpen}
          responsibleInfos={props.responsibleInfos}
          reservationInfo={props.reservationInfo}
          onClose={closeModalReservation}
          isInserter={false}
          reservationId={reservationId}
          staticCourtId={selectedCourtId}
          staticDistrictId={selectedDistrictId}
        />
      )}
    </SafeAreaView>
  );
}
