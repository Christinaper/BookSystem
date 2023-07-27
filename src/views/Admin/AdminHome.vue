<template>
    <Layout>
      <template slot="header">
        <div class="header-container">
            <span>DashBoard</span>
            <img :src="userInfo[0].avatar" alt="" v-if="userInfo && userInfo[0].name" @click="$router.push('/profilee')">
        </div>
      </template>
      <div class="main-container">
        <div class="grid-container">
          <div class="grid-item">
            <span class="state-count">{{ stateCounts['reverse'] }}</span>
            预约
          </div>
          <div class="grid-item">
            <span class="state-count">{{ stateCounts['borrowing'] }}</span>
            借阅中
          </div>
          <div class="grid-item">
            <span class="state-count">{{ stateCounts['returned'] }}</span>
            已归还
          </div>
          <div class="grid-item">
            <span class="state-count">0</span>
            已丢失
          </div>
        </div>
        <div class="echarts">
            <div ref="chartContainer" id="chart" style="width: 100%; height: 400px;"></div>
        </div>
      </div>
      <template slot="footer">
        <van-tabbar route active-color="#db214c" inactive-color="#33">
            <van-tabbar-item push to="/homee" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item push to="/admin" icon="chart-trending-o">借阅记录</van-tabbar-item>
            <van-tabbar-item push to="/searchh" icon="search">查询</van-tabbar-item>
            <van-tabbar-item push to="/manage" icon="add-o">入库</van-tabbar-item>
        </van-tabbar>
      </template>
    </Layout>
  </template>
  
  <script>
  import { Layout } from '@/components';
  import echarts from 'echarts';
  
  export default {
    name: 'AdminHomeView',
    components: {
      Layout,
    },
    data() {
      return {
        order: [],
        stateCounts: {} // 计算值保存在组件的数据中
      }
    },
    // 组件的逻辑和行为的定义部分
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        }
    },
    methods: {
      calculateStateCounts() {
        // 使用上述的 flatMap 和 reduce 计算 stateCounts 对象
        const stateCounts = this.order.flatMap(item => item.details)
          .reduce((counts, detail) => {
            const state = detail.state;
            counts[state] = (counts[state] || 0) + 1;
            return counts;
          }, {});
        for (const state in stateCounts) {
          console.log(`${state}: ${stateCounts[state]}`);
        }
        // 将计数值更新到组件的数据中
        this.stateCounts = stateCounts;
      },
    },
    async created() {
      const order = await this.$api.order.getAllOrder();
      console.log(order);
      this.order = order
      // 在组件创建时计算 stateCounts
      this.calculateStateCounts();
    },
    mounted() {
      const posList = [
        'left',
        'right',
        'top',
        'bottom',
        'inside',
        'insideTop',
        'insideLeft',
        'insideRight',
        'insideBottom',
        'insideTopLeft',
        'insideTopRight',
        'insideBottomLeft',
        'insideBottomRight'
      ];
      const app = {
        configParameters: {
          rotate: {
            min: -90,
            max: 90
          },
          align: {
            options: {
              left: 'left',
              center: 'center',
              right: 'right'
            }
          },
          verticalAlign: {
            options: {
              top: 'top',
              middle: 'middle',
              bottom: 'bottom'
            }
          },
          position: {
            options: posList.reduce(function (map, pos) {
              map[pos] = pos;
              return map;
            }, {})
          },
          distance: {
            min: 0,
            max: 100
          }
        },
        config: {
          rotate: 90,
          align: 'left',
          verticalAlign: 'middle',
          position: 'insideBottom',
          distance: 15,
          onChange: () => {
            const labelOption = {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance
            };
            myChart.setOption({
              series: [
                {
                  label: labelOption
                },
                {
                  label: labelOption
                },
                {
                  label: labelOption
                },
                {
                  label: labelOption
                }
              ]
            });
          }
        }
      };
  
      const labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {}
        }
      };
  
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['已预约', '借阅中', '已归还', '丢失']
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: ['3月', '4月', '5月', '6月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '已预约',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [0, 0, 0, 2]
          },
          {
            name: '借阅中',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [0, 0, 3, 22]
          },
          {
            name: '已归还',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [5, 6, 10, 6]
          },
          {
            name: '丢失',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [0, 0, 0, 0]
          }
        ]
      };
  
        const chartContainer = this.$refs.chartContainer;
        const myChart = echarts.init(chartContainer);
        app.myChart = myChart;
        myChart.setOption(option);
    },
  }
  </script>
  

<style lang="sass" scoped>
    .header-container
        height: px2vw(80)
        line-height: px2vw(80)
        padding: 0 px2vw(20)
        font-weight: bold
        font-size: 20px
        display: flex
        justify-content: space-between
        align-items: center
        img
            height: 50%

    .main-container
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        overflow: auto
        .grid-container
            display: grid
            grid-template-columns: auto auto
            grid-gap: px2vw(10)
            margin: 0 px2vw(20)
            .grid-item
                padding: px2vw(10) px2vw(12)
                color: #333
                border-radius: 8px 
                height: px2vw(100)
                box-sizing: border-box

                border: 2px solid #333
                &:nth-child(1)
                    background-color: #9e9bff
                &:nth-child(2)
                    background-color: #eca7fe
                &:nth-child(3)
                    background-color: #f6bc54
                &:nth-child(4)
                    background-color: #5cd669
                .state-count
                    font-size: 30px
        .echarts
            margin-top: px2vw(30)
            padding: 0 px2vw(20)
                    
                    
                    
                    
            
</style>