<template>
  <canvas ref="applicationCanvas" class="applicationCanvas" />
</template>

<script>
const cacheCanvas = document.createElement('canvas')
const cacheCtx = cacheCanvas.getContext('2d')
const cacheCanvas2 = document.createElement('canvas')
const cacheCtx2 = cacheCanvas2.getContext('2d')
// 画布属性
const mW = cacheCanvas.width = 150
const mH = cacheCanvas.height = 150
const lineWidth = 2
// 圆属性
const r = mH / 2 // 圆心
const cR = r - 8 * lineWidth // 圆半径

// Sin 曲线属性
const sX = 0
const axisLength = mW // 轴长
const waveWidth = 0.032 // 波浪宽度,数越小越宽
const waveHeight = 4 // 波浪高度,数越大越高
const speed = 0.05 // 波浪速度，数越大速度越快
let xOffset = 0 // 波浪x偏移量
let xOffset2 = 30 // 波浪2 x偏移量

cacheCtx.lineWidth = lineWidth
cacheCtx2.lineWidth = lineWidth

// 画圈函数
const drawCircle = () => {
  cacheCtx.lineWidth = 2
  cacheCtx.beginPath()
  cacheCtx.strokeStyle = '#1e90ff'
  cacheCtx.arc(r, r, cR + 5, 0, 2 * Math.PI)
  cacheCtx.stroke()
  cacheCtx.beginPath()
  cacheCtx.arc(r, r, cR, 0, 2 * Math.PI)
  cacheCtx.clip()
}
const drawArc = (oldInput, oldOutput) => {
  cacheCtx.lineWidth = 3
  cacheCtx2.beginPath()
  cacheCtx2.strokeStyle = '#ED5565'
  // 0.5 ~ 1.5
  cacheCtx2.arc(r, r, cR + 9, 0.5 * Math.PI, (0.5 + oldInput) * Math.PI)
  cacheCtx2.stroke()

  cacheCtx2.beginPath()
  cacheCtx2.strokeStyle = '#4de680'
  // 1.5 ~ 2, 0 ~ 0.5
  cacheCtx2.arc(r, r, cR + 9, 1.5 * Math.PI, (oldOutput > 0.5 ? oldOutput - 0.5 : oldOutput + 1.5) * Math.PI)
  cacheCtx2.stroke()
}
// 画sin 曲线函数
const drawSin = (oldCpuIdle, xOffset) => {
  cacheCtx.save()
  const points = [] // 用于存放绘制Sin曲线的点
  cacheCtx.beginPath()
  // 在整个轴长上取点
  for (let x = sX; x < sX + axisLength; x += 20 / axisLength) {
    // 此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
    const y = -Math.sin((sX + x) * waveWidth + xOffset)
    const dY = mH * (1 - oldCpuIdle / 100)
    points.push([x, dY + y * waveHeight])
    cacheCtx.lineTo(x, dY + y * waveHeight)
  }
  // 封闭路径
  cacheCtx.lineTo(axisLength, mH)
  cacheCtx.lineTo(sX, mH)
  cacheCtx.lineTo(points[0][0], points[0][1])
  var grd = cacheCtx.createRadialGradient(75, 50, 5, 90, 60, 100)
  grd.addColorStop(0, 'rgba(30, 144, 255, .85)')
  grd.addColorStop(1, 'rgba(30, 144, 255, .15)')
  // 填充渐变
  cacheCtx.fillStyle = grd
  cacheCtx.fill()
  cacheCtx.restore()
}

// 写百分比文本函数
const drawText = (oldCpuIdle) => {
  cacheCtx.save()
  const size = 0.4 * cR
  cacheCtx.font = size + 'px Microsoft Yahei'
  cacheCtx.textAlign = 'center'
  cacheCtx.fillStyle = 'rgba(255, 255, 255, .8)'
  cacheCtx.fillText(~~oldCpuIdle + '%', r, r + size / 2)
  cacheCtx.restore()
}

export default {
  name: 'ApplicationCanvas',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isDrawCircled: false,
      canvas: null,
      ctx: null,
      drawData: {
        newCpuIdle: 0,
        oldCpuIdle: 0,
        newInput: 0,
        oldInput: 0,
        newOutput: 0,
        oldOutput: 0
      },
      animaId: null
    }
  },
  watch: {
    'data.cpuIdle' (newCpuIdle, oldCpuIdle) {
      this.drawData.oldCpuIdle = this.drawData.newCpuIdle
      this.drawData.newCpuIdle = newCpuIdle
      this.drawData.oldInput = this.drawData.newInput
      this.drawData.newInput = this.data.input
      this.drawData.oldOutput = this.drawData.newOutput
      this.drawData.newOutput = this.data.output
      if (this.animaId) {
        cancelAnimationFrame(this.animaId)
      }
      this.render()
    }
  },
  beforeDestroy () {
    if (this.animaId) {
      cancelAnimationFrame(this.animaId)
    }
  },
  mounted () {
    this.canvas = this.$refs.applicationCanvas
    this.canvas.width = mW
    this.canvas.height = mH
    this.ctx = this.canvas.getContext('2d')
    this.drawData.newCpuIdle = this.data.cpuIdle
    this.drawData.newInput = this.data.input
    this.drawData.newOutput = this.data.output
    this.render()
  },
  methods: {
    render () {
      const { drawData } = this
      cacheCtx.clearRect(0, 0, mW, mH)
      this.ctx.clearRect(0, 0, mW, mH)
      if (drawData.oldCpuIdle < drawData.newCpuIdle) {
        drawData.oldCpuIdle += 1
      } else if (drawData.oldCpuIdle > drawData.newCpuIdle) {
        drawData.oldCpuIdle -= 1
      }
      if (drawData.oldInput < drawData.newInput) {
        drawData.oldInput = +(drawData.oldInput + 0.01).toFixed(2)
      } else if (drawData.oldInput > drawData.newInput) {
        drawData.oldInput = +(drawData.oldInput - 0.01).toFixed(2)
      }
      if (drawData.oldOutput < drawData.newOutput) {
        drawData.oldOutput = +(drawData.oldOutput + 0.01).toFixed(2)
      } else if (drawData.oldOutput > drawData.newOutput) {
        drawData.oldOutput = +(drawData.oldOutput - 0.01).toFixed(2)
      }
      if (drawData.oldInput !== drawData.newInput || drawData.oldOutput !== drawData.newOutput) {
        cacheCtx2.clearRect(0, 0, mW, mH)
        drawArc(drawData.oldInput, drawData.oldOutput)
      }
      if (!this.isDrawCircled) {
        drawCircle()
        this.isDrawCircled = true
      }
      drawSin(drawData.oldCpuIdle, xOffset)
      drawSin(drawData.oldCpuIdle, xOffset2)
      drawText(drawData.oldCpuIdle)
      xOffset += speed
      xOffset2 += speed
      this.ctx.drawImage(cacheCanvas, 0, 0)
      this.ctx.drawImage(cacheCanvas2, 0, 0)
      this.animaId = requestAnimationFrame(this.render)
    }
  }
}

</script>
<style lang="less" scoped>
  .applicationCanvas {
    margin: 0 auto;
    display: block;
  }
</style>
