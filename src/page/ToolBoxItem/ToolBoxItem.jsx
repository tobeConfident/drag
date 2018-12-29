import React,{Component} from "react";
import "../styles.css";
import "../example-styles.css";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default class ShowcaseLayout extends Component {
    state = {
        arr:[{
           key:"1",
        },{
            key:"2",
        }],
        layouts: { lg: [] },
    };
    componentWillMount() {
        this.generateLayout(); // 执行初始化layouts函数
        // 取出
        this.setState({
            arr: JSON.parse(sessionStorage.getItem('dragArr')) || [],
            layouts: JSON.parse(sessionStorage.getItem('layouts')) || []
        })      
    }
    // 初始化layouts
    generateLayout = () => {
        const dragArr = JSON.parse(sessionStorage.getItem('dragArr')) || [];
        const json = dragArr.map((item) => {
            return (
                {
                    x: Math.ceil(Math.random() * 3),
                    y: Math.ceil(Math.random() * 2),
                    w: Math.ceil(Math.random() * 3),
                    h: Math.ceil(Math.random() * 2),
                    i: item.key.toString(),
                }
            );
        });
        const tempJson = {lg: json}
        this.setState({
            layouts: tempJson
        })
    };
    /**
     * 两种方式实现删除操作
     * 1.对DOM节点进行操作
     * 2.对已有的数组进行操作*/
    onDelete = item => {
        // let child = document.getElementById(item);
        // child.parentNode.removeChild(child);
        let dragArr = this.state.arr;
        dragArr.splice(item,1);
        this.setState({
            arr:dragArr
        })
        // 存储
        sessionStorage.setItem('dragArr',JSON.stringify(dragArr));
    };
    // 添加操作
    handleAdd = () => {
        let dragArr = this.state.arr;
        let key = Math.ceil(Math.random()*100);
        let tempJson = {key:key,width:100,height:100};
        dragArr.push(tempJson);
        this.setState({
            arr: dragArr
        })
        // 存储
        sessionStorage.setItem('dragArr',JSON.stringify(dragArr));
    };
    // 改变大小
    onLayoutChange = (layout, layouts) => {
        // 存储
        sessionStorage.setItem('layouts',JSON.stringify(layouts));
    };
    render() {
        const {arr,layouts} = this.state || [];
        return (
            <div>
                <button onClick={this.handleAdd}>添加</button>
                <ResponsiveReactGridLayout
                    layouts={layouts}
                    onLayoutChange={this.onLayoutChange}
                >
                    {arr.map((item,index)=>{
                        return (
                            <div key={item.key} id={item.key}>
                                <div className="hide-button" onClick={this.onDelete.bind(this, index)}>
                                    &times;
                                </div>
                                {item.key}
                            </div>
                        );
                    })}
                </ResponsiveReactGridLayout>
            </div>
        );
    }
}

if (require.main === module) {
    require("../test-hook.jsx")(module.exports);
}
