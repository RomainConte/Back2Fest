import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
  Image,
} from 'react-native';


class SettingsList extends React.Component {
  constructor(props) {
    super(props);
    this.scrollViewRef = React.createRef();
  }

  static propTypes = {
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    defaultItemSize: PropTypes.number,
    underlayColor: PropTypes.string,
    defaultTitleStyle: PropTypes.any,
    defaultTitleInfoPosition: PropTypes.string,
    scrollViewProps: PropTypes.object,
  };

  static defaultProps ={
    backgroundColor: 'white',
    borderColor: 'black',
    defaultItemSize: 50,
    underlayColor: 'transparent',
    defaultTitleStyle: {fontSize: 16}
  };

  _getGroups(){
    var groupNumber = -1;
    let headers = [];
    let itemGroup = [];
    let result = [];
    React.Children.forEach(this.props.children, (child) => {
      // Allow for null, optional fields
      if(!child) return;

      if(child.type.displayName === 'Header'){
        if(groupNumber != -1){
          result[groupNumber] = {items: itemGroup, header: headers[groupNumber] };
          itemGroup = [];
        }
        groupNumber++;
        headers[groupNumber] = child.props;
      } else if(child.type.displayName === 'Item'){
        if(groupNumber == -1){
          groupNumber++;
        }
        itemGroup.push(child.props);
      } else {
        if(groupNumber == -1){
          groupNumber++;
        }
        itemGroup.push(child);
      }
    });
    result[groupNumber] = {items: itemGroup, header: headers[groupNumber] };
    return result;
  }

  render(){
    return (
      <ScrollView {...this.props.scrollViewProps} ref={this.scrollViewRef}>
        {this._getGroups().map((group, index) => {
          return this._groupView(group, index);
        })}
      </ScrollView>
    )
  }

  _groupView(group, index){
    if(group.header){
      return (
        <View key={'group_' + index}>
          <Text style={[{margin:5},group.header.headerStyle]} numberOfLines={group.header.headerNumberOfLines} ellipsizeMode="tail" ref={group.header.headerRef}>{group.header.headerText}</Text>
          <View style={{borderTopWidth:1, borderBottomWidth:1, borderColor: this.props.borderColor}}>
            {group.items.map((item, index) => {
              return this._itemView(item,index, group.items.length);
            })}
          </View>
        </View>
      )
    } else {
      let items;
      if (group.items.length > 0) {
        items = (
          <View style={{borderTopWidth:1, borderBottomWidth:1, borderColor: this.props.borderColor}}>
            {group.items.map((item, index) => {
              return this._itemView(item,index, group.items.length);
            })}
          </View>
        );
      }

      return (
        <View key={'group_' + index}>
          {items}
        </View>
      )
    }
  }

  _itemEditableBlock(item, index, position) {

    return ([
        <Text
            key={'itemTitle_' + index}
            style={[
              item.titleStyle ? item.titleStyle : this.props.defaultTitleStyle,
              position === 'Bottom' ? null : styles.titleText
            ]}>
            {item.title}
        </Text>,
        item.isEditable ?
        <TextInput
              key={item.id}
              style={item.editableTextStyle ? item.editableTextStyle : styles.editableText}
              placeholder = {item.placeholder}
              onChangeText={(text) => item.onTextChange(text)}
              value={item.value} />
        : null
    ])
  }

  _itemTitleBlock(item, index, position) {
    return ([
      <Text
          key={'itemTitle_' + index}
          style={[
            item.titleStyle ? item.titleStyle : this.props.defaultTitleStyle,
            position === 'Bottom' ? null : styles.titleText
          ]}>
          {item.title}
      </Text>,
      item.titleInfo ?
        <Text
            key={'itemTitleInfo_' + index}
            style={[
              item.rightSideStyle ? item.rightSideStyle
              :
                position === 'Bottom' ? null : styles.rightSide,
                {color: '#B1B1B1'},
              item.titleInfoStyle
            ]}>
            {item.titleInfo}
        </Text>
        : null
    ])
  }

