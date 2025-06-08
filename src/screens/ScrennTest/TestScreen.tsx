import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {
  Appbar,
  Button,
  Card,
  Checkbox,
  Divider,
  HelperText,
  IconButton,
  List,
  Menu,
  Modal,
  Portal,
  RadioButton,
  SegmentedButtons,
  Switch,
  Text,
  TextInput,
  ToggleButton,
} from 'react-native-paper';
import {useThemeContext} from '../../context/ThemeContext';

export default function ScreenTest() {
  const {toggleTheme, isDarkTheme, theme} = useThemeContext();

  // States para testing
  const [text, setText] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const [radio, setRadio] = useState('option1');
  const [toggle, setToggle] = useState('');
  const [visible, setVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [segment, setSegment] = useState('walk');

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <Appbar.Header>
        <Appbar.Content title="Demo Theme" />
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="titleLarge" style={styles.section}>
          Componentes comunes
        </Text>
        <Button mode="contained" style={styles.item}>
          Botón primario
        </Button>
        <Button mode="outlined" style={styles.item}>
          Botón outlined
        </Button>
        <Button mode="text" style={styles.item}>
          Botón texto
        </Button>
        <Button icon="camera" mode="contained" style={styles.item}>
          Con ícono
        </Button>
        <TextInput
          label="Campo de texto"
          value={text}
          onChangeText={setText}
          style={styles.item}
          mode="outlined"
        />
        <TextInput
          label="Con error"
          value={text}
          onChangeText={setText}
          error
          style={styles.item}
          mode="outlined"
        />
        <HelperText type="error" visible={true}>
          Mensaje de error
        </HelperText>
        <Card style={styles.item}>
          <Card.Title title="Tarjeta" subtitle="Ejemplo de tarjeta" />
          <Card.Content>
            <Text>Contenido dentro de una tarjeta para prueba de tema.</Text>
          </Card.Content>
          <Card.Actions>
            <Button>Cancelar</Button>
            <Button>Aceptar</Button>
          </Card.Actions>
        </Card>
        <Divider style={styles.item} />
        <Text variant="titleMedium" style={styles.section}>
          Checkbox, Radio, Toggle
        </Text>
        <Checkbox.Item
          label="Checkbox"
          status={checkbox ? 'checked' : 'unchecked'}
          onPress={() => setCheckbox(!checkbox)}
          style={styles.item}
        />
        <RadioButton.Group onValueChange={setRadio} value={radio}>
          <RadioButton.Item label="Opción 1" value="option1" />
          <RadioButton.Item label="Opción 2" value="option2" />
        </RadioButton.Group>
        <ToggleButton.Row
          onValueChange={value => setToggle(value)}
          value={toggle}
          style={styles.item}>
          <ToggleButton icon="format-bold" value="bold" />
          <ToggleButton icon="format-italic" value="italic" />
          <ToggleButton icon="format-underline" value="underline" />
        </ToggleButton.Row>
        <Text variant="titleMedium" style={styles.section}>
          SegmentedButtons
        </Text>
        <SegmentedButtons
          value={segment}
          onValueChange={setSegment}
          buttons={[
            {value: 'walk', label: 'Caminar'},
            {value: 'bike', label: 'Bicicleta'},
            {value: 'car', label: 'Auto'},
          ]}
          style={styles.item}
        />
        <Text variant="titleMedium" style={styles.section}>
          Listas y Menús
        </Text>
        <List.Section>
          <List.Item
            title="Elemento 1"
            description="Descripción"
            left={props => <List.Icon {...props} icon="folder" />}
          />
          <List.Item
            title="Elemento 2"
            left={props => <List.Icon {...props} icon="account" />}
          />
        </List.Section>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button onPress={() => setMenuVisible(true)} style={styles.item}>
              Mostrar menú
            </Button>
          }>
          <Menu.Item onPress={() => {}} title="Opción A" />
          <Menu.Item onPress={() => {}} title="Opción B" />
        </Menu>
        <Text variant="titleMedium" style={styles.section}>
          Modal
        </Text>
        <Button onPress={() => setVisible(true)} style={styles.item}>
          Mostrar Modal
        </Button>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={styles.modal}>
            <Text>Este es un modal de prueba</Text>
            <Button onPress={() => setVisible(false)}>Cerrar</Button>
          </Modal>
        </Portal>
        <IconButton
          icon="heart"
          size={24}
          onPress={() => {}}
          style={styles.item}
        />
        <View style={{height: 80}} /> {/* Espacio final */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    marginVertical: 8,
  },
  section: {
    marginTop: 16,
    marginBottom: 8,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
});
