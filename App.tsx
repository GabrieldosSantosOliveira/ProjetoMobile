import { openDatabase } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ValueType = {
  id: number;
  title: string;
  description: string;
  content: string;
};

export default function App() {
  const [values, setValues] = useState<ValueType[]>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const db = openDatabase("moveis");
  const create = () => {
    db.transaction((txn) => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS news(id INTEGER PRIMARY KEY autoincrement, title VARCHAR(10), description VARCHAR(0), content VARCHAR(200))`,
        [],
        (sqlTxn, res) => {
          console.log("Criado com sucesso");
        }
      );
    });
  };
  const insert = () => {
    db.transaction((txn) => {
      txn.executeSql(
        `INSERT INTO news(title, description, content) Values(?, ?, ?)`,
        [title, description, content],
        (sqlTxn, res) => {
          console.log(`Inserido com sucesso`);
        }
      );
    });
  };
  const Read = async () => {
    db.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM news ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          console.log("Noticias carregadas com sucesso");
          const len = res.rows.length;

          if (len > 0) {
            const results = [];
            for (let i = 0; i < len; i++) {
              const item: ValueType = res.rows.item(i);
              results.push({
                id: item.id,
                title: item.title,
                description: item.description,
                content: item.content,
              });
            }
            setValues(results);
          }
        }
      );
    });
  };
  const pegarDados = async () => {
    await create();
    await Read();
  };
  useEffect(() => {
    pegarDados();
  });
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        <TextInput
          placeholder="Digite o titulo"
          onChangeText={setTitle}
          value={title}
        />
        <TextInput
          placeholder="Digite a descrição"
          onChangeText={setDescription}
          value={description}
        />
        <TextInput
          placeholder="Digite o conteudo"
          onChangeText={setContent}
          value={content}
        />
        <TouchableOpacity onPress={insert}>
          <Text>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
