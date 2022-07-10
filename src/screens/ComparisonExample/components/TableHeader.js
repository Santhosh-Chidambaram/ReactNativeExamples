import {ScrollView, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import {TouchableOpacity, View, Text, Card} from 'react-native-ui-lib';
import {Colors} from '@/constants/Colors';

const COLUMN_LABELS = [
  {
    label: 'Overview',
    name: 'overview',
  },
  {
    label: 'Pricing',
    name: 'pricing',
  },
  {
    label: 'Features',
    name: 'features',
  },
  {
    label: 'Approvals',
    name: 'approvals',
  },
];

const TableHeader = props => {
  const {headerPositions, activeTab, scrollRef} = props;

  const onPressLabel = useCallback(
    itemName => () => {
      if (itemName === 'overview') {
        scrollRef.current?.scrollToOffset({
          offset: 0,
          animated: true,
        });
      } else {
        scrollRef.current?.scrollToOffset({
          offset: headerPositions[itemName],
          animated: true,
        });
      }
    },
    [headerPositions, scrollRef],
  );

  return (
    <Card height={40} enableShadow>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {COLUMN_LABELS.map(item => {
          return (
            <TouchableOpacity
              center
              marginH-10
              onPress={onPressLabel(item.name)}>
              <Text subHeading style={{fontWeight: 'bold'}}>
                {item.label}
              </Text>
              {activeTab === item.name && <View style={styles.indicator} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Card>
  );
};

export default TableHeader;

const styles = StyleSheet.create({
  indicator: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
});
