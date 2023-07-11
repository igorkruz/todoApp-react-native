import { 
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../utils/colors';

export const ListItem = ({todo, deleteTodo, markTodoCompleted}) => {
  return (
    <View style={styles.listItem}>
      <View style={{flex: 1}}>
        <Text style={
          {
            fontWeight: 'bold', 
            fontSize: 15, 
            color: colors.primary,
            textDecorationLine: todo?.completed ? 'line-through' : 'none'
          }
        }>
          {todo?.task}
        </Text>
      </View>

      {
        !todo?.completed && (
          <TouchableOpacity style={[styles.actionIcon]} onPress={() => markTodoCompleted(todo?.id)}>
            <Icon name='done'color={colors.white} size={20} />
          </TouchableOpacity>
        )
      }

      
      <TouchableOpacity style={[styles.actionIcon, {backgroundColor: 'red'}]} onPress={() => deleteTodo(todo?.id)}>
        <Icon name='delete'color={colors.white} size={20} />
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 3,
  },
  listItem: {
    padding: 20,
    backgroundColor: colors.white,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,

  }
});