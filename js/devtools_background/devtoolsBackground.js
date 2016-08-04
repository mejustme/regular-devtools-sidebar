var panels = chrome.devtools.panels;

var getPanelContents = function () {
  if (window.Regular && $0) {
    var regularUI,currentElemt;
    var prop, key, tempObj;
    var nameArr = ['_directives','_filters', '_animations','_events'];
    var cnameMap = {
      _directives: '指令',
      _filters: '过滤器',
      _animations: '动画',
      _events: '自定义Dom事件'
    };
    currentElemt = $0;
    while (currentElemt && !currentElemt.__regularUI){
      currentElemt = currentElemt.parentNode;
    }
    if(currentElemt){
      regularUI = currentElemt.__regularUI;
      if(regularUI){
        window.$component = regularUI;       // 全局中$component指向当前组件
        return (function (regularUI) {
          var constructor = regularUI.constructor;
          var panelContents = {};

          for (prop in constructor) {
            if ( nameArr.indexOf(prop) != -1) {
              tempObj= {};
              for (key in constructor[prop]) {
                tempObj[key] = constructor[prop][key];
              }
              panelContents[cnameMap[prop]] = tempObj;
            }
          }
          for (prop in regularUI) {
            if (regularUI.hasOwnProperty(prop)) {
              panelContents[prop] = regularUI[prop];
            }
          }
          return panelContents;
        }(regularUI));
      }
    }else{
      tempObj = {
        '提醒' : "该元素不属于任何组件"
      };
      tempObj.__proto__ = null;
      return tempObj;
    }
  }
};

// chrome.devtools.panels.elements 显示元素面板
panels.elements.createSidebarPane(
  "RegularUI Properties",
  function (sidebar) {
    panels.elements.onSelectionChanged.addListener(function updateElementProperties() {
      sidebar.setExpression("(" + getPanelContents.toString() + ")()"); // 该方法执行上下文为监视页面
    });
  });

