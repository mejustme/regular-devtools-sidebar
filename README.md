# regular-devtool-sideb

##先上效果图
![enter image description here](./assets/sidebar.gif)

## 介绍
> 通过控制台选择元素，实时在sidebar中展现这个元素所在的组件对象。
> 通过这个对象，我们可以方便查看该组件实例的所有属性情况。
> 全局环境实时更新$component指向该组件，可手动执行其中的函数。
> sidebar中的属性支持修改，通过调用$component.$update刷新视图。


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

