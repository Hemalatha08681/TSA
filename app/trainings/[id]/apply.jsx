import { StyleSheet, Text, View, TextInput, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { applyToTraining } from "../../../api/api";

export default function Apply() {
  const { id } = useLocalSearchParams();
  const [form, setForm] = useState({
    applicantName: "",
    applicantEmail: "",
    applicantPhone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.applicantName || !form.applicantEmail || !form.applicantPhone) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    setLoading(true);
    try {
      await applyToTraining(id, form);
      Alert.alert("Success", "Application submitted!");
      router.back(); 
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to apply for training");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apply for Training</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={form.applicantName}
        onChangeText={(v) => setForm({ ...form, applicantName: v })}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={form.applicantEmail}
        onChangeText={(v) => setForm({ ...form, applicantEmail: v })}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={form.applicantPhone}
        onChangeText={(v) => setForm({ ...form, applicantPhone: v })}
      />

      <Pressable
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Submitting..." : "Apply"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "blue",
    padding: 14,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
