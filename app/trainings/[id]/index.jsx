import { StyleSheet, Text, View, ActivityIndicator, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useLocalSearchParams } from "expo-router";
import { getTrainingById } from "../../../api/api";

export default function TrainingDetail() {
  const { id } = useLocalSearchParams();
  const [training, setTraining] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTraining = async () => {
    try {
      const response = await getTrainingById(id);
      setTraining(response.data);
    } catch (error) {
      console.error("Error fetching training:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTraining();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!training) {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Training not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{training.title}</Text>

      <Text>Company: {training.company}</Text>
      <Text>Category: {training.category}</Text>
      <Text>Description: {training.description}</Text>

      <View style={styles.cardbottom}>
        <Link href={`/trainings/${id}/apply`} asChild>
          <Pressable style={styles.apb}>
            <Text style={styles.btnText}>Apply</Text>
          </Pressable>
        </Link>

        <Link href={`/trainings/${id}/applicants`} asChild>
          <Pressable style={styles.apl}>
            <Text style={styles.btnText}>View Applicants</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 0.25,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 4,
    margin: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardbottom: {
    marginTop: 20,
    flexDirection: "row",
    gap: 20,
  },
  apb: {
    flex: 1,
    padding: 12,
    backgroundColor: "green",
    borderRadius: 6,
    alignItems: "center",
  },
  apl: {
    flex: 1,
    padding: 12,
    backgroundColor: "blue",
    borderRadius: 6,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
