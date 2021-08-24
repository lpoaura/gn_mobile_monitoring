import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { ATextInput } from "../ATextInput";
import { Spinner } from "../../../loadings/Spinner";
import { ListItem } from "../../list/ListItem";
import { AText } from "../../text/AText";
import { ColorsTheme } from "../../Colors.theme";
import Icon from "react-native-vector-icons/Feather";

type Props<T, TKey> = {
  onSelect: (value: T) => void;
  onClose: () => void;
  fetch: (search: string) => Promise<T[]>;
  getKeyAndLabel: (option: T) => { key: TKey; label: string };
};

export function ADataListPanel<T, TKey>({ fetch, ...props }: Props<T, TKey>) {
  const [searchedText, setSearchedText] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [options, setOptions] = React.useState<T[]>([]);

  React.useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(searchedText).then(results => {
      if (active) {
        setOptions(results);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [searchedText, fetch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.input}>
          <ATextInput value={searchedText} onChangeText={setSearchedText} placeholder="rechercher" />
        </View>
        <View style={styles.closeBtn}>
          <Icon name="x" onPress={props.onClose} size={24} color={ColorsTheme.secondaryDark} />
        </View>
      </View>
      <View>
        {loading ? (
          <Spinner />
        ) : options.length === 0 ? (
          <AText color={ColorsTheme.textOnBackground}>Aucun résultat trouvé</AText>
        ) : (
          <FlatList
            data={options}
            keyExtractor={option => props.getKeyAndLabel(option).key + ""}
            renderItem={({ item }) => {
              const { label } = props.getKeyAndLabel(item);
              return (
                <TouchableOpacity onPress={() => props.onSelect(item)}>
                  <ListItem>
                    <AText color={ColorsTheme.textOnBackground}>{label}</AText>
                  </ListItem>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    flex: 1,
  },
  closeBtn: {
    marginLeft: 10,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: ColorsTheme.separator,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
});
