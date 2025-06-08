import React, {useState, useMemo, useEffect, use} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DataTable, TextInput, TouchableRipple} from 'react-native-paper';
import {useThemeContext} from '../../context/ThemeContext';

type Column<T> = {
  key: keyof T;
  label: string;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  onEdit: (item: T) => void;
  searchPlaceholder?: string;
};

export default function MainTable<T extends Record<string, any>>({
  data,
  columns,
  onEdit,
  searchPlaceholder = 'Buscar...',
}: Props<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([10, 25, 50, 100]);
  const [itemsPerPage, setItemsPerPage] = useState(numberOfItemsPerPageList[0]);

  // Filtrado por búsqueda
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const lower = searchTerm.toLowerCase();
    return data.filter(item =>
      columns.some(col =>
        String(item[col.key] ?? '')
          .toLowerCase()
          .includes(lower),
      ),
    );
  }, [searchTerm, data, columns]);

  // Paginación
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, filteredData.length);
  const paginatedData = filteredData.slice(from, to);

  // Resetear página si cambia el filtro o items por página
  useEffect(() => {
    setPage(0);
  }, [searchTerm, itemsPerPage]);

  const styles = stylesC();

  return (
    <View>
      {/* Search */}
      <TextInput
        mode="outlined"
        label="Buscar"
        style={styles.input}
        outlineStyle={styles.inputOutline}
        placeholder={searchPlaceholder}
        onChangeText={setSearchTerm}
        value={searchTerm}
        left={<TextInput.Icon icon="account-search" />}
      />
      {/* Table */}
      <DataTable style={styles.table}>
        {/* Header */}
        <DataTable.Header style={styles.row}>
          {columns.map(column => (
            <DataTable.Title
              key={String(column.key)}
              // sortDirection={'descending'}
              style={styles.cell}>
              <Text style={styles.label}>{column.label}</Text>
            </DataTable.Title>
          ))}
        </DataTable.Header>
        {/* Data */}
        {paginatedData.map((item, idx) => (
          <DataTable.Row
            key={item.id ?? idx}
            onPress={() => onEdit(item)}
            style={styles.row}>
            {columns.map(column => (
              <DataTable.Cell key={String(column.key)}>
                <Text style={styles.cell}>
                  {String(item[column.key] ?? '')}
                </Text>
              </DataTable.Cell>
            ))}
          </DataTable.Row>
        ))}
        {/* Pagination */}
        <DataTable.Pagination
          style={styles.pagination}
          page={page}
          numberOfPages={Math.max(
            1,
            Math.ceil(filteredData.length / itemsPerPage),
          )}
          onPageChange={setPage}
          label={
            <Text style={styles.paginationLabel}>
              {`${from + 1}-${to} de ${filteredData.length}`}
            </Text>
          }
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          showFastPaginationControls
          selectPageDropdownLabel={
            <Text style={styles.paginationLabel}>{'Filas por página'}</Text>
          }
        />
      </DataTable>
    </View>
  );
}

const stylesC = () => {
  const {
    theme: {colors},
  } = useThemeContext();

  return StyleSheet.create({
    table: {
      borderWidth: 1,
      borderColor: colors.outline,
      marginBottom: 10,
      borderRadius: 10,
      overflow: 'hidden',
    },
    input: {
      marginBottom: 10,
      paddingHorizontal: 10,
      backgroundColor: colors.surface,
    },
    inputOutline: {
      borderRadius: 50,
      borderColor: 'green',
      borderWidth: 2,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: colors.surfaceVariant,
      paddingVertical: 10,
    },
    label: {
      color: colors.onSurface,
      fontSize: 15,
      fontWeight: 'bold',
    },
    cell: {
      flex: 1,
      color: colors.onBackground,
      justifyContent: 'center',
      textAlign: 'center',
    },
    pagination: {
      color: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paginationLabel: {
      color: colors.tertiary,
    },
  });
};
