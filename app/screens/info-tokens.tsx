import Character from '@/app/components/character';
import Token from '@/app/components/token';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import CharacterSelect from '@/app/screens/character-select';
import { selectEdition } from '@/app/state/grim-slice';
import {
  addCustomToken,
  InfoToken,
  removeCustomToken,
  selectCustomTokens,
  selectDefaultTokens,
} from '@/app/state/info-tokens-slice';
import { baseModalCloseButton, baseModalContainer, baseModalContent, baseModalScroll } from '@/app/styles/modals';
import CharacterId from '@/constants/characters/character-id';
import { getCharacterById } from '@/constants/characters/characters';
import { COLOR_CONTAINER_COLORS, colorContainer, ColorContainerType, onColorContainer } from '@/constants/colors';

import _ from 'lodash';
import React, { useMemo, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, TextStyle, useWindowDimensions, View, ViewStyle } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  Button,
  Divider,
  FAB,
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

  const edition = useAppSelector(state => selectEdition(state.grim));

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
    showInfoCloseButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      borderWidth: 2,
      borderColor: theme.colors.outline,
    },
    deleteCustomInfoButton: {
      position: 'absolute',
      bottom: 20,
      left: 20,
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
  const hideInfo = () => {
    clearShowingCharacters();
    setShowingInfoVisible(false);
  };
  const [showingInfo, setShowingInfo] = useState<InfoToken>();

  /** Handling removing custom info tokens with bottom-left FAB. */
  const removeCustomInfoToken = () => {
    showingInfo && dispatch(removeCustomToken(showingInfo));
    hideInfo();
  };

  /** Whether the character select modal is visible, for showing characters on the full-screen token show page. */
  const [characterSelectVisible, setCharacterSelectVisible] = useState(false);
  const showCharacterSelect = () => setCharacterSelectVisible(true);
  const hideCharacterSelect = () => setCharacterSelectVisible(false);

  // Which characters are being shown currently?
  const [showingCharacters, setShowingCharacters] = useState<CharacterId[]>([]);
  const addShowingCharacter = (character: CharacterId) => setShowingCharacters([...showingCharacters, character]);
  const removeShowingCharacter = (idx: number) => setShowingCharacters([
    ..._.take(showingCharacters, idx),
    ..._.drop(showingCharacters, idx + 1),
  ]);
  const clearShowingCharacters = () => setShowingCharacters([]);

  const containerImage = showingCharacters.length > 0 ? require('@/assets/images/info-token/info-token-container-tall.webp') : require('@/assets/images/info-token/info-token-container.webp');
  const containerBackgroundImage = showingCharacters.length > 0 ? require('@/assets/images/info-token/info-token-container-tall-bg.webp') : require('@/assets/images/info-token/info-token-container-bg.webp');

  const showingInfoBackground = colorContainer(theme.dark, showingInfo?.color);
  const showingInfoForeground = onColorContainer(theme.dark, showingInfo?.color);

  const showModalStyle: ViewStyle | null = (!!showingInfo ? {
    backgroundColor: showingInfoBackground,
  } : null);
  const showModalContentStyle: ViewStyle | null = (!!showingInfo ? {
    alignItems: 'center',
    gap: 32,
    height: '100%',
  } : null);
  const showModalTextStyle: TextStyle | null = (!!showingInfo ? {
    color: showingInfoForeground,
    textAlign: 'center',
    marginHorizontal: 64,
    maxHeight: 350,
    fontFamily: 'NewRocker-Regular',
  } : null);

  const COLOR_OPTIONS = COLOR_CONTAINER_COLORS.map(color => ({
    label: color,
    value: color,
  }));

  const ColorDropdownItem = ({
                               width,
                               option,
                               value,
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
      [option.value, theme, value, width],
    );

    return (
      <View>
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

  const ColorDropdownInput = ({ placeholder, selectedLabel, rightIcon }: DropdownInputProps) => {
    const style: ViewStyle = useMemo(
      () => ({ backgroundColor: colorContainer(theme.dark, selectedLabel), width: 80 }),
      [selectedLabel, theme],
    );
    return <TextInput mode="flat"
                      style={style}
                      textColor={'red'}
                      right={rightIcon}>
      <Icon size={24} source="palette" color={onColorContainer(theme.dark, selectedLabel)}/>
    </TextInput>;
  };

  const renderTokenButton = (custom: boolean) => (info: InfoToken, idx: number) => {
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
  };

  const defaultInfoTokenButtons = defaultTokens.map(renderTokenButton(/* custom= */ false));
  const customInfoTokenButtons = customTokens.map(renderTokenButton(/* custom= */ true));

  // Turns out packing squares into a rectangle is NP-hard. Who knew?
  // A friend who is smarter than me says "I believe that reduces to the knapsack problem".
  // Oh well, here is an approximation that works pretty good with numbers up to ~10.
  const { width, height } = useWindowDimensions();
  const tokenSize = 0.44 * Math.sqrt(width * height / showingCharacters.length);
  const showingCharacterTokens = showingCharacters.map((characterId, idx) => {
    const characterData = getCharacterById(characterId);
    return (
      <View key={`show-character-token-${idx}`} style={{ width: tokenSize, height: tokenSize }}>
        <Token
          fixed
          size={tokenSize}
          tokenStyle={{ aspectRatio: 1 }}
          centerContent={
            <Character character={characterData} team={characterData.team}/>
          }
          bottomText={characterData.name}
          onPress={() => removeShowingCharacter(idx)}/>
      </View>
    );
  });

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
                               placeholder="New custom info token"/>
                    <Dropdown hideMenuHeader
                              options={COLOR_OPTIONS}
                              value={newCustomColor}
                              onSelect={value => value && setNewCustomColor(value as ColorContainerType)}
                              CustomDropdownInput={ColorDropdownInput}
                              CustomDropdownItem={ColorDropdownItem}/>
                    <IconButton icon="check"
                                mode="contained"
                                disabled={(newCustom ?? '').length === 0}
                                onPress={saveNewCustom}/>
                    <IconButton icon="close"
                                mode="contained"
                                onPress={hideNewCustom}
                                containerColor={theme.colors.errorContainer}
                                iconColor={theme.colors.onErrorContainer}/>
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

      <Modal
        visible={showingInfoVisible}
        dismissable={false}
        dismissableBackButton={true}
        onDismiss={hideInfo}
        style={showModalStyle}
        contentContainerStyle={showModalContentStyle}>
        <ImageBackground
          source={require('@/assets/images/info-token/info-token-background.png')}
          style={{ alignItems: 'center', height: '100%', width: '100%' }}
          imageStyle={{ opacity: 0.33, resizeMode: 'repeat' }}
          fadeDuration={0}>
          <ImageBackground
            source={containerBackgroundImage}
            style={{ alignItems: 'center', height: '100%', width: '95%' }}
            imageStyle={{ resizeMode: 'contain', width: '100%' }}
            tintColor={showingInfoBackground}>
            <ImageBackground
              source={containerImage}
              style={{ alignItems: 'center', height: '100%', justifyContent: 'center', width: '100%' }}
              imageStyle={{ resizeMode: 'contain', width: '100%' }}>
              <View style={{ alignItems: 'center', padding: 64, position: 'relative', gap: 12 }}>
                <Icon source={showingInfo?.icon} size={128}/>
                <Text variant="displayLarge" style={showModalTextStyle} adjustsFontSizeToFit>{showingInfo?.text}</Text>
                <GestureHandlerRootView style={{ flex: 0, alignItems: 'center', gap: 12 }}>
                  <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 12,
                    justifyContent: 'center',
                  }}>
                    {showingCharacterTokens}
                  </View>
                  {
                    showingInfo?.showCharacters ?
                      <IconButton icon="plus" mode="contained" size={64} onPress={showCharacterSelect}/> : null
                  }
                </GestureHandlerRootView>
              </View>
            </ImageBackground>
          </ImageBackground>
        </ImageBackground>
        <FAB
          mode="elevated"
          icon="eye-off"
          onPress={hideInfo}
          size="large"
          style={styles.showInfoCloseButton}/>
        {
          showingInfoIsCustom ?
            <FAB
              mode="flat"
              icon="delete-outline"
              onPress={removeCustomInfoToken}
              size="medium"
              style={styles.deleteCustomInfoButton}/> :
            null
        }
      </Modal>

      <CharacterSelect
        visible={characterSelectVisible}
        edition={edition}
        onSelect={character => {
          addShowingCharacter(character);
          hideCharacterSelect();
        }}
        onDismiss={hideCharacterSelect}/>
    </Portal>
  );
}

export default withTheme(InfoTokens);
