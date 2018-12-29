import React,{Component} from "react";
import "../styles.css";
import "../example-styles.css";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
} from "bizcharts";
import { Responsive, WidthProvider } from "react-grid-layout";
import DataSet from "@antv/data-set";
const ResponsiveReactGridLayout = WidthProvider(Responsive);


export default class ShowcaseLayout extends Component {
    state = {
        arr:[],
        layouts: { lg: [] },
        chartData:[
            {value: 3, name: 'MPOS'},
            {value: 7, name: '传统POS'},
            {value: 2, name: '互联网商户'},
            {value: 12, name: '创新POS'}
        ],
    };
    componentWillMount() {
        // 取出
        this.setState({
            arr: JSON.parse(sessionStorage.getItem('dragArr')) || [],
            layouts: JSON.parse(sessionStorage.getItem('layouts')) || {}
        }) 
    }
    // 初始化layouts
    generateLayout = () => {
        const dragArr = JSON.parse(sessionStorage.getItem('dragArr')) || [];
        const json = dragArr.map(item => {
            return (
                {
                    x: 0,
                    y: 2,
                    w: 5,
                    h: 1,
                    minH: 1,
                    minW:5,
                    i: item.key.toString(),
                }
            );
        });
        const layouts = JSON.parse(sessionStorage.getItem('layouts')) || {lg:json};
        const tempJson = {lg: json};
        this.setState({layouts: tempJson})   
    };
    /**
     * 两种方式实现删除操作
     * 1.对DOM节点进行操作
     * 2.对已有的数组进行操作*/
    onDelete = item => {
        // let child = document.getElementById(item);
        // child.parentNode.removeChild(child);
        let dragArr = this.state.arr;
        let layout = this.state.layouts.lg;
        dragArr.splice(item,1);
        this.setState({
            arr: dragArr,
        })
        // 存储
        sessionStorage.setItem('dragArr',JSON.stringify(dragArr));
    };
    // 添加操作
    handleAdd = () => {
        let dragArr = this.state.arr;
        let key = Math.ceil(Math.random()*100);
        let tempJson = {key:key,};
        dragArr.push(tempJson);
        this.setState({
            arr: dragArr
        })
        // 存储
        sessionStorage.setItem('dragArr',JSON.stringify(dragArr));
        this.generateLayout();
    };
    // 改变大小
    onLayoutChange = (layout, layouts) => {
        // 存储
        sessionStorage.setItem('layouts',JSON.stringify(layouts));
    };
    render() {
        const {arr,layouts} = this.state || [] || {};
        const { DataView } = DataSet;
        const data = this.state.chartData || [];
        const dv = new DataView();
        dv.source(data).transform({
            type: "percent",
            field: "value",
            dimension: "name",
            as: "percent"
        });
        const cols = {
            percent: {
                formatter: val => {
                    val = (val * 100).toFixed(2) + "%";
                    return val;
                }
            }
        };
        return (
            <div>
                <button onClick={this.handleAdd}>添加</button>
                <ResponsiveReactGridLayout
                    layouts={layouts}
                    onLayoutChange={this.onLayoutChange}
                    style={{background:"#e3e3e3"}}
                >
                    {arr.map((item,index)=>{
                        return (
                            <div key={item.key} id={item.key} style={{background:"#fff",border:'none'}}>
                                <div className="hide-button" onClick={this.onDelete.bind(this,index)} style={{zIndex:999}}>
                                    &times;
                                </div>
                                <Chart
                                    width={350}
                                    height={220}
                                    data={dv}
                                    scale={cols}
                                    padding={[-10,100,30,0]}
                                    forceFit
                                >
                                    <Coord type="theta" radius={0.3} />
                                    <Axis name="percent" />
                                    <Legend
                                        position="right-top"
                                        offsetY={30}
                                        offsetX={-10}
                                    />
                                    <Tooltip
                                        showTitle={false}
                                        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                                    />
                                    <Geom
                                        type="intervalStack"
                                        position="percent"
                                        color="name"
                                        tooltip={[
                                            "name*percent",
                                            (item, percent) => {
                                                percent = (percent * 100).toFixed(2) + "%";
                                                return {
                                                    name: item,
                                                    value: percent
                                                };
                                            }
                                        ]}
                                        style={{
                                            lineWidth: 1,
                                            stroke: "#fff"
                                        }}
                                    >
                                        <Label
                                            content="percent"
                                            formatter={(val, item) => {
                                                return `${item.point.name} : ${val} `;
                                            }}
                                        />
                                    </Geom>
                                </Chart>
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
