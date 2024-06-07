import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Appearance } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class CalculatorScreen extends React.Component {
  state = {
    display: '0',
    currentInput: '',
    operator: null,
    waitingForOperand: false,
    darkMode: false,
  };

  handleDigitPress = (digit) => {
    const { display, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        display: digit,
        waitingForOperand: false,
      });
    } else {
      this.setState({
        display: display === '0' ? digit : display + digit,
      });
    }
  };

  handleOperatorPress = (operator) => {
    const { display, currentInput, operator: currentOperator } = this.state;

    if (currentOperator && !this.state.waitingForOperand) {
      const result = this.calculate(currentInput, display, currentOperator);
      this.setState({
        display: String(result),
        currentInput: String(result),
        waitingForOperand: true,
        operator,
      });
    } else {
      this.setState({
        currentInput: display,
        waitingForOperand: true,
        operator,
      });
    }
  };

  handleEqualsPress = () => {
    const { display, currentInput, operator } = this.state;

    if (operator && !this.state.waitingForOperand) {
      const result = this.calculate(currentInput, display, operator);
      this.setState({
        display: String(result),
        currentInput: '',
        waitingForOperand: true,
        operator: null,
      });
    }
  };

  handleClearPress = () => {
    this.setState({
      display: '0',
      currentInput: '',
      operator: null,
      waitingForOperand: false,
    });
  };

  handleToggleMode = () => {
    this.setState((prevState) => ({
      darkMode: !prevState.darkMode,
    }));
  };

  calculate = (num1, num2, operator) => {
    const operand1 = parseFloat(num1);
    const operand2 = parseFloat(num2);

    switch (operator) {
      case '+':
        return operand1 + operand2;
      case '-':
        return operand1 - operand2;
      case '*':
        return operand1 * operand2;
      case '/':
        return operand1 / operand2;
      default:
        return operand2;
    }
  };

  render() {
    const { display, darkMode } = this.state;
    const mode = Appearance.getColorScheme(); // Check the device's system color scheme

    return (
      <View style={[styles.container, darkMode || mode === 'dark' ? styles.darkContainer : null]}>
        <TouchableOpacity
          style={styles.toggleModeButton}
          onPress={this.handleToggleMode}
        >
          <Ionicons name={darkMode || mode === 'dark' ? 'moon' : 'sunny'} size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.calculatorContainer}>
          <Text style={[styles.display, darkMode || mode === 'dark' ? styles.darkDisplay : null]}>{display}</Text>
          <View style={styles.bRow}>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleDigitPress('7')}
              >
                <Text style={styles.buttonText}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleDigitPress('8')}
              >
                <Text style={styles.buttonText}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleDigitPress('9')}
              >
                <Text style={styles.buttonText}>9</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleOperatorPress('/')}
              >
                <Text style={styles.buttonText}>/</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleDigitPress('4')}
              >
                <Text style={styles.buttonText}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleDigitPress('5')}
              >
                <Text style={styles.buttonText}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleDigitPress('6')}
              >
                <Text style={styles.buttonText}>6</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleOperatorPress('*')}
              >
                <Text style={styles.buttonText}>*</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleDigitPress('1')}
              >
                <Text style={styles.buttonText}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleDigitPress('2')}
              >
                <Text style={styles.buttonText}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleDigitPress('3')}
              >
                <Text style={styles.buttonText}>3</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleOperatorPress('-')}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleDigitPress('0')}
              >
                <Text style={styles.buttonText}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleOperatorPress('.')}
              >
                <Text style={styles.buttonText}>.</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={this.handleEqualsPress}
              >
                <Text style={styles.buttonText}>=</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleOperatorPress('+')}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleOperatorPress('(')}
              >
                <Text style={styles.buttonText}>(</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleOperatorPress(')')}
              >
                <Text style={styles.buttonText}>)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleOperatorPress('%')}
              >
                <Text style={styles.buttonText}>%</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleOperatorPress('√')}
              >
                <Text style={styles.buttonText}>√</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={styles.buttonRow}></View> */}
              <TouchableOpacity
                style={[styles.button, styles.buttonClear]}
                onPress={this.handleClearPress}
              >
                <Text style={[styles.buttonText, styles.buttonClearText]}>C</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        );
  }
}

        const styles = StyleSheet.create({
          container: {
          flex: 1,
        padding: 20,
  },
        darkContainer: {
          backgroundColor: '#333333',
  },
        toggleModeButton: {
          position: 'absolute',
        top: 44,
        right: 17,
        padding: 10,
        backgroundColor: '#4dc0b5',
        borderRadius: 5,
  },
        calculatorContainer: {
          marginTop: 190,
    
  },
        display: {
          fontSize: 40,
        color: '#333333',
        borderWidth: 5,
        borderColor: '#4dc0b5',
        borderRadius: 15,
        marginBottom: 20,
        textAlign: 'right',
        paddingRight: 20,
  },
        darkDisplay: {
          color: '#ffffff',
  },
        buttonRow: {

          flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
  },
        button: {

          backgroundColor: '#4dc0b5',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: 80,
  },
        buttonText: {
          fontSize: 24,
        color: '#fff',
  },
        buttonClear: {
          backgroundColor: '#ff6666',
  },
        buttonClearText: {
          color: '#fff',
  },
});
