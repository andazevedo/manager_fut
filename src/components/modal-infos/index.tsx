import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ModalProps,
  Alert,
} from "react-native";

import {
  X,
  Clock,
  Calendar,
  User,
  Mail,
  MapPin,
  PhoneCall,
} from "react-native-feather";
import axios from "axios";

import { styles } from "@/components/modal-infos/style";
import { DeleteModal } from "../modal-delete-reservation";
import { api } from "@/server/api";
import { Loading } from "../loading/loading";
import { ResponsibleStore } from "@/storage/responsible-store";
import { useRouter } from "expo-router";
type Props = ModalProps & {
  visible: boolean;
  onClose: () => void;
  isInserter: boolean;
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

export function ModalReservation({
  visible = false,
  onClose,
  isInserter,
  responsibleInfos,
  reservationInfo,
  children,
  ...rest
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const DISTRICT_ID = reservationInfo.districtId;
  const COURT_ID = reservationInfo.courtId;

  const router = useRouter();

  function openModal() {
    setIsModalOpen(true);
  }
  function handlePush() {
    onClose();

    router.push({
      pathname: "/",
    });
  }

  function formatDateTime(date: string, time: string): string {
    const [day, month, year] = date.split("/");
    const [hour, minute] = time.split(":");
    const formattedDate = `${year}-${month}-${day}T${hour}:${minute}:00.000-03:00`;
    return formattedDate;
  }

  const formattedOpening = formatDateTime(
    reservationInfo.date,
    reservationInfo.opening
  );
  const formattedClosest = formatDateTime(
    reservationInfo.date,
    reservationInfo.closest
  );

  async function handleRegister() {
    try {
      setIsLoading(true);

      console.log(
        "url: ",
        `/districts/${DISTRICT_ID}/sports_couts/${COURT_ID}/sports_cout_has_responsibles/`
      );
      console.log("Data: ", {
        init_hour: formattedOpening,
        end_hour: formattedClosest,
        enabled: 1,
        sports_cout_id: reservationInfo.courtId,
        responsible_id: responsibleInfos.id,
      });
      const registerResponse = await api.post(
        `/districts/${DISTRICT_ID}/sports_couts/${COURT_ID}/sports_cout_has_responsibles/`,
        {
          init_hour: formattedOpening,
          end_hour: formattedClosest,
          enabled: 1,
          sports_cout_id: reservationInfo.courtId,
          responsible_id: responsibleInfos.id,
        }
      );
      console.log("Response: ", registerResponse.status);
      if (registerResponse.status === 201) {
        Alert.alert("Sucesso", "Reserva realizada com sucesso.", [
          { text: "OK", onPress: () => handlePush() },
        ]);
      }
    } catch (e) {
      console.log(e);

      if (axios.isAxiosError(e)) {
        console.log("Error", e.response?.data[0]);
      }

      Alert.alert("Erro", "Erro ao realizar reserva.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              {isInserter
                ? "Confirmar Detalhes e Reservar"
                : "Detalhes da Reserva"}
            </Text>

            <TouchableOpacity onPress={onClose}>
              <X width={30} height={30} color="#A1A1A1" />
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          <View style={styles.formContainer}>
            <View style={styles.detailsContainer}>
              <View style={styles.detailsElements}>
                <User width={13} height={13} color="#A1A1A1" />
                <Text style={styles.subHeaderText}>
                  {responsibleInfos.name}
                </Text>
              </View>
              <View style={styles.detailsElements}>
                <Mail width={13} height={13} color="#A1A1A1" />
                <Text style={styles.subHeaderText}>
                  {responsibleInfos.email}
                </Text>
              </View>

              <View style={styles.detailsElements}>
                <PhoneCall width={13} height={13} color="#A1A1A1" />
                <Text style={styles.subHeaderText}>
                  {responsibleInfos.phone}
                </Text>
              </View>
              <View style={styles.detailsElements}>
                <MapPin width={13} height={13} color="#A1A1A1" />
                <Text style={styles.subHeaderText}>
                  {responsibleInfos.address}
                </Text>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.detailsElements}>
                <Calendar width={13} height={13} color="#A1A1A1" />
                <Text style={styles.subHeaderText}>{reservationInfo.date}</Text>
              </View>
              <View style={styles.detailsElements}>
                <Clock width={13} height={13} color="#A1A1A1" />
                <Text
                  style={styles.subHeaderText}
                >{`${reservationInfo.opening} - ${reservationInfo.closest}`}</Text>
              </View>
            </View>
            {isInserter ? (
              <TouchableOpacity
                style={styles.insertButton}
                activeOpacity={0.7}
                onPress={handleRegister}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <Text style={styles.insertButtonText}>Confirmar Reserva</Text>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.deleteButton}
                activeOpacity={0.7}
                onPress={openModal}
              >
                <Text style={styles.deleteButtonText}>Excluir Reserva</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
