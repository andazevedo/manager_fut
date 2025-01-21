import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  Alert,
  Keyboard,
} from "react-native";

import { X, Clock, Calendar, User, Bookmark } from "react-native-feather";
import { Picker } from "@react-native-picker/picker";
import { Link, useRouter, useLocalSearchParams } from "expo-router";

import { ListReservations } from "@/components/list-reservations";
import { ModalReservation } from "@/components/modal-infos";
import { styles } from "@/app/handle-details/style";
import { api } from "@/server/api";
import {
  ResponsibleStore,
  useResponsibleStore,
} from "@/storage/responsible-store";
import { useReservationStore } from "@/storage/reservation-store";
import { Loading } from "@/components/loading/loading";

export default function HandleDetails() {
  const router = useRouter();
  const { districtId, selectedDate, courtId, name, opening, closest } =
    useLocalSearchParams();

  const DISTRICT_ID = districtId;
  const COURT_ID = courtId;

  const formattedDate = selectedDate ? `${selectedDate}` : "";

  const responsibleStore = useResponsibleStore();
  const reservationStore = useReservationStore();

  const isResponsibleFetched = useRef(false);

  const [selectedResponsible, setSelectedResponsible] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    created_at: "",
    updated_at: "",
  });
  const [selectedInterval, setSelectedInterval] = useState({
    districtId: "",
    courtId: "",
    date: "",
    opening: "",
    closest: "",
  });
  const [listInfoDaily, setListInfoDaily] = useState<
    {
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
    }[]
  >([]);

  const [selectedPickerTime, setSelectedPickerTime] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [isDataReady, setIsDataReady] = useState(false);

  function openConfirmReservationModal() {
    if (!validateInputs()) {
      return;
    }
    setIsModalOpen(true);
  }

  function closeConfirmReservationModal() {
    setIsModalOpen(false);
  }

  function validateInputs() {
    if (selectedResponsible.email.length <= 0) {
      Alert.alert("Erro", "Por favor, selecione um responsável.");
      return false;
    }
    if (selectedInterval.opening.length <= 0) {
      Alert.alert("Erro", "Por favor, selecione um intervalo de horário.");
      return false;
    }
    return true;
  }

  function americanDateFormat(data: string) {
    const [day, month, year] = data.split("/");
    return `${year}/${month}/${day}`;
  }

  function generateTimeIntervals(opening: string, closing: string) {
    const intervals = [];
    let currentTime = opening;

    while (currentTime < closing) {
      const [hour, minute] = currentTime.split(":").map(Number);
      const nextHour = (hour + 1).toString().padStart(2, "0"); // Incrementa 1 hora
      const nextTime = `${nextHour}:${minute.toString().padStart(2, "0")}`;

      // Adiciona o intervalo ao array
      intervals.push({
        districtId: districtId,
        courtId: courtId,
        opening: currentTime,
        closest: nextTime,
        date: formattedDate.toString(),
      });
      // Atualiza o horário atual para o próximo intervalo
      currentTime = nextTime;
    }

    return intervals;
  }
  const intervals = generateTimeIntervals(
    opening.toString(),
    closest.toString()
  );

  useEffect(() => {
    if (!isResponsibleFetched.current) {
      handleAccessResponsibleInfos();
      handleListDailyReservations();
      isResponsibleFetched.current = true;
    }
  }, []);
  useEffect(() => {
    setIsDataReady(true);
  }, []);
  async function handleAccessResponsibleInfos() {
    try {
      setIsLoading(true);
      const { data } = await api.get("/responsibles");
      responsibleStore.save(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleListDailyReservations() {
    try {
      setIsLoading(true);
      console.log(
        "url: ",
        `/districts/${DISTRICT_ID}/sports_couts/${COURT_ID}/sports_cout_has_responsibles/list_hours_by_date/${formattedDate}`
      );
      const { data } = await api.get(
        `/districts/${DISTRICT_ID}/sports_couts/${COURT_ID}/sports_cout_has_responsibles/list_hours_by_date/`,
        {
          params: { by_date: americanDateFormat(formattedDate) },
        }
      );
      //reservationStore.save(data);
      setListInfoDaily(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const extractedInfos = reservationStore.data?.map((infos) => ({
      id: infos.id,
      enabled: infos.enabled,
      init_hour: infos.init_hour,
      end_hour: infos.end_hour,
      observations: infos.observations,
      responsible_id: infos.responsible_id,
      responsible_name: infos.responsible_name,
      responsible_address: infos.responsible_address,
      responsible_phone: infos.responsible_phone,
      responsible_email: infos.responsible_email,
    }));
    setListInfoDaily(extractedInfos || []);
  }, []);

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Reserve um horário: {name}</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Link href={"/"}>
              <X width={30} height={30} color="#A1A1A1" />
            </Link>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View style={styles.formContainer}>
          <View style={styles.viewContainer}>
            <Calendar width={20} height={20} color="#A1A1A1" />
            <TextInput
              style={styles.inputContainer}
              placeholder={formattedDate}
              placeholderTextColor={"#f5f5f5"}
              editable={false}
            ></TextInput>
          </View>
          <View style={styles.viewContainer}>
            <User width={20} height={20} color="#A1A1A1" />
            <TextInput
              style={styles.inputContainer}
              editable={true}
              value={selectedResponsible.email || ""}
              placeholder={"Selecione um responsável."}
              placeholderTextColor={"#c4bebe"}
              onPressIn={() => setShowPicker(true)}
              onFocus={() => Keyboard.dismiss()}
            ></TextInput>
          </View>
          <View style={styles.viewContainer}>
            <View>
              <Clock width={20} height={20} color="#A1A1A1" />
            </View>
            <TextInput
              style={styles.inputContainer}
              value={
                selectedInterval.opening
                  ? `${selectedInterval?.opening} - ${selectedInterval?.closest}`
                  : ""
              }
              placeholder={"ex: 9 da manhã às 10 da manhâ."}
              placeholderTextColor={"#c4bebe"}
              onPressIn={() => setSelectedPickerTime(true)}
              onFocus={() => Keyboard.dismiss()}
            ></TextInput>
          </View>
          <TouchableOpacity
            style={styles.insertButton}
            activeOpacity={0.7}
            onPress={openConfirmReservationModal}
          >
            <Text style={styles.insertButtonText}>Marcar horário</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator} />
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Lista de horários para este dia</Text>
        </View>
        <View>
          {!isLoading ? (
            <ListReservations
              data={listInfoDaily}
              responsibleInfos={selectedResponsible}
              reservationInfo={selectedInterval}
            />
          ) : (
            <View
              style={{
                width: "100%",
                paddingTop: "50%",
              }}
            >
              <Loading color={"#fff"} />
            </View>
          )}
        </View>

        {showPicker && (
          <Modal transparent={true} animationType="slide">
            <View style={styles.pickerOverlay}>
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerTitle}>Escolha um responsável</Text>
                <View style={styles.scrollContainer}>
                  <ScrollView>
                    <Picker
                      style={styles.picker}
                      selectedValue={selectedResponsible}
                      onValueChange={(itemValue) => {
                        setSelectedResponsible(itemValue);
                        setShowPicker(false);
                      }}
                    >
                      <Picker.Item
                        color="#000000"
                        label="Selecione..."
                        value=""
                      />
                      {responsibleStore.data?.map((responsible, index) => (
                        <Picker.Item
                          style={styles.pickerItem}
                          key={index}
                          label={`${responsible.name} (${responsible.email})`}
                          value={responsible}
                        />
                      ))}
                    </Picker>
                  </ScrollView>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.closePickerButton}
                  onPress={() => setShowPicker(false)}
                >
                  <Text style={styles.closePickerButtonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
        {selectedPickerTime && (
          <Modal transparent={true} animationType="slide">
            <View style={styles.pickerOverlay}>
              <View style={styles.pickerContainer}>
                <Text style={styles.pickerTitle}>selecione o horário</Text>
                <View style={styles.scrollContainer}>
                  <ScrollView>
                    <Picker
                      style={styles.picker}
                      selectedValue={selectedInterval}
                      onValueChange={(itemValue) => {
                        setSelectedInterval(itemValue);
                        setSelectedPickerTime(false);
                      }}
                    >
                      <Picker.Item
                        color="#000000"
                        label="Selecione..."
                        value=""
                      />
                      {intervals.map((interval, index) => (
                        <Picker.Item
                          style={styles.pickerItem}
                          key={index}
                          label={`${interval.opening} - ${interval.closest} `}
                          value={interval}
                        />
                      ))}
                    </Picker>
                  </ScrollView>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.closePickerButton}
                  onPress={() => setSelectedPickerTime(false)}
                >
                  <Text style={styles.closePickerButtonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
        {isModalOpen && (
          <ModalReservation
            visible={isModalOpen}
            responsibleInfos={selectedResponsible}
            reservationInfo={selectedInterval}
            onClose={closeConfirmReservationModal}
            isInserter={true}
          />
        )}
      </View>
    </View>
  );
}
