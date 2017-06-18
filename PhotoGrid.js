import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import _ from 'lodash'
import eachSeries from 'async/eachSeries'
const { width } = Dimensions.get('window')

class PhotoGrid extends Component {
  constructor (props) {
    super(props)
    this.state = {
      direction: null,
      images: [],
      firstViewImages: [],
      secondViewImages: [],
      width: props.width,
      height: props.height
    }
  }

  componentWillMount () {
    const source = _.take(this.props.source, 5)
    this.getImageDimensions(source)
  }

  componentWillReceiveProps (nextProps) {
    this.forceUpdate()
    if (nextProps.source) {
      const source = _.take(this.props.source, 5)
      this.getImageDimensions(source)
    }
  }

  getImageDimensions (source) {
    const images = []
    const firstViewImages = []
    const secondViewImages = []
    const firstItemCount = source.length >= 5 ? 2 : 1
    let index = 0
    eachSeries(source, (img, callback) => {
      Image.getSize(img, (width, height) => {
        const image = { uri: img, width, height }
        images.push(image)
        if (index === 0) {
          firstViewImages.push(image)
        } else if (index === 1 && firstItemCount === 2) {
          firstViewImages.push(image)
        } else {
          secondViewImages.push(image)
        }
        index++
        callback()
      })
    }, () => {
      if (this.state.width) {
        this.setState({ images, firstViewImages, secondViewImages })
        this.getDimensions(firstViewImages, secondViewImages)
      }
    })
  }

  getDimensions (firstViewImages, secondViewImages) {
    const { width, height } = this.props
    let ratio = 0
    if (secondViewImages.length === 0) {
      ratio = 0
    } else if (secondViewImages.length === 1) {
      ratio = 1 / 2
    } else {
      ratio = this.props.ratio
    }
    const iWidth = _.sumBy(firstViewImages, 'width')
    const iHeight = _.sumBy(firstViewImages, 'height')
    const direction = iWidth / iHeight > width / height ? 'column' : 'row'

    const firstImageWidth = direction === 'column' ? (width / firstViewImages.length) : (width * (1 - ratio))
    const firstImageHeight = direction === 'column' ? (height * (1 - ratio)) : (height / firstViewImages.length)

    const secondImageWidth = direction === 'column' ? (width * ratio) : (width / secondViewImages.length)
    const secondImageHeight = direction === 'column' ? (height / secondViewImages.length) : (height * ratio)

    const secondViewWidth = direction === 'column' ? width : (width * ratio)
    const secondViewHeight = direction === 'column' ? (height * ratio) : height

    this.setState({ secondViewWidth, secondViewHeight, firstImageWidth, firstImageHeight, secondImageWidth, secondImageHeight, direction, width, height })
  }

  render () {
    const {
      firstImageWidth,
      firstImageHeight,
      secondImageWidth,
      secondImageHeight,
      firstViewImages,
      secondViewImages,
      secondViewWidth,
      secondViewHeight,
      direction,
      width,
      height
    } = this.state
    console.log(this.state)
    return (
      <View style={[{ flexDirection: direction, width, height }, this.props.styles]}>
        <View style={{ flex: 1, flexDirection: direction === 'row' ? 'column' : 'row' }}>
          {firstViewImages.map((image, index) => (
            <TouchableOpacity key={index} style={{ flex: 1 }}
              onPress={() => this.props.onPressImage && this.props.onPressImage(image)}>
              <Image
                style={[styles.image, { width: firstImageWidth, height: firstImageHeight }, this.props.imageStyle]}
                source={{ uri: image.uri }}
              />
            </TouchableOpacity>
          ))}
        </View>
        {
          secondViewImages.length ? (
            <View style={{ width: secondViewWidth, height: secondViewHeight, flexDirection: direction === 'row' ? 'column' : 'row' }}>
              {secondViewImages.map((image, index) => (
                <TouchableOpacity key={index} style={{ flex: 1 }}
                  onPress={() => this.props.onPressImage && this.props.onPressImage(image)}>
                  <Image
                    style={[styles.image, { width: secondImageWidth, height: secondImageHeight }, this.props.imageStyle]}
                    source={{ uri: image.uri }}
                  >
                    {this.props.source.length > 5 && index === secondViewImages.length - 1 ? (
                      <View style={styles.lastWrapper}>
                        <Text style={[styles.textCount, this.props.textStyles]}>{this.props.source.length - 4}</Text>
                      </View>
                    ) : null}
                  </Image>
                </TouchableOpacity>
              ))}
            </View>
          ) : null
        }
      </View >
    )
  }
}

PhotoGrid.prototypes = {
  source: PropTypes.array.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
  imageStyle: PropTypes.object,
  onPressImage: PropTypes.func,
  ratio: PropTypes.float
}

PhotoGrid.defaultProps = {
  style: {},
  imageStyle: {},
  width: width,
  height: 400,
  ratio: 1 / 3
}

const styles = {
  image: {
    flex: 1,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#fff'
  },
  lastWrapper: {
    flex: 1,
    backgroundColor: 'rgba(200, 200, 200, .5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textCount: {
    color: '#fff',
    fontSize: 60
  }
}

export default PhotoGrid
