import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  FlatList,
} from "react-native";
import { styles } from "@/components/list-courts/style";
import { useRouter } from "expo-router";
import { Clock } from "react-native-feather";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@rneui/themed";
import { SportCourt } from "@/storage/district-store";

interface ListCourtProps {
  data: {
    district_id: string;
    district_name: string;
    sports_couts: SportCourt[];
  }[];
}

export function ListCourts({ data }: ListCourtProps) {
  const router = useRouter();

  const [courtId, setCourtId] = useState("");

  function handlePressCourt(
    district_id: string,
    id: string,
    name: string,
    opening: string,
    closest: string
  ) {
    setCourtId(id);
    router.push({
      pathname: "/court-registers/court-registers",
      params: { districtId: district_id, id, name, opening, closest },
    });
  }

  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.listContainer}>
        <SectionList
          //contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={data.map((section) => ({
            data: section.sports_couts,
            title: section.district_name,
          }))}
          keyExtractor={(item) => item.id.toString()}
          renderSectionHeader={({ section: { title, data } }) => (
            <>
              <Text style={styles.listHeader}>{title}</Text>
              <FlatList
                horizontal
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      handlePressCourt(
                        item.district_id,
                        item.id,
                        item.name,
                        formatTime(item.opening),
                        formatTime(item.closest)
                      )
                    }
                  >
                    <Card
                      containerStyle={{
                        borderColor: "#27272A",
                        borderRadius: 10,
                        backgroundColor: "#27272A",
                      }}
                    >
                      <Card.Title style={styles.cardTitle}>
                        {item.name}
                      </Card.Title>
                      <Card.Divider />
                      <Card.Image
                        style={{ borderRadius: 10 }}
                        source={{
                          uri: "https://i.pinimg.com/736x/92/bc/b0/92bcb0cc29b960440a4f5914818ae63e.jpg",
                        }}
                      />
                      <View style={styles.subHeaderContainer}>
                        <Clock width={15} height={15} color="#A1A1A1" />
                        <Text style={[styles.subHeaderText]}>
                          Aberto das {formatTime(item.opening)} às{" "}
                          {formatTime(item.closest)}
                        </Text>
                      </View>
                    </Card>
                  </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}
          renderItem={() => null} // Renderização dos itens movida para FlatList no cabeçalho
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
