import { ActivityIndicator, FlatList, FlatListComponent, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getTrainings } from '../../api/api'
import { Link } from 'expo-router'

export default function Trainings() {
  const [trainings, setTrainings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTrainings = async () => {
    try {
      const response = await getTrainings()
      const data = response.data
      setTrainings(data)
    } catch (error) {
      console.error('Error fetching trainings:', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchTrainings()
  }, [])
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    )
  }
  return (

    <View style={styles.container}>
      <Link style={styles.newbutton} href="/trainings/create">
        New Training
      </Link>

      <FlatList
        data={trainings}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Link href={`/trainings/${item.id}`} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={styles.cardbody}>
                <Text>{item.company}</Text>
                <Text>{item.category}</Text>
              </View>
            </Pressable>
          </Link>
        )}
      />
    </View>
  )


}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 16,
  },
  newbutton: {
    padding: 8,
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    borderRadius: 4
  },
  card: {
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 0.25,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 1,
    marginBottom: 8
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardbody: {
    flexDirection: 'row',
    gap: 10
  }

})