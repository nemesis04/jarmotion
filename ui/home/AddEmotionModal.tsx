import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TextButton, { TextButtonStyle } from '../uikit/buttons/TextButton'
import Modal from '../uikit/Modal'

type AddEmotionModalProps = {
  show: boolean
}

const styles = StyleSheet.create({
  title: {
    marginTop: 5
  },
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
  }
})

const AddEmotionModal = (props: AddEmotionModalProps) => {
  const footer = (
    <View style={styles.footerHolder}>
      <TextButton text='CANCEL' style={TextButtonStyle.PlainText} />
      <TextButton text='ADD' style={TextButtonStyle.BlackButton} />
    </View>
  )
  return (
    <Modal show={props.show} showFooter footer={footer}>
      <View style={styles.title}>
        <View style={styles.textCenterHolder}>
          <Text style={styles.textHeader}>Tell me how you feel?</Text>
        </View>
        <View style={styles.textCenterHolder}>
          <Text style={styles.textHeaderDescription}>
            You can select your mood more one.
          </Text>
        </View>
      </View>
    </Modal>
  )
}

export default AddEmotionModal