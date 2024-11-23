import { useAppDispatch, useAppSelector } from '@/app/hooks';
import InfoTokenShower from '@/app/screens/show-full-screen-info';
import { addCustomToken, InfoToken, selectCustomTokens, selectDefaultTokens } from '@/app/state/info-tokens-slice';
import { baseModalCloseButton, baseModalContainer, baseModalContent, baseModalScroll } from '@/app/styles/modals';
import { COLOR_CONTAINER_COLORS, colorContainer, ColorContainerType, onColorContainer } from '@/constants/colors';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import {
  Button,
  Divider,
  Icon,
  IconButton,
  MD3Theme,
  Modal,
  Portal,
  Surface,
  Text,
  TextInput,
  TouchableRipple,
  withTheme,
} from 'react-native-paper';
import { Dropdown, DropdownInputProps, DropdownItemProps } from 'react-native-paper-dropdown';

interface InfoTokensProps {
  visible: boolean;
  onDismiss: () => void;
  theme: MD3Theme;
}

function InfoTokens({ visible, onDismiss, theme }: InfoTokensProps) {
  const dispatch = useAppDispatch();
  const defaultTokens = useAppSelector(state => selectDefaultTokens(state.infoTokens));
  const customTokens = useAppSelector(state => selectCustomTokens(state.infoTokens));

  const styles = StyleSheet.create({
    modalContainer: baseModalContainer(theme),
    modalContent: {
      ...baseModalContent(theme),
      alignItems: 'center',
      gap: 16,
    },
    modalScroll: {
      ...baseModalScroll(theme),
      backgroundColor: theme.colors.surface,
      gap: 24,
    },
    newCustomContainer: {
      flexDirection: 'row',
      gap: 8,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tokenButtons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 12,
      width: '100%',
    },
    closeButton: baseModalCloseButton(theme),
    infoButton: {
      minHeight: 64,
      minWidth: 64,
      justifyContent: 'center',
    },
    showModalBackgroundImageStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
  });

  /** Whether a new custom token is being added. Shows a text input in this state. */
  const [addingNewCustom, setAddingNewCustom] = useState(false);
  const showNewCustom = () => setAddingNewCustom(true);
  const hideNewCustom = () => {
    setAddingNewCustom(false);
    setNewCustom(undefined);
    setNewCustomColor('deepPurple');
  };

  const [newCustom, setNewCustom] = useState<string>();
  const [newCustomColor, setNewCustomColor] = useState<ColorContainerType>('deepPurple');
  const saveNewCustom = () => {
    if (newCustom && newCustom.length > 0) {
      dispatch(addCustomToken({
        text: newCustom,
        color: newCustomColor,
        showCharacters: false,
      }));
    }
    hideNewCustom();
  };

  /**
   * Whether a token is being shown in the full-screen show page.
   * Also, whether the current shown token is a custom token.
   */
  const [showingInfoVisible, setShowingInfoVisible] = useState(false);
  const [showingInfoIsCustom, setShowingInfoIsCustom] = useState(false);
  const showInfo = (custom = false) => {
    setShowingInfoVisible(true);
    setShowingInfoIsCustom(custom);
  };
  const hideInfo = () => setShowingInfoVisible(false);
  const [showingInfo, setShowingInfo] = useState<InfoToken>();

  const COLOR_OPTIONS = COLOR_CONTAINER_COLORS.map(color => ({
    label: color,
    value: color,
  }));

  const ColorDropdownItem = ({
                               width,
                               option,
                               onSelect,
                               toggleMenu,
                               isLast,
                             }: DropdownItemProps) => {
    const style: ViewStyle = useMemo(
      () => ({
        alignItems: 'center',
        backgroundColor: colorContainer(theme.dark, option.value),
        height: 50,
        justifyContent: 'center',
        width,
      }),
      [option.value, width],
    );

    return (
      <View testID={`color-dropdown-item-${option.value}`}>
        <TouchableRipple
          onPress={() => {
            onSelect?.(option.value);
            toggleMenu();
          }}
        >
          <View style={style}>
            <Icon size={40} color={onColorContainer(theme.dark, option.value)} source="format-color-text"/>
          </View>
        </TouchableRipple>
        {!isLast && <Divider/>}
      </View>
    );
  };

  const ColorDropdownInput = ({ selectedLabel, rightIcon }: DropdownInputProps) => {
    const style: ViewStyle = useMemo(
      () => ({ backgroundColor: colorContainer(theme.dark, selectedLabel), width: 80 }),
      [selectedLabel],
    );
    return <TextInput mode="flat"
                      style={style}
                      textColor={'red'}
                      right={rightIcon}>
      <Icon size={24} source="palette" color={onColorContainer(theme.dark, selectedLabel)}/>
    </TextInput>;
  };

  const renderTokenButton = (custom: boolean) => {
    function TokenButton(info: InfoToken, idx: number) {
      const background = colorContainer(theme.dark, info.color);
      const foreground = onColorContainer(theme.dark, info.color);
      return (
        <Button
          key={`info-token-button-${idx}`}
          mode="contained"
          labelStyle={theme.fonts.bodyLarge}
          contentStyle={styles.infoButton}
          buttonColor={background}
          textColor={foreground}
          rippleColor={foreground}
          icon={() => (
            <Icon source={info.icon} size={32} color={foreground}/>
          )}
          onPress={() => {
            setShowingInfo(info);
            showInfo(custom);
          }}>
          {info.text}
        </Button>
      );
    }

    return TokenButton;
  };

  const defaultInfoTokenButtons = defaultTokens.map(renderTokenButton(/* custom= */ false));
  const customInfoTokenButtons = customTokens.map(renderTokenButton(/* custom= */ true));

  return (
    <Portal>
      <Modal visible={visible}
             onDismiss={onDismiss}
             style={styles.modalContainer}
             contentContainerStyle={styles.modalContent}>
        <Text variant="headlineLarge">Info Tokens</Text>

        <ScrollView>
          <Surface style={styles.modalScroll}>
            <View style={styles.tokenButtons}>
              {defaultInfoTokenButtons}
            </View>
            <Divider style={{ width: '100%' }}/>
            {
              customInfoTokenButtons.length > 0 ?
                <View style={styles.tokenButtons}>
                  {customInfoTokenButtons}
                </View> :
                null
            }
            <View style={styles.tokenButtons}>
              {
                addingNewCustom ?
                  <View style={styles.newCustomContainer}>
                    <TextInput style={{ flex: 1 }}
                               value={newCustom}
                               onChangeText={setNewCustom}
                               onSubmitEditing={saveNewCustom}
                               placeholder="New custom info token"
                               testID="custom-token-text"/>
                    <Dropdown hideMenuHeader
                              options={COLOR_OPTIONS}
                              value={newCustomColor}
                              onSelect={value => value && setNewCustomColor(value as ColorContainerType)}
                              CustomDropdownInput={ColorDropdownInput}
                              CustomDropdownItem={ColorDropdownItem}
                              testID="color-dropdown"/>
                    <IconButton icon="check"
                                mode="contained"
                                disabled={(newCustom ?? '').length === 0}
                                onPress={saveNewCustom}
                                testID="save-custom-token"/>
                    <IconButton icon="close"
                                mode="contained"
                                onPress={hideNewCustom}
                                containerColor={theme.colors.errorContainer}
                                iconColor={theme.colors.onErrorContainer}
                                testID="cancel-custom-token"/>
                  </View> :
                  <Button icon="plus" mode="outlined" onPress={showNewCustom}>Add custom</Button>
              }
            </View>
          </Surface>
        </ScrollView>

        <IconButton
          icon="close"
          mode="contained"
          containerColor={theme.colors.errorContainer}
          iconColor={theme.colors.onErrorContainer}
          style={styles.closeButton}
          onPress={onDismiss}
          testID="close-info-tokens"/>
      </Modal>

      <InfoTokenShower visible={showingInfoVisible}
                       infoToken={showingInfo}
                       custom={showingInfoIsCustom}
                       onDismiss={hideInfo}/>
    </Portal>
  );
}

export default withTheme(InfoTokens);
