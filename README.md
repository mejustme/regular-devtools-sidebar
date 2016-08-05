# regular-devtool-sidebar

##先上效果图
![enter image description here](./assets/sidebar.gif)

## 介绍
> 通过控制台选择元素，实时在sidebar中展现这个元素所在的组件对象。
> 通过这个对象，我们可以方便查看该组件实例的所有属性情况。
> 全局环境实时更新$component指向该组件，可手动执行其中的函数。
> sidebar中的属性支持修改，通过调用$component.$update()刷新视图。


## 你该如何用
1. 在regular源码Regular函数中加入,下面3行代码。放心，对Regular毫无影响，且未装插件的用户更是毫无影响。

```
    this.$emit("$init");
    if( this.init ) this.init(this.data);
    env.isRunning = prevRunning;
  // 加入下面代码
  // check if regular-devtools-sidebar-exist
    if(window.__REGULAR_DEVTOOLS_SIDEBAR_GLOBAL_HOOK__ && this.group && this.group.children &&  this.group.children[0].node){
        var element = this.group.children[0].node();
        element.__regularUI = this;
    }
```
2. clone 工程 -> 拉到本地 -> chrome://extensions/ -> 加载已解压的扩展程序

## 优点
- regular 源码最小改动
- 支持所有组件的查看：内嵌组件、isolate组件、inject组件
- 属性配置中文说明

## tips
当修改视图中的数据，需要通过切换sidebar来刷新其中的视图，展现最新的属性。（切换$0元素也行）



##下一步
- 增加一个panel, 展现各组件脏检查数量，以及脏检查时间与性能瓶颈
- 增加一个panel，可视化展现组件继承关系
- 增加一个panel, 列表工程中的可以命令，直接点击执行，如: npm run pscom /npm run cssall....

