import * as React from "react";
import { Text, Searchbar } from "react-native-paper";
var dict = {
  A1: ["#001", "#002"],
  A2: ["#009", "#016"],
  A3: ["#005", "#013"],
  B1: ["#102", "#222"],
  C1: ["#666", "#004"],
};

export default class MyComponent extends React.Component {
  state = {
    searchQuery: "",
    lugar: null,
  };

  render() {
    const { searchQuery } = this.state;
    const { lugar } = this.state;

    return (
      <>
        <Searchbar
          placeholder="Buscar item"
          onChangeText={(query) => {
            this.setState({ searchQuery: query });
            for (const [key, value] of Object.entries(dict)) {
              if (value.includes(query)) {
                this.setState({ lugar: key });

                return;
              } else {
                this.setState({ lugar: null });
              }
            }
          }}
          value={searchQuery}
        />
        {lugar && <Text>{lugar}</Text>}
      </>
    );
  }
}
