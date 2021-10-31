import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import WebViews from "./WebViews.js";

const App = () => {
  const [reminder, setReminder] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [note, setNote] = useState("");
  const [uri, setUri] = useState(false);

  const handlePress = (val) => {
    setSelectedDate(val.dateString);
    setShowForm(true);
  };

  const handleSave = () => {
    if (note.length > 0) {
      setReminder((prev) => [
        ...prev,
        {
          date: selectedDate,
          note: note,
        },
      ]);
    }

    setSelectedDate("");
    setNote("");
    setShowForm(false);
  };

  const handleCancel = () => {
    setSelectedDate("");
    setNote("");
    setShowForm(false);
  };

  function clicked() {
    console.log(uri + " uri");
    setUri(!uri);
  }

  return (
    <>
      <View>
        <TouchableOpacity
          style={{ marginVertical: 50, marginLeft: 10 , fontSize : 30}}
          onPress={clicked}
        >
          <Text style={{ color: "blue", textDecorationLine: "underline" }}>
            Open Gmail
          </Text>
        </TouchableOpacity>
      </View>
      {uri ? (
        <WebViews />
      ) : (
        <View>
          <View style={{ paddingVertical: 10 }}>
            {!showForm ? (
              <ScrollView>
                <Text style={styles.reminderHeading}>List of Reminders</Text>
                {reminder.length > 0 ? (
                  reminder.map((item, index) => (
                    <Text key={index} style={styles.reminders}>
                      {item.date} {"  "} {item.note}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.reminders}>No reminders added</Text>
                )}
              </ScrollView>
            ) : (
              <View>
                <Text style={styles.reminderHeading}>Add A Reminder</Text>
                <Text style={{ padding: 10, fontSize: 20 }}>
                  {selectedDate}
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => setNote(text)}
                  value={note}
                  placeholder="Remind me to..."
                />
                <View style={styles.btnContainer}>
                  <Pressable style={styles.btn} onPress={handleSave}>
                    <Text style={{ color: "white" }}>SAVE</Text>
                  </Pressable>

                  <Pressable style={styles.btn} onPress={handleCancel}>
                    <Text style={{ color: "white" }}>CANCEL</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
          <View>
            <Calendar
              hideExtraDays
              enableSwipeMonths
              onDayPress={(val) => handlePress(val)}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  reminderHeading: {
    borderBottomColor: "#00008B",
    borderBottomWidth: 5,
    paddingBottom: 5,
    fontSize: 25,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginHorizontal: 10,
  },
  reminders: {
    fontSize: 20,
    paddingVertical: 15,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  input: {
    fontSize: 20,
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  btnContainer: {
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-around",
  },
});

export default App;
