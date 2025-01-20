import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  Alert,
  ModalProps,
} from "react-native";
import { AtSign, Plus, X, Clock, Calendar, User } from "react-native-feather";
import { styles } from "@/components/modal-delete-reservation/style";
import { DateData } from "react-native-calendars";
import { Picker } from "@react-native-picker/picker";
import { ResponsibleStore } from "@/storage/responsible-store";

type Props = ModalProps & {
  visible: boolean;
  onClose: () => void;
  infosResponsible: [
    {
      id: string;
      name: string;
      email: string;
      phone: string;
      address: string;
    }
  ];
};

export function DeleteModal({
  visible = false,
  onClose,
  children,
  accessibilityLargeContentTitle,
  infosResponsible,
  ...rest
}: Props) {
  const [comment, setComment] = useState("");

  function validateInputs() {
    if (!comment.trim()) {
      Alert.alert("Erro", "Por favor, comente a justificativa. ");
      return false;
    }

    return true;
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
              onPress={validateInputs}
            >
              <Text style={styles.deleteButtonText}>Excluir Reserva</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
