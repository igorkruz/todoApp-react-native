import { 
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { ListItem } from './src/components/ListItem/ListItem';
import { colors } from './src/utils/colors';

export default function App() {
  const [textInput, setTextInput] = useState('');
  const [todos, setTodos] = useState([
    {id: 1, task: 'first todo', completed: false},
    {id: 2, task: 'first todo', completed: true}
  ]);

  const addTodo = () => {
    if (!textInput.trim()) {
      Alert.alert('error', 'Plese input todo')
      setTextInput('')
    } else {
      const newTodo = {
        id: uuidv4(),
        task: textInput,
        completed: false
      }
  
      setTodos(currTodos => [...currTodos, newTodo])
      setTextInput('')
    }
    
  }

  const markTodoCompleted = (id) => {
    setTodos(currTodos => currTodos.map(todo => todo.id === id ? {...todo, completed: true} : todo))
  }

  const deleteTodo = (id) => {
    setTodos(currTodos => currTodos.filter(todo => todo.id !== id))
  }

  const deleteAllTodos = () => {
    Alert.alert('confirm', 'Clear todos?', [
      {
        text: 'Yes',
        onPress: () => setTodos([])
      },
      {
        text: 'No'
      }
    ])
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white }}>
      <View style={styles.header}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: colors.primary}}> 
          Todo App
        </Text>
        <Icon name='delete' size={25} color={'red'} onPress={deleteAllTodos}/>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 20, paddingBottom: 100,}} 
        data={todos} 
        renderItem={({item}) => (
          <ListItem 
            todo={item}
            deleteTodo={deleteTodo}
            markTodoCompleted={markTodoCompleted}
          />
        )}
      />

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput  
            placeholder='Add todo' 
            onChangeText={(text) => setTextInput(text)}
            value={textInput}
          />
        </View>

        <TouchableOpacity onPress={addTodo}>
        <View style={styles.styleContainer}>
          <Icon name='add' color={colors.white} size={30} />
        </View>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    color: colors.white,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: colors.white,
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  styleContainer: {
    height: 50,
    width: 50,
    backgroundColor: colors.primary,
    borderRadius: 25,
    elevation: 40,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
