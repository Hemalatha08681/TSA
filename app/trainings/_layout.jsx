import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function TraningLayout() {
    return (
        <>
            <Stack>
                <Stack.Screen name='index' options={{title:"Tranings"}}/>
                <Stack.Screen name='create-training' options={{title:"New Traning"}}/>
                <Stack.Screen name='[id]/index' options={{title:"Training Detail"}}/>
                <Stack.Screen name='[id]/applicants' options={{title:"View Training Applicants"}}/>
                <Stack.Screen name='[id]/apply' options={{title:"Apply trainings"}}/>
            </Stack>
        </>
    )
}

const styles = StyleSheet.create({})