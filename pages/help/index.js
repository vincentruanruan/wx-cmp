// pages/dingzhi/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    drop: 'drop', // 头部设置
    topBarLogo: '', // 头部设置
    logo: '', // 头部设置
    logoWhite: '', // 头部设置,

    footer: {}, // 底部数据\

    keyword: '',

    categorys: [],
    categorysAction: 0,

    helpList: [],

    nowPage: 1,
    nextPage: 0,
    allpage: 0,


    rightMenu: [],
    navTitle: '',
    bannerImage: '',
    bannerTitle: '',

  },

  keywordChage: function(e) {
    this.setData({
      keyword: e.detail.value
    })
    this.getData()
  },
  // 获取数据
  getData: function() {
    let that = this
    this.scrollTop()
    wx.request({
      url: app.globalData.baseUrl + 'web/index.php?c=account&a=welcome&do=helpapi',
      data: {
        cid: this.data.categorysAction,
        page: this.data.nowPage,
        keyword: this.data.keyword,
      },
      success(res) {
        console.log(res)
        let dt = res.data.data
        let parvious = that.data.nowPage - 1 < 1 ? 0 : that.data.nowPage - 1
        let next = that.data.nowPage + 1 > dt.allpage ? 0 : that.data.nowPage + 1
        if (res.data.code == 200) {

          console.log(dt)
          that.setData({

            topBarLogo: dt.header.logo[1],
            logo: dt.header.logo[0],
            logoWhite: dt.header.logo[1],
            rightMenu: dt.header.nav,

            bannerImage: dt.banner.help,
            bannerTitle: dt.banner.helptitle,

            previousPage: parvious,
            nextPage: next,
            allpage: dt.allpage,

            categorys: dt.categorys,

            helpList: dt.lists,

            footer: dt.footer,

            navTitle: dt.title,
          })
          that.setNavTitle()
        }
      }
    })
  },
  scrollTop: function() { // 滚动到顶部
    // 控制滚动
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  toDesc: function(e) {
    let id = e.currentTarget.dataset.id
    // console.log(id)
    wx.navigateTo({
      url: 'desc?id=' + id,
    })
  },
  categorysSwitch: function(e) { //类型切换
    let id = e.currentTarget.dataset.id
    console.log(id)
    this.setData({
      categorysAction: id,
      nowPage: 1,
      keyword: ''
    })
    this.getData()
    this.scrollTop()
  },
  setNavTitle: function() {
    wx.setNavigationBarTitle({
      title: this.data.navTitle,
    })
  },
  footerTo: function(e) { // 底部按钮点击跳转
    let todo = e.currentTarget.dataset.do
    console.log(todo)
    this.selectComponent("#v-header").goto(todo)

  },

  handleChange({ // 上一页下一页
    detail
  }) {
    const type = detail.type;
    if (type === 'next') {
      console.log(this.data.nowPage)
      this.setData({
        nowPage: this.data.nextPage
      });
      this.getData()
      this.scrollTop()
    } else if (type === 'prev') {
      console.log(this.data.nowPage && this.data.previousPage)
      this.setData({
        nowPage: this.data.previousPage
      });
      this.getData()
      this.scrollTop()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.categorysAction) {
      this.setData({
        categorysAction: options.categorysAction
      })
    } 
    if (options.keyword) {
      this.setData({
        keyword: options.keyword
      })
    }
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})