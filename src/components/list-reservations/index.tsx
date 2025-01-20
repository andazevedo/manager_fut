import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from "react-native";
import { X } from "react-native-feather";
import { styles } from "@/components/list-reservations/style";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ModalReservation } from "../modal-infos";
import { ResponsibleStore } from "@/storage/responsible-store";

type ListReservationsProps = {
  data: {
    id: string;
    enabled: number;
    init_hour: string;
    end_hour: string;
    observations?: string | null;
    responsible_id: string;
    sports_cout_id: string;
    responsible: ResponsibleStore[];
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

  function openModalReservation(content: string) {
    setReservationId(content);
    setIsModalReservationsOpen(true);
  }

  function closeModalReservation() {
    setIsModalReservationsOpen(false);
  }

  console.log(props.data[0].id);

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
                {item.init_hour} - {item.end_hour}: {item.responsible_id}
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
        />
      )}
    </SafeAreaView>
  );
}
