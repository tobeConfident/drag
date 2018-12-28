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
        }]
    };
    componentWillMount() {
        // 在页面渲染前取出
        this.state.arr = JSON.parse(sessionStorage.getItem('dragArr')) || [];
    }
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
        let tempJson = {key:key};
        dragArr.push(tempJson);
        this.setState({
            arr: dragArr
        })
        // 存储
        sessionStorage.setItem('dragArr',JSON.stringify(dragArr));
    }
    render() {
        const dragArr = this.state.arr;
        return (
            <div>
                <button onClick={this.handleAdd}>添加</button>
                <ResponsiveReactGridLayout>
                    {dragArr.map((item,index)=>{
                        return (
                            <div key={item.key} id={item.key} style={{width:100,height:100}}>
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
