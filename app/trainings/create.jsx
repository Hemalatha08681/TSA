import { StyleSheet, Text, View, TextInput, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { createTraining } from "../../api/api";

export default function CreateTraining() {
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    level: "",
    category: "",
    company: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
   
    if (!form.title || !form.description || !form.company) {
      Alert.alert("Error", "Title, Description and Company are required!");
      return;
    }

    setLoading(true);

    try {
      await createTraining({
        ...form,
        duration: Number(form.duration), 
      });

      Alert.alert("Success", "Training created successfully!");
      router.back();     
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to create training");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create New Training</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={form.title}
        onChangeText={(v) => setForm({ ...form, title: v })}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        multiline
        value={form.description}
        onChangeText={(v) => setForm({ ...form, description: v })}
      />

      <TextInput
        style={styles.input}
        placeholder="Duration (in days)"
        keyboardType="numeric"
        value={form.duration}
        onChangeText={(v) => setForm({ ...form, duration: v })}
      />

      <TextInput
        style={styles.input}
        placeholder="Level (beginner/advanced)"
        value={form.level}
        onChangeText={(v) => setForm({ ...form, level: v })}
      />

      <TextInput
        style={styles.input}
        placeholder="Category"
        value={form.category}
        onChangeText={(v) => setForm({ ...form, category: v })}
      />

      <TextInput
        style={styles.input}
        placeholder="Company"
        value={form.company}
        onChangeText={(v) => setForm({ ...form, company: v })}
      />

      <Pressable 
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Creating..." : "Create Training"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "green",
    padding: 14,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
