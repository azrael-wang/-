require(['./db.js'],function(db){
  $(function(){
    //window.onload是js的入口函数，说明页面元素，js/css/图片等文件全部加载完成后在还行
    //但$(funciton(){})jquery的入口函数只要dom节点加载完成及可以生效
   const {dataA,dataB} = db
   // 初始化第一个选择列表
   getOption("#pro", dataA)
   //渲染选择框的函数
   function getOption(domId, data) {
     data.forEach(item => {
       
       $(domId).append(`<option value=${item.subId?item.subId:item.proId}>${item.name}</option>`)
     })
   }
   //联动
   //1.给select设置事件监听
   $('#pro').on('change', function (e) {
     //由于创建dom会一直保留，所以在每次添加时需要删除之前的dom--否则dom节点会一直追加
     $('#sub').empty()
     //拿到选择的id值后我们根据层级1的id渲染关联的下一层级
     const proId = $(this).val()
     //过滤符合选择层级1的选项
     let subArr = dataB.filter(item => {
       return item.proId == proId
     })
     //渲染层级2选择框
     getOption("#sub", subArr)
   })
  })
 
 })