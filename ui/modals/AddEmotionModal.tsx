import { Ionicons } from '@expo/vector-icons'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import * as EmojiFunc from '../../domains/emojis/EmojiFunc'
import { EmojiType } from '../../domains/emojis/EmojiTypes'
import TextButton, { TextButtonStyle } from '../uikit/buttons/TextButton'
import createEmojiComponent from '../uikit/emoji/createEmojiComponent'
import Modal, {
  ModalContent,
  SubtitleText,
  TitleText,
  TitleView
} from '../uikit/Modal'

const emojiList = Object.values(EmojiType)

type AddEmotionModalProps = {
  show: boolean
  filter?: (emoji: EmojiType) => boolean
  title: string
  subtitle: string
  onClose?: () => void
  onAddEmoji?: (emoji: EmojiType) => void
}

// Prepare to Refactor.... Nearly same style as AlertModal
const styles = StyleSheet.create({
  textCenterHolder: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  textHeader: {
    fontFamily: 'poppins-semibold',
    fontSize: 21
  },
  textHeaderDescription: {
    fontFamily: 'poppins-light'
  },
  footerHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 11,
    marginRight: 11
  },
  content: { marginLeft: 11 }
})

const addEmotionModalSectionStyle = StyleSheet.create({
  holder: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    width: 300,
    flexWrap: 'wrap'
  },
  emoji: {
    width: 40,
    height: 40,
    paddingLeft: 5,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5
  },
  emojiSelected: {
    borderColor: 'silver',
    borderWidth: 1
  }
})

type EmojiWrapperProps = {
  children: React.ReactNode
  selected: boolean
  onPress: () => void
}
const EmojiWrapper = ({ children, selected, onPress }: EmojiWrapperProps) => {
  const s = [
    addEmotionModalSectionStyle.emoji,
    selected ? addEmotionModalSectionStyle.emojiSelected : {}
  ]
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={s}>{children}</View>
    </TouchableWithoutFeedback>
  )
}

type AddEmotionModalSectionProps = {
  selectedEmojiType: EmojiType
  setSelectedEmojiType: (type: EmojiType) => void
  filter?: (emoji: EmojiType) => boolean
}
const AddEmotionModalSection = (props: AddEmotionModalSectionProps) => {
  const { filter } = props
  const displayEmojiList = filter ? emojiList.filter(filter) : emojiList
  const emojis = displayEmojiList.map(emojiName => {
    const Emoji = createEmojiComponent({ type: emojiName })
    return (
      <EmojiWrapper
        selected={props.selectedEmojiType === emojiName}
        onPress={() => props.setSelectedEmojiType(emojiName)}
        key={emojiName}
      >
        <Emoji />
      </EmojiWrapper>
    )
  })
  return <View style={addEmotionModalSectionStyle.holder}>{emojis}</View>
}

const EmojiText = styled.Text`
  font-family: poppins-bold;
  font-size: 25px;
  align-self: center;
  margin-top: 40px;
`

const SearchView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
`
const SearchTextInput = styled.TextInput`
  width: 200px;
  height: 30px;
  margin-left: 5px;
`
const AddEmotionModal = (props: AddEmotionModalProps) => {
  const [selectedEmojiType, setSelectedEmojiType] = useState<EmojiType>(
    EmojiType.Heart
  )
  const [searchText, setSearchText] = useState<string>('')

  useEffect(() => {
    setSearchText('')
  }, [props.show])

  const filterEmojiBySearchText = (e: EmojiType) => {
    if (!searchText) {
      return true
    }
    return String(e).startsWith(searchText.toLowerCase())
  }
  const filterProps = props.filter || (() => true)
  const filter = (e: EmojiType) => filterProps(e) && filterEmojiBySearchText(e)
  const footer = (
    <View style={styles.footerHolder}>
      <TextButton
        text='CANCEL'
        buttonStyle={TextButtonStyle.PlainText}
        onPress={props.onClose || _.noop}
      />
      <TextButton
        text='ADD'
        style={{ paddingVertical: 0, paddingHorizontal: 10 }}
        buttonStyle={TextButtonStyle.BlackButton}
        onPress={() =>
          props.onAddEmoji ? props.onAddEmoji(selectedEmojiType) : _.noop
        }
      />
    </View>
  )

  return (
    <Modal show={props.show} showFooter footer={footer}>
      <ModalContent>
        <TitleView>
          <TitleText>{props.title}</TitleText>
        </TitleView>
        <TitleView>
          <SubtitleText>{props.subtitle}</SubtitleText>
        </TitleView>
        <View style={styles.content}>
          <SearchView>
            <Ionicons name='md-search' size={20} />
            <SearchTextInput
              placeholder='Search'
              onChangeText={setSearchText}
              value={searchText}
            />
          </SearchView>
          <AddEmotionModalSection
            selectedEmojiType={selectedEmojiType}
            setSelectedEmojiType={setSelectedEmojiType}
            filter={filter}
          />
          <EmojiText>{EmojiFunc.emojiDisplayName(selectedEmojiType)}</EmojiText>
        </View>
      </ModalContent>
    </Modal>
  )
}

export default AddEmotionModal
