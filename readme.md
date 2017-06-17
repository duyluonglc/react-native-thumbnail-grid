# React Native Photo Grid

[![Greenkeeper badge](https://badges.greenkeeper.io/duyluonglc/react-native-photo-grid.svg)](https://greenkeeper.io/)
<p align="center">
  <img src="https://github.com/duyluonglc/react-native-photo-grid/blob/master/grid.gif?raw=true" width=200/>
</p>

Code:

```js
<PhotoGrid source={images} onPressImage={uri => this.showImage(uri)} />

```

# Props

| Property | Type | Description |
| --- | --- | --- | --- |
|source | PropTypes.array | Array uri of image|
|width | PropTypes.number | Container width |
|height | PropTypes.number | Container height |
|style | PropTypes.object | Container styles |
|imageStyle | PropTypes.object | Image styles |
|onPressImage | PropTypes.func | Callback when press image |