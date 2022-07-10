import {View, Text, Image} from 'react-native-ui-lib';
import React from 'react';
import {
  PricingAndMeasurementsKeys,
  PropertyApprovalKeys,
  PropertyDetailsKeys,
  PropertyFeaturesKeys,
} from '../data/TableCellKeys';
import {Dimensions} from 'react-native';
import {Colors} from '@/constants/Colors';
const ROW_WIDTH = Math.floor(Dimensions.get('screen').width / 3);

const TableCellRenderer = props => {
  const {listing} = props;

  const renderTitleRow = (
    <View height={50} backgroundColor={'rgba(215, 215, 215, 1)'} />
  );

  const RenderPropertyDetails = (
    <View>
      {PropertyDetailsKeys.map((pdKey, idx) => {
        const isEven = idx % 2 == 0;
        if (listing.property_details[pdKey]) {
          return (
            <View
              height={50}
              center
              padding-5
              backgroundColor={isEven ? Colors.tableRow1 : Colors.white}>
              <Text numberOfLines={2} textDark>
                {listing.property_details[pdKey]}
              </Text>
            </View>
          );
        }
        return (
          <View
            height={50}
            center
            backgroundColor={isEven ? Colors.tableRow1 : Colors.white}>
            <Text>-</Text>
          </View>
        );
      })}
      {renderTitleRow}
    </View>
  );

  const RenderPricingAndMeasurements = (
    <View>
      {PricingAndMeasurementsKeys.map((pdKey, idx) => {
        const isEven = idx % 2 == 0;
        if (listing.pricing_and_measurements[pdKey]) {
          return (
            <View
              height={50}
              center
              padding-5
              backgroundColor={isEven ? Colors.tableRow1 : Colors.white}>
              <Text textDark>
                {pdKey === 'total_price'
                  ? listing.pricing_and_measurements.total_price.start_price
                  : listing.pricing_and_measurements[pdKey]}
              </Text>
            </View>
          );
        }
        return (
          <View
            height={50}
            center
            backgroundColor={isEven ? Colors.tableRow1 : Colors.white}>
            <Text>-</Text>
          </View>
        );
      })}
      {renderTitleRow}
    </View>
  );

  const RenderPropertyFeatures = (
    <View>
      {PropertyFeaturesKeys.map((pfKey, idx) => {
        const isEven = idx % 2 == 0;
        if (listing.property_features[pfKey] !== undefined) {
          return (
            <View
              height={50}
              center
              padding-5
              backgroundColor={isEven ? Colors.tableRow1 : Colors.white}>
              <Text textDark>
                {pfKey === 'water_supply'
                  ? listing.property_features[pfKey].map(ws => {
                      return ws + ',';
                    })
                  : typeof listing.property_features[pfKey] === 'boolean'
                  ? listing.property_features[pfKey]
                    ? 'Yes'
                    : 'No'
                  : listing.property_features[pfKey]}
              </Text>
            </View>
          );
        }
        return (
          <View
            height={50}
            center
            backgroundColor={isEven ? Colors.tableRow1 : Colors.white}>
            <Text textDark>-</Text>
          </View>
        );
      })}
      {renderTitleRow}
    </View>
  );

  const RenderPropertyApprovals = (
    <View>
      {PropertyApprovalKeys.map((paKey, idx) => {
        const isEven = idx % 2 == 0;
        if (listing.property_approvals[paKey]) {
          return (
            <View
              height={50}
              center
              padding-5
              backgroundColor={isEven ? Colors.tableRow1 : Colors.white}>
              <Text textDark>
                {paKey === 'rera_compliant'
                  ? listing.property_approvals[paKey]
                    ? 'Yes'
                    : 'No'
                  : listing.property_approvals[paKey]}
              </Text>
            </View>
          );
        }
        return (
          <View
            height={50}
            center
            backgroundColor={isEven ? Colors.tableRow1 : Colors.white}>
            <Text textDark>-</Text>
          </View>
        );
      })}
      {renderTitleRow}
    </View>
  );

  return (
    <View width={ROW_WIDTH}>
      <View height={150} center padding-5>
        <Image
          source={{uri: listing.photos[0]}}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            width: 100,
            height: 70,
            borderRadius: 5,
            resizeMode: 'cover',
          }}
        />
        <Text numberOfLines={2} marginT-10 textDark>
          {listing.title}
        </Text>
      </View>
      {RenderPropertyDetails}
      {RenderPricingAndMeasurements}
      {RenderPropertyFeatures}
      {RenderPropertyApprovals}
    </View>
  );
};

export default TableCellRenderer;
