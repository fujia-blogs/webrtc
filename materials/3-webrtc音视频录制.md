# WebRTC 视频录制

## MediaRecorder

1. 使用语法：

```ts
const mediaRecorder = new MediaRecorder(stream[, options])
```

参数说明：

- stream：媒体流，可以从 getUserMedia, \<video>, \<audio>或\<canvas>获取；
- options：限制选项

options：

|        选项        |                                                 说明                                                  |
| :----------------: | :---------------------------------------------------------------------------------------------------: |
|      mimeType      | video/webm \| audio/webm \| video/webm;codecs=vp8 \| video/webm;codecs=h264 \| audio/webm;codecs=opus |
| audioBitsPerSecond |                                               音频码率                                                |
| videoBitsPerSecond |                                               视频码率                                                |
|   bitsPerSecond    |                                               整体码率                                                |

2. 相关 API

MediaRecorder.start(timeslice?)，开始录制媒体，如果设置了会按时间切片存储数据。

MediaRecorder.stop()，停止录制，调用后会触发包括最终 Blob 数据的 dataavailable 事件。

MediaRecorder.pause

MediaRecorder.resume()，恢复录制

MediaRecorder.isTypeSupported()

3. 相关事件

- MediaRecorder.ondataavailable

每次记录一定时间的数据时(如果没有指定时间片，则记录整个数据时)会定期触发。

- MediaRecorder.onerror

当有错误发生时，录制会被停止。

4. JavaScript 几种存储数据的方式

- string
- Blob：简单理解，一块非常高效的存储区域，其它类型的 buffer 是可以放到 Blob 的对象中，它的好处是将缓存区域写到一个文件中去。底层就是一个无类型的数据缓存区。
- ArrayBuffer
- ArrayBufferView：各种类型的 buffer；

## 捕获桌面

1. 使用 getDisplayMedia

语法：

```ts
const mediaStream = await navigator.mediaDevices.getDisplayMedia(constraints);
```

2. 设置 Chrome，在浏览器中输入 chrome://flags，也可以快速打开某一个特征功能：chrome://flags/#enable-experimental-web-platform-features
