import React, { Component } from 'react';
import { AsyncStorage, ListView, StyleSheet } from 'react-native';
import { Button, Icon, List, ListItem, Text } from 'native-base';
import BackButton from '../../components/BackButton';

export default class ActorsScreen extends Component {
  static navigationOptions({ navigation }) {
    const { params = {} } = navigation.state;
    return {
      headerLeft: params.headerLeft,
      headerRight: params.headerRight,
      title: params.title,
    };
  }

  constructor() {
    super();
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      listViewData: [],
    };
  }

  componentDidMount() {
    this.setNavigationParams();
    this.getFromStorage('actorsList');
  }

  setNavigationParams = () => {
    const { navigation } = this.props;
    const title = 'Aktorzy';
    const headerLeft = <BackButton goBackFn={() => navigation.goBack()} />;
    const headerRight = (
      <Button
        onPress={() =>
          navigation.navigate('ActorModal', {
            buttonText: 'Dodaj',
            handlePress: this.addActorHandler,
            headerTitle: 'Dodaj aktora',
          })
        }
        title="addNewActorButton"
        transparent
      >
        <Icon name="add" style={styles.addIcon} />
      </Button>
    );

    this.props.navigation.setParams({
      headerLeft,
      headerRight,
      title,
    });
  };

  addActorHandler = modalState => {
    if (modalState.name && modalState.surname) {
      const newListViewData = this.state.listViewData.slice();
      newListViewData.push(modalState.name + ' ' + modalState.surname);
      this.saveAndGoBack(newListViewData);
    }
  };

  editActorHandler = (modalState, rowId) => {
    const newListViewData = this.state.listViewData.slice();
    newListViewData.splice(
      rowId,
      1,
      modalState.name + ' ' + modalState.surname
    );
    this.saveAndGoBack(newListViewData);
  };

  deleteRow = async (secId, rowId, rowMap) => {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newListViewData = this.state.listViewData.filter(
      (row, index) => index !== +rowId
    );
    this.saveToStorage(newListViewData);
  };

  saveToStorage = async newData => {
    try {
      await AsyncStorage.setItem('actorsList', JSON.stringify(newData));
    } catch (error) {
      console.log('Error saving data:', error);
    }
    this.setState({ listViewData: newData });
  };

  getFromStorage = async itemName => {
    try {
      const value = await AsyncStorage.getItem(itemName);
      if (value !== null) {
        this.setState({ listViewData: JSON.parse(value) });
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  };

  saveAndGoBack = data => {
    this.saveToStorage(data);
    this.props.navigation.goBack(null);
  };

  render() {
    return (
      <List
        style={styles.list}
        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
        renderRow={data => (
          <ListItem style={styles.listItem}>
            <Text>{data}</Text>
          </ListItem>
        )}
        renderLeftHiddenRow={(data, secId, rowId, rowMap) => (
          <Button
            full
            info
            onPress={() => {
              return this.props.navigation.navigate('ActorModal', {
                actorName: data.split(' ')[0],
                actorSurname: data.split(' ')[1],
                handlePress: this.editActorHandler,
                buttonText: 'Zmień',
                headerTitle: 'Edytuj aktora',
                rowId,
              });
            }}
            title="leftHiddenButton"
          >
            <Text>Edytuj</Text>
          </Button>
        )}
        renderRightHiddenRow={(data, secId, rowId, rowMap) => (
          <Button
            full
            danger
            onPress={() => this.deleteRow(secId, rowId, rowMap)}
            title="rightHiddenButton"
          >
            <Icon active name="trash" />
          </Button>
        )}
        leftOpenValue={100}
        rightOpenValue={-100}
      />
    );
  }
}

const styles = StyleSheet.create({
  backIcon: {
    fontSize: 34,
  },
  addIcon: {
    fontSize: 34,
  },
  list: {
    backgroundColor: '#fff',
  },
  listItem: {
    paddingLeft: 15,
  },
});
