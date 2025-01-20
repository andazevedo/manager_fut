import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, SectionList } from "react-native";

import { Link, useRouter } from "expo-router";
import { User } from "react-native-feather";
import { Card } from "@rneui/themed";

import { ListCourts } from "@/components/list-courts";
import { styles } from "@/app/style";
import { api } from "@/server/api";
import { SportCourt, useDistrictStore } from "@/storage/district-store";
import { Loading } from "@/components/loading/loading";

export default function Index() {
  const router = useRouter();
  const districtStore = useDistrictStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const didFetchData = useRef(false);

  const [admin, setAdmin] = useState({
    id: "",
    name: "",
    email: "",
  });

  const [districtsInfo, setDistrictsInfo] = useState<
    { district_id: string; district_name: string; sports_couts: SportCourt[] }[]
  >([]);

  useEffect(() => {
    if (!didFetchData.current) {
      handleAccessDistrictInfos();
      didFetchData.current = true;
    }
  }, []);
  useEffect(() => {
    if (districtStore.data && districtStore.data.length > 0) {
      setAdmin({
        id: districtStore.data[0].user.id || "id",
        name: districtStore.data[0].user.name || "admin",
        email: districtStore.data[0].user.email || "email",
      });
    }
  }, [districtStore.data]);

  async function handleAccessDistrictInfos() {
    try {
      setIsLoading(true);
      const { data } = await api.get("/districts");
      setIsSuccess(true);
      districtStore.save(data);
    } catch (err) {
      setIsSuccess(false);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const extractedInfos = districtStore.data?.map((district) => ({
      district_id: district.id,
      district_name: district.name,
      sports_couts: district.sports_couts,
    }));
    setDistrictsInfo(extractedInfos || []);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Bem vindo(a) {admin.name}</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <User width={30} height={30} color="#A1A1A1" />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Lista de quadras por distrito</Text>
      </View>
      {!isSuccess ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Loading color={"#fff"} />
        </View>
      ) : (
        <ListCourts data={districtsInfo} />
      )}
    </View>
  );
}
