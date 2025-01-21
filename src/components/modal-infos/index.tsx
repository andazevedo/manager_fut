import React, { useEffect, useState } from "react";
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
import { useLocalSearchParams, useRouter } from "expo-router";
type Props = ModalProps & {
  visible: boolean;
  onClose: () => void;
  isInserter: boolean;
  responsibleInfos?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  reservationInfo?: {
    districtId: string;
    courtId: string;
    date: string | undefined;
    opening: string;
    closest: string;
  };
  reservationId?: string;
  staticDistrictId?: string;
  staticCourtId?: string;
};

export function ModalReservation({
  visible = false,
  onClose,
  isInserter,
  responsibleInfos,
  reservationInfo,
  reservationId,
  staticDistrictId,
  staticCourtId,
  children,
  ...rest
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responsibleDetails, setResponsibleDetails] = useState({
    id: "",
    responsible_name: "",
    responsible_email: "",
    responsible_address: "",
    responsible_phone: "",
    responsible_init_hour: "",
    responsible_end_hour: "",
  });

  const { districtId, selectedDate, courtId, name, opening, closest } =
    useLocalSearchParams();

  const DISTRICT_ID = isInserter ? reservationInfo?.districtId : districtId;
  const COURT_ID = isInserter ? reservationInfo?.courtId : courtId;
  const RESERVATION_ID = reservationId;

  const router = useRouter();

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }
  function handlePush() {
    onClose();

    router.push({
      pathname: "/",
    });
  }

  function formatDateTime(
    date: string | undefined,
    time: string | undefined
  ): string {
    if (!date || !time) {
      return "";
    }
    const [day, month, year] = date.split("/");
    const [hour, minute] = time.split(":");
    const formattedDate = `${year}-${month}-${day}T${hour}:${minute}:00.000-03:00`;
    return formattedDate;
  }

  const formattedOpening = formatDateTime(
    reservationInfo?.date,
    reservationInfo?.opening
  );
  const formattedClosest = formatDateTime(
    reservationInfo?.date,
    reservationInfo?.closest
  );

  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  async function handleRegister() {
    try {
      setIsLoading(true);

      console.log(
        "url: ",
        `/districts/${DISTRICT_ID}/sports_couts/${COURT_ID}/sports_cout_has_responsibles/`
      );
      console.log(
        "body: ",
        `/districts/${DISTRICT_ID}/sports_couts/${COURT_ID}/sports_cout_has_responsibles/`,
        {
          init_hour: formattedOpening,
          end_hour: formattedClosest,
          enabled: 1,
          sports_cout_id: reservationInfo?.courtId,
          responsible_id: responsibleInfos?.id,
        }
      );

      const registerResponse = await api.post(
        `/districts/${DISTRICT_ID}/sports_couts/${COURT_ID}/sports_cout_has_responsibles/`,
        {
          init_hour: formattedOpening,
          end_hour: formattedClosest,
          enabled: 1,
          sports_cout_id: reservationInfo?.courtId,
          responsible_id: responsibleInfos?.id,
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

  useEffect(() => {
    if (!isInserter) {
      handleDetails();
    }
  }, [isInserter]);

  async function handleDetails() {
    try {
      setIsLoading(true);
      console.log(
        "url: ",
        `https://42ee-200-239-65-161.ngrok-free.app/districts/${DISTRICT_ID}/sports_couts/${COURT_ID}/sports_cout_has_responsibles/${RESERVATION_ID}`
      );
      const { data } = await api.get(
        `/districts/${DISTRICT_ID}/sports_couts/${COURT_ID}/sports_cout_has_responsibles/${RESERVATION_ID}`
      );
      setResponsibleDetails(data);
    } catch (e) {
      console.log(e);
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
                  {isInserter
                    ? responsibleInfos?.name
                    : responsibleDetails.responsible_name}
                </Text>
              </View>
              <View style={styles.detailsElements}>
                <Mail width={13} height={13} color="#A1A1A1" />
                <Text style={styles.subHeaderText}>
                  {isInserter
                    ? responsibleInfos?.email
                    : responsibleDetails.responsible_email}
                </Text>
              </View>

              <View style={styles.detailsElements}>
                <PhoneCall width={13} height={13} color="#A1A1A1" />
                <Text style={styles.subHeaderText}>
                  {isInserter
                    ? responsibleInfos?.phone
                    : responsibleDetails.responsible_phone}
                </Text>
              </View>
              <View style={styles.detailsElements}>
                <MapPin width={13} height={13} color="#A1A1A1" />
                <Text style={styles.subHeaderText}>
                  {isInserter
                    ? responsibleInfos?.address
                    : responsibleDetails.responsible_address}
                </Text>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.detailsElements}>
                <Calendar width={13} height={13} color="#A1A1A1" />
                <Text style={styles.subHeaderText}>{selectedDate}</Text>
              </View>
              <View style={styles.detailsElements}>
                <Clock width={13} height={13} color="#A1A1A1" />
                <Text style={styles.subHeaderText}>
                  {isInserter
                    ? `${reservationInfo?.opening} - ${reservationInfo?.closest}`
                    : `${formatTime(
                        responsibleDetails.responsible_init_hour
                      )} - ${formatTime(
                        responsibleDetails.responsible_end_hour
                      )}`}
                </Text>
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
        {isModalOpen && (
          <DeleteModal
            visible={isModalOpen}
            onClose={closeModal}
            reservationId={reservationId}
          />
        )}
      </View>
    </Modal>
  );
}
