import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  ModalProps,
} from "react-native";
import { X } from "react-native-feather";
import { styles } from "@/components/modal-delete-reservation/style";
import { useLocalSearchParams, useRouter } from "expo-router";
import { api } from "@/server/api";
import { Loading } from "../loading/loading";

type Props = ModalProps & {
  visible: boolean;
  onClose: () => void;
  reservationId: string | undefined;
};

export function DeleteModal({
  visible = false,
  onClose,
  reservationId,
  children,

  ...rest
}: Props) {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { districtId, selectedDate, courtId, name, opening, closest } =
    useLocalSearchParams();
  const router = useRouter();

  const DISTRICT_ID = districtId;
  const COURT_ID = courtId;
  const RESERVATION_ID = reservationId;

  function validateInputs() {
    if (!comment.trim()) {
      Alert.alert("Erro", "Por favor, comente a justificativa. ");
      return false;
    }

    return true;
  }
  function handlePush() {
    onClose();

    router.push({
      pathname: "/",
    });
  }

  async function handleDisableReservation() {
    if (!validateInputs()) return;

    try {
      setIsLoading(true);
      console.log(
        "body: ",
        `https://42ee-200-239-65-161.ngrok-free.app/districts/${DISTRICT_ID}/sports_couts/${COURT_ID}/sports_cout_has_responsibles/${RESERVATION_ID}/disabled`,
        null,
        {
          params: {
            enabled: 0,
            observations: comment,
          },
        }
      );
      const { data } = await api.patch(
        `districts/${DISTRICT_ID}/sports_couts/${COURT_ID}/sports_cout_has_responsibles/${RESERVATION_ID}/disabled`,
        null,
        {
          params: {
            enabled: 0,
            observations: comment,
          },
        }
      );

      if (data.message === "Horário agendado foi excluído com sucesso!") {
        Alert.alert("Sucesso", "Reserva excluída com sucesso!", [
          { text: "OK", onPress: () => handlePush() },
        ]);
      }
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
            <Text style={styles.headerText}>Confirme Cancelamento</Text>
            <TouchableOpacity onPress={onClose}>
              <X width={30} height={30} color="#A1A1A1" />
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          <View style={styles.formContainer}>
            <View style={styles.viewContainer}>
              <Text style={styles.subHeaderText}>
                Informe o motivo do cancelamento. O responsável pela reserva
                será notificado.
              </Text>
              <TextInput
                style={styles.inputContainer}
                placeholder="ex: Desculpe, tive um imprevisto."
                placeholderTextColor={"#f5f5f5"}
                onChangeText={setComment}
              ></TextInput>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              activeOpacity={0.7}
              onPress={handleDisableReservation}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loading color={"#fff"} />
              ) : (
                <Text style={styles.deleteButtonText}>Excluir Reserva</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
