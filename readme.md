# React Native Photo Grid
<p align="center">
  <img src="https://github.com/duyluonglc/react-native-photo-grid/blob/master/grid.gif?raw=true" width=200/>
</p>

Code:

```js
const images = [
  'https://cdn.pixabay.com/photo/2017/06/09/09/39/adler-2386314_960_720.jpg',
  'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029_960_720.jpg',
  'https://cdn.pixabay.com/photo/2016/08/12/22/34/apple-1589869_960_720.jpg'
]
...
<PhotoGrid source={images} onPressImage={uri => this.showImage(uri)} />

```

## Custom Image source object

The `source` prop also accepts an Array of source objects like so:

```js
const images = [
  {
    uri: 'https://cdn.pixabay.com/photo/2017/06/09/09/39/adler-2386314_960_720.jpg',
    headers: {
      Authorization: 'Bearer xyz'
    }
  },
  {
    uri: 'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029_960_720.jpg',
    headers: {
      Authorization: 'Bearer xyz'
    }
  },
  {
    uri: 'https://cdn.pixabay.com/photo/2016/08/12/22/34/apple-1589869_960_720.jpg'
    headers: {
      Authorization: 'Bearer xyz'
    }
  }
]
...
<PhotoGrid source={images} onPressImage={source => this.showImage(source.uri)} />
```

# Props

Property | Type | Description
------------ | ------------- | -------------
source | PropTypes.array | Array containing Image uri string or source object
width | PropTypes.number | Container width
height | PropTypes.number | Container height
ratio | PropTypes.float | Split screen ratio
style | PropTypes.object | Container styles
imageStyle | PropTypes.object | Image styles
imageProps | PropTypes.object | Image props
onPressImage | PropTypes.func | Callback when press image

# Image props
Property | Description
------------ | -------------
placeholderSource	| Show placeholderSource if the source can't be loaded or error.
loadingStyle | Style ActivityIndicator {size: 'small'; color: 'gray'}
isShowActivity | Show ActivityIndicator loading
placeholderStyle | Style placeholder image