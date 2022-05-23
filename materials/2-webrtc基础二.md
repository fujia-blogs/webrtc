# WebRTC 基础

## 设备管理

1. 获取所有设备

```js
navigator.mediaDevices.enumerateDevices().then((res) => {
  console.table(res);
});
```

设备信息对象：MediaDevicesInfo

- deviceID: 设备 ID
- label：设备的名字；
- kind：设备的种类；
- groupID：两个设备的 groupID 相同，表示是同一个物理设备

## 音视频数据采集

1. 语法格式：

```js
const mediaPromise = navigator.mediaDevices.getUserMedia(constraints);
```

- constraints 是一个 MediaStreamConstraints 对象

2. getUserMedia 适配

getUserMedia 的不同实现：

- getUserMedia - 标准；
- webkitGetUserMedia - Chrome，最新的已同步；
- mozGetUserMedia - firefox

```js
const getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;
```

也可以使用 Google 开源的 adapter.js

### 获取访问音视频设备的权限

### 视频采集约束

1. width：视频宽度

2. height，视频高度

注意：视频的宽高比一般来说有两种：4:3 和 16:9，同时在手机上也有些区别

3. aspectRatio: 比率

4. frameRate: 帧率，可以通过帧率的多少控制码流，帧率低的话，整个画面会不平滑。

5. facingMode:

- user - 前置摄像头；
- environment - 后置摄像头；
- left - 前置左侧摄像头；
- right - 前置右侧摄像头；

tips： 在 PC 上，该配置会被忽略。

6. resizeMode，画面是否裁剪

### 音频采集约束

1. volume：范围是 0~1.0，表示音量

2. sampleRate：采样率

3. sampleSize：采样大小

4. echoCancellation：是否开启回音消除，在实时通信中，回音消除非常重要

5. autoGainControl：是否自动增益；

6. noiseSuppression：是否开启降噪

7. latency：延迟大小，设置小的话，表示实时通信的延迟就小，但是如果网络质量差的情况下，就会出现卡顿、花屏的情况，一般设置为 500ms，更好的是 200ms 以内。

8. channelCount：单声道还是双声道，一般来说，单声道就够了，但是涉及音乐相关的音频时，双声道质量更好。

9. deviceID：指定输入输出设备。

10. groupID：同一个物理设备。

### 视频特效

1. 实现方式

- css filter, -webkit-filer/filter

问题是什么？

- 如何将 video 和 filter 关联？

tips：使用 CSS 渲染时，底层调用的还是 OpenGL/Metal/... 等底层图像渲染库。

2. 常见支持的特效：

|    特效     |   说明   |
| :---------: | :------: |
|  grayscale  |   灰度   |
|    sepia    |   褐色   |
|  saturate   |  饱和度  |
| hue-rotate  | 色相反转 |
|   invert    |   反色   |
|   opacity   |  透明度  |
| brightness  |   亮度   |
|  contrast   |  对比度  |
|    blur     |   模糊   |
| drop-shadow |   阴影   |

### 从视频中获取图片

### 采集音频数据
