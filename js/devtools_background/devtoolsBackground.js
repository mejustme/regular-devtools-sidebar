var panels = chrome.devtools.panels;

var getPanelContents = function () {
  if (window.Regular && $0) {
    var regularUI,currentElemt;
    var prop, key, tempObj;
    var nameArr = ['_directives','_filters', '_animations','_events'];
    var nameArr1 = ['$outer','$parent','$phase','$ready','$refs','$root','_children','_handles','_watchers','computed','data','events','group','$body'];
    var tempKeyArr = ['_records','_body','__ext__'];
    var cnameMap = {
      _directives: '指令',
      _filters: '过滤器',
      _animations: '动画',
      _events: '自定义Dom事件',
      $outer: '$outer_包裹其的组件',
      $parent: '$parent_嵌套其的父组件',
      $phase: '$phase_脏检查状态',
      $ready: '$ready_Dom状态',
      $refs: '$refs_ref获取的Dom/组件实例',
      $root: '$root_根组件',
      _children: '_children_孩子组件',
      _handles: '_handles_组件事件监听函数',
      _watchers: '_watchers_脏检查对象',
      computed: 'computed_计算属性',
      data: 'data_数据',
      events: 'events_组件事件',
      group: 'group_组件动态Dom树',
      $body: '$body_组件包裹的动态Dom树'
    };

    var panelContents = {};
    currentElemt = $0;
    while (currentElemt && !currentElemt.__regularUI){
      currentElemt = currentElemt.parentNode;
    }
    if(currentElemt){
      regularUI = currentElemt.__regularUI;
      if(regularUI){

        // 全局中$component指向当前组件
        window.$component = regularUI;
        (function (regularUI) {
          var constructor = regularUI.constructor;

          // 构造函数中的常用属性
          for (prop in constructor) {
            if ( nameArr.indexOf(prop) != -1) {
              tempObj= {};
              for (key in constructor[prop]) {
                tempObj[key] = constructor[prop][key]; // for in 同名取原型链近的
              }
              panelContents[cnameMap[prop]] = tempObj;
            }
          }

          // key 中文说明，不能动regularUI本身
          for (prop in regularUI) {
            if(regularUI.hasOwnProperty(prop))
            if ( nameArr1.indexOf(prop) != -1) {
              panelContents[cnameMap[prop]] = regularUI[prop];
            }else {
              panelContents[prop] = regularUI[prop];
            }
          }

          for(prop in tempKeyArr){
            delete panelContents[tempKeyArr[prop]];
          }

          panelContents.__proto__ = regularUI.__proto__;
          panelContents.name = panelContents.__proto__.name;  // 更明显展示

        }(regularUI));
      }
    }else{
      panelContents = {
        '提醒' : "该元素不属于任何组件"
      };
      panelContents.__proto__ = null;
    }
    return panelContents;

  }

};
// chrome.devtools.panels.elements 显示元素面板
panels.elements.createSidebarPane(
    "RegularUI Properties",
    function (sidebar) {

      panels.elements.onSelectionChanged.addListener(function updateElementProperties() {
        sidebar.setExpression( "(" + getPanelContents.toString() + ")()",'$component'); // 该方法执行上下文为监视页面
      });

      sidebar.onShown.addListener(function () {
        sidebar.setExpression( "(" + getPanelContents.toString() + ")()",'$component');
      });

    }
);
