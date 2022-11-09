import React, { useState, Component, useEffect } from "react";
import MapView from 'react-native-maps';
import { Button, View, Text, TextInput, StyleSheet, ActivityIndicator, FlatList, Dimensions } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function AvaliacaoScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [nota, setNota] = useState()
  const [criticaPositiva, setCriticaPositiva] = useState()
  const [criticaNegativa, setCriticaNegativa] = useState()

  const [idAvaliacaoProfessor, setIdAvaliacaoProfessor] = useState()
  const [idProfessor, setIdProfessor] = useState()


  const verificar = () => {

    // setIdAvaliacaoProfessor(1)
    // setIdProfessor(1)

    fetch('http://localhost:8080/php/avaliacao-json-inserir.php', {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        idAvaliacaoProfessor: idAvaliacaoProfessor,
        notaProfessor: nota,
        criticaPositiva: criticaPositiva,
        criticaNegativa: criticaNegativa,
        idProfessor: idProfessor,
      })
    })

  }

  const getProfessores = async () => {
    try {
      const response = await fetch('http://localhost:8080/php/professor-json.php');
      const json = await response.json();
      setData(json.professores);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfessores();
  }, []);

  return (

    <View style={styles.tudo}>
      <View style={{ marginTop: 50 }}>
        <Text style={styles.titulo}>Avaliar Professor</Text>
      </View>

      {/* <View style={{ marginLeft: 20 }}>
        <Text style={styles.foto}>Foto</Text>
      </View> */}

      <View style={styles.alinhar}>
        <Text style={styles.label}>NOME : </Text>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            keyExtractor={({ idProfessor }, index) => idProfessor}
            renderItem={({ item }) => (
              <Text style={{ marginLeft: 10, fontSize: 25 }}>{item.nomeprofessor}</Text>
            )}
          />
        )}
        <View style={styles.botaoDireito}>
          <Button
            title="Ver avaliações"
            color={'#B0E0E6'}
            onPress={() => navigation.navigate('VerAvaliacoes')}
          />
        </View>
      </View>

      <View>
        <Text style={styles.label}>Disciplina:</Text>
        <FlatList
          data={data}
          keyExtractor={({ idProfessor }, index) => idProfessor}
          renderItem={({ item }) => (
            <Text style={{ marginLeft: 10, fontSize: 25 }}>{item.materia}</Text>
          )}
        />
      </View>

      <View style={{ marginHorizontal: 10 }}>
        <Text style={styles.label}>Nota</Text>
        <TextInput
          style={styles.caixaDeTexto}
          placeholder="nota"
          autoFocus={false}
          onChangeText={text => setNota(text)}
        />
      </View>

      <View style={styles.criticas}>

        <View style={{ marginHorizontal: 10 }}>
          <Text style={styles.label}>Crítica positiva</Text>
          <TextInput
            style={styles.caixaDeTexto}
            placeholder="Insira suas críticas positivas"
            autoFocus={false}
            onChangeText={text => setCriticaPositiva(text)}
          />
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <Text style={styles.label}>Crítica negativa</Text>
          <TextInput
            style={styles.caixaDeTexto}
            placeholder="Insira sua crítica negativa"
            onChangeText={text => setCriticaNegativa(text)}
          />
        </View>
      </View>


      <View style={{ margin: 15, backgroundColor: '#F8F8FF' }}>
        <Button
          title="Salvar"
          color={'#B0E0E6'}
          onPress={() => verificar()}
        />

      </View>

      <View style={{ margin: 15, backgroundColor: '#F8F8FF' }}>
        <Button
          title="Cancelar"
          color={'#008B8B'}
          onPress={() => navigation.navigate('Professores')}
        />
      </View>

    </View>
  );
}

function ProfessoresScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getProfessores = async () => {
    try {
      const response = await fetch('http://localhost:8080/php/professor-json.php');
      const json = await response.json();
      setData(json.professores);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfessores();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8FF' }}>
      <View>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            keyExtractor={({ idProfessor }, index) => idProfessor}
            renderItem={({ item }) => (
              <View style={{ marginTop: 40 }}>
                <View style={{ backgroundColor: 'white', height: 100, marginLeft: 10, marginRight: 10, marginBottom: 20, borderRadius: 20, justifyContent: 'center', textAlign: 'center' }}>
                  <Text>ID: {item.idprofessor}; {"\n"} NOME: {item.nomeprofessor}; {"\n"} MATÉRIA: {item.materia}</Text>
                  <View>
                    <Button
                      title="Fazer avaliação"
                      color={'#B0E0E6'}
                      onPress={() => navigation.navigate('Avaliacao')}
                    />
                  </View>
                </View>
              </View>

            )}
          />

        )}
      </View>
    </View>
  );
}

function AvaliacoesScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getAvaliacoes = async () => {
    try {
      const response = await fetch('http://localhost:8080/php/avaliacao-json.php');
      const json = await response.json();
      setData(json.avaliacoes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAvaliacoes();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8FF' }}>
      <View>
        <Button
          title="Ver mapa das avaliações"
          color={'#B0E0E6'}
          onPress={() => navigation.navigate('Mapa')}
        />
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            keyExtractor={({ idAvaliacaoProfessor }, index) => idAvaliacaoProfessor}
            renderItem={({ item }) => (
              <View style={{ marginTop: 40 }}>
                <View style={{ backgroundColor: 'white', height: 100, marginLeft: 10, marginRight: 10, marginBottom: 20, borderRadius: 20, justifyContent: 'center', textAlign: 'center' }}>
                  <Text>ID: {item.idAvaliacaoProfessor}; {"\n"} NOTA: {item.notaProfessor}; {"\n"} CRÍTICA POSITIVA: {item.criticaPositiva} ;{"\n"} CRÍTICA NEGATIVA : {item.criticaNegativa}; {"\n"} PROFESSOR: {item.idProfessor}</Text>
                </View>
              </View>

            )}
          />

        )}
      </View>
    </View>
  );
}

function MapaScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        zoomEnabled={true}
        initialRegion={{
          latitude: -23.5506507,
          longitude: -46.6333824,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Professores">
          <Stack.Screen name="Avaliacao" component={AvaliacaoScreen} />
          <Stack.Screen name="Professores" component={ProfessoresScreen} />
          <Stack.Screen name="VerAvaliacoes" component={AvaliacoesScreen} />
          <Stack.Screen name="Mapa" component={MapaScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({

  tudo: {
    height: '100%',
    backgroundColor: '#F8F8FF',
    marginBottom: 10
  },

  label: {
    fontSize: 20,
    marginTop: 25,
    marginBottom: 10,
    marginLeft: 10
  },

  caixaDeTexto: {
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    height: 40,
    backgroundColor: 'white'
  },

  criticas: {
    backgroundColor: '#F8F8FF',
  },

  resposta: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 30
  },

  titulo: {
    fontSize: 20,
    marginTop: -30,
    marginBottom: 30,
    marginLeft: 10
  },

  // foto: {
  //   backgroundColor: 'grey',
  //   width: 150,
  //   height: 150,
  //   paddingLeft: 58,
  //   paddingTop: 58
  // },

  botaoDireito: {
    width: 120,
    marginLeft: 10
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

});