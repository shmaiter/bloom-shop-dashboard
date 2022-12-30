import "./widgetLg.css";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestedMethods";

export default function WidgetLg() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await userRequest.get("orders/?new=true");
                setOrders(res.data.orders);
            } catch (error) {
                console.log(error);
            }
        };
        getOrders();
    }, []);

    const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>;
    };
    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest transactions</h3>
            <table className="widgetLgTable">
                <thead className="widgetLgTr">
                    <tr>
                        <th className="widgetLgTh">Customer</th>
                        <th className="widgetLgTh">Date</th>
                        <th className="widgetLgTh">Amount</th>
                        <th className="widgetLgTh">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id} className="widgetLgTr">
                            <td className="widgetLgUser">
                                <img src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" className="widgetLgImg" />
                                <span className="widgetLgName">{order.userId}</span>
                            </td>
                            <td className="widgetLgDate">{order.createdAt}</td>
                            <td className="widgetLgAmount">$ {order.amount}</td>
                            <td className="widgetLgStatus">
                                <Button type={order.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
