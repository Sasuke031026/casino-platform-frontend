import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import { CountUp } from "use-count-up";
import Action from "../../Service/action";

const columns = [
    {
        title: "Place",
        dataIndex: "place",
        key: "place",
    },
    {
        title: "Player",
        dataIndex: "player",
        key: "player",
    },
    {
        title: "Profit(ATRI)",
        dataIndex: "profit",
        key: "profit",
        render: (tag) => {
            let color = "green";
            return (
                <Tag color={color}>
                    +<CountUp isCounting end={Number(tag)} duration={1.5} />
                </Tag>
            );
        },
    },
];

export default function Dashboard() {
    const [allData, setAllData] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setInterval(async () => {
            var result = await Action.playInfo();
            if (result) {
                setAllData(result);
            }
        }, 2000);
    }, []);

    useEffect(() => {
        var data = [];
        for (var i = 0; i < allData.length; i++) {
            var bump = {
                place: i + 1,
                player: allData[i]._id.name,
                profit: Number(allData[i].cashAmount).toFixed(0),
            };
            data.push(bump);
        }
        setProducts(data);
    }, [allData]);

    return (
        <section className="container">
            <div className="row">
                <div className="col-sm-12">
                    <Table columns={columns} dataSource={products} />
                </div>
            </div>
        </section>
    );
}