  _itemView(item, index, max){
    var border;

    if (item.type && item.type.displayName) {
        return item;
    }

    if(item.borderHide) {
      switch(item.borderHide) {
        case 'Top' : border = {borderBottomWidth:1, borderColor: this.props.borderColor}; break;
        case 'Bottom' : border = {borderTopWidth:1, borderColor: this.props.borderColor}; break;
      }
    } else {
      border = index === max-1 ? {borderWidth:0} : {borderBottomWidth:1, borderColor: this.props.borderColor};
    }

    let titleInfoPosition = item.titleInfoPosition ? item.titleInfoPosition : this.props.defaultTitleInfoPosition;

    return (
      <TouchableHighlight accessible={false} key={'item_' + index} underlayColor={item.underlayColor ? item.underlayColor : this.props.underlayColor} onPress={item.onPress} onLongPress={item.onLongPress} ref={item.itemRef}>
        <View style={item.itemBoxStyle ? item.itemBoxStyle : [styles.itemBox, {backgroundColor: item.backgroundColor ? item.backgroundColor : this.props.backgroundColor}]}>
          {item.icon}
          {item.isAuth ?
            <View style={item.titleBoxStyle ? item.titleBoxStyle : [styles.titleBox, border]}>
              <View style={{paddingLeft:5,flexDirection:'column',flex:1}}>
                <View style={{borderBottomWidth:1,borderColor:this.props.borderColor}}>
                  <TextInput
                    ref="UserNameInputBlock"
                    onSubmitEditing={() => this.refs.PasswordInputBlock.focus()}
                    style={{flex:1,height:30, borderBottomWidth:1}}
                    placeholder = "username"
                    {...item.authPropsUser}
                  />
                </View>
                <View>
                  <TextInput
                    ref="PasswordInputBlock"
                    style={{flex:1,height:30}}
                    placeholder = "password"
                    secureTextEntry={true}
                    returnKeyType={'go'}
                    {...item.authPropsPW}
                    onSubmitEditing={() => item.onPress()}
                  />
                </View>
              </View>
            </View>
          :
          <View style={item.titleBoxStyle ? item.titleBoxStyle : [styles.titleBox, border, {minHeight:item.itemWidth ? item.itemWidth : this.props.defaultItemSize}]}>
            {titleInfoPosition === 'Bottom' ?
                <View style={{flexDirection:'column',flex:1,justifyContent:'center'}}>
                    {item.isEditable ? this._itemEditableBlock(item, index, 'Bottom') : this._itemTitleBlock(item, index, 'Bottom')}
                </View>
              : item.isEditable ? this._itemEditableBlock(item, index) : this._itemTitleBlock(item, index)}

            {item.rightSideContent ? item.rightSideContent : null}
            {item.hasSwitch ?
              <Switch
                {...item.switchProps}
                style={styles.rightSide}
                onValueChange={(value) => item.switchOnValueChange(value)}
                value={item.switchState}/>
                : null}
            {this.itemArrowIcon(item)}
          </View>
        }
        </View>
      </TouchableHighlight>
    )
  }

  itemArrowIcon(item) {
    if(item.arrowIcon) {
        return item.arrowIcon;
    }

    if(item.hasNavArrow){
        return <Image style={[styles.rightSide, item.arrowStyle]} source={ARROW_ICON} />;
    }

    return null;
  }
}

export default SettingsList;

const styles = StyleSheet.create({
  itemBox: {
    flex:1,
    justifyContent:'center',
    flexDirection:'row'
  },
  titleBox: {
    flex:1,
    marginLeft:15,
    flexDirection:'row'
  },
  titleText: {
    flex:1,
    alignSelf:'center'
  },
  rightSide: {
    marginRight:15,
    alignSelf:'center'
  },
  editableText: {
    flex: 1,
    textAlign: 'right',
    marginRight: 15
  }
});

/**
 * Optional Header for groups
 */
SettingsList.Header = createReactClass({
  propTypes: {
    headerText: PropTypes.string,
    headerStyle: PropTypes.any,
    headerRef: PropTypes.func,
    headerNumberOfLines: PropTypes.number,
  },
  getDefaultProps() {
    return {
      headerNumberOfLines: 1,
    };
  },
  /**
   * not directly rendered
   */
  render(){
    return null;
  }
});

/**
 * Individual Items in the Settings List
 */
SettingsList.Item = createReactClass({
  propTypes: {
    title: PropTypes.string,
    titleStyle: PropTypes.any,
    icon: PropTypes.node,
    itemBoxStyle : PropTypes.any,
    titleBoxStyle: PropTypes.any,
    rightSideStyle: PropTypes.any,
    editableTextStyle: PropTypes.any,
    itemWidth: PropTypes.number,
    isAuth: PropTypes.bool,
    authPropsUser: PropTypes.object,
    authPropsPW: PropTypes.object,
    backgroundColor: PropTypes.string,
    underlayColor: PropTypes.string,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    hasNavArrow: PropTypes.bool,
    arrowIcon: PropTypes.node,
    arrowStyle: PropTypes.any,
    hasSwitch: PropTypes.bool,
    switchState: PropTypes.bool,
    switchProps: PropTypes.object,
    switchOnValueChange: PropTypes.func,
    titleInfo: PropTypes.string,
    titleInfoStyle: PropTypes.any,
    titleInfoPosition: PropTypes.string,
    rightSideContent: PropTypes.node,
    borderHide: PropTypes.oneOf(['Top', 'Bottom', 'Both']),
    itemRef: PropTypes.func,
  },
  getDefaultProps(){
    return {
      hasNavArrow: true
    }
  },
  /**
   * not directly rendered
   */
  render(){
    return null;
  },
});
