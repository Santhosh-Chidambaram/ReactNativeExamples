import {View, Text} from 'react-native-ui-lib';
import React, {useEffect, useRef, useState} from 'react';

import {Dimensions, FlatList, ScrollView} from 'react-native';
import ScreenLayout from '@/containers/ScreenLayout';
import TableColumnData from './data/TableColumnData';
import {Colors} from '@/constants/Colors';
import {TableHeader, TableCellRenderer} from './components';
import LISTINGS from './data/listings.json';
const ROW_WIDTH = Math.floor(Dimensions.get('screen').width / 3);

function handleInfinityScroll(event) {
  let mHeight = event.nativeEvent.layoutMeasurement.height;
  let cSize = event.nativeEvent.contentSize.height;
  let Y = event.nativeEvent.contentOffset.y;
  if (Math.ceil(mHeight + Y) >= cSize) {
    return true;
  }
  return false;
}

const ComparsionExampleContainer = () => {
  const scrollRef = useRef();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [headerPositions, setHeaderPositions] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const handleMeasureLayout = (label, e) => {
    const {y} = e.nativeEvent.layout;
    if (y) {
      setHeaderPositions(prevHeaderPositions => ({
        ...prevHeaderPositions,
        [label]: y,
      }));
    }
  };

  const onVerticalScroll = e => {
    let scrollY = e.nativeEvent.contentOffset.y;

    if (scrollY === 0 && activeTab !== 'overview') {
      setActiveTab('overview');
    } else if (handleInfinityScroll(e) && activeTab !== 'approvals') {
      setActiveTab('approvals');
    } else if (scrollY + 100 >= headerPositions.features) {
      setActiveTab('features');
    } else if (
      scrollY >= headerPositions.pricing &&
      scrollY <= headerPositions.features &&
      activeTab !== 'pricing'
    ) {
      setActiveTab('pricing');
    } else {
    }
  };

  const RenderTableColumnHeader = TableColumnData.columns.map((col, idx) => {
    const isTableSectionHeader = TableColumnData.headers[col.value];
    const bgColor = isTableSectionHeader
      ? Colors.tableColumn
      : idx % 2 === 0
      ? Colors.tableRow1
      : Colors.tableRow2;

    return (
      <View
        height={col.value === 'start' ? 150 : 50}
        key={col.value}
        backgroundColor={bgColor}
        centerV
        paddingL-10
        onLayout={e => handleMeasureLayout(col.value, e)}>
        {col.value !== 'end' && (
          <Text style={{fontWeight: 'bold', fontSize: 14}}>{col.label}</Text>
        )}
      </View>
    );
  });

  const renderComparisonItem = _ => {
    return (
      <View flex-1>
        <View flex-1 row>
          <View width={ROW_WIDTH}>{RenderTableColumnHeader}</View>
          <View flex-1>
            <ScrollView horizontal>
              {LISTINGS.map((listing, idx) => {
                return (
                  <TableCellRenderer listing={listing} key={idx + 'listing'} />
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  };
  return (
    <ScreenLayout>
      <View flex-1 bg-white>
        {/* <Navbar title="Compare" /> */}
        <TableHeader
          activeTab={activeTab}
          headerPositions={headerPositions}
          scrollRef={scrollRef}
          setActiveTab={setActiveTab}
        />

        <FlatList
          ref={scrollRef}
          data={[0]}
          renderItem={renderComparisonItem}
          onScroll={onVerticalScroll}
        />
      </View>
    </ScreenLayout>
  );
};

export default ComparsionExampleContainer;
