import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Container,
  Content,
  Form,
  Item,
  Input,
  Text,
} from 'native-base';
import BackButton from '../../../components/BackButton';

export default class ActorModal extends Component {
  static navigationOptions({ navigation }) {
    const { params = {} } = navigation.state;
    return {
      headerLeft: (
        <BackButton goBackFn={() => navigation.goBack()} text="Anuluj" />
      ),
      headerRight: params.headerRight,
      title: params.headerTitle,
    };
  }

  constructor(props) {
    super(props);
    const { actorName = '', actorSurname = '' } = props.navigation.state.params;
    this.state = {
      name: actorName,
      surname: actorSurname,
    };
  }

  componentWillMount() {
    this.setNavigationParams();
  }

  setNavigationParams = () => {
    const headerRight = this.renderHeaderRight();

    this.props.navigation.setParams({
      headerRight,
    });
  };

  renderHeaderRight = () => {
    const {
      buttonText,
      handlePress,
      rowId,
    } = this.props.navigation.state.params;

    return (
      <Button
        onPress={() => handlePress(this.state, rowId)}
        title="addActorButton"
        transparent
      >
        <Text style={styles.rightAddButton}>{buttonText}</Text>
      </Button>
    );
  };

  render() {
    return (
      <Container>
        <Content style={styles.content}>
          <Form>
            <Item>
              <Input
                autoCorrect={false}
                autoFocus
                onChangeText={text => this.setState({ name: text })}
                placeholder="Imię"
                placeholderTextColor="#aaa"
                value={this.state.name}
              />
            </Item>
            <Item>
              <Input
                autoCorrect={false}
                onChangeText={text => this.setState({ surname: text })}
                placeholder="Nazwisko"
                placeholderTextColor="#aaa"
                value={this.state.surname}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  rightAddButton: {
    fontWeight: 'bold',
    color: '#c4c6c8',
  },
  buttonDisabled: {
    fontWeight: 'bold',
    color: '#f00',
  },
  content: {
    backgroundColor: '#fff',
  },
});
