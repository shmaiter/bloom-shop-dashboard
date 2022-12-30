import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestedMethods";

export default function Home() {
    const [userStats, setUserStats] = useState([]);

    /* 
      function TodoList({ todos, tab, theme }) {
        const visibleTodos = filterTodos(todos, tab);
        // ...
      }

      if you’re filtering or transforming a large array, or doing some expensive computation, 
      you might want to skip doing it again if data hasn’t changed. If both todos and tab 
      are the same as they were during the last render, wrapping the calculation in useMemo 
      like earlier lets you reuse visibleTodos you’ve already calculated before. 
      This type of caching is called memoization.

      You should only rely on useMemo as a performance optimization. If your code doesn’t work without it, 
      find the underlying problem and fix it first. Then you may add useMemo to improve performance.

      ... to measure expensive calculations
      console.time("filter array");
      // functionCall()
      console.timeEnd("filter array");

       If the overall logged time adds up to a significant amount (say, 1ms or more), 
       it might make sense to memoize that calculation.
  */

    const MONTHS = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Agu", "Sep", "Oct", "Nov", "Dec"], []);

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("/users/stats/month");
                res.data.map((item) => setUserStats((prev) => [...prev, { name: MONTHS[item._id - 1], "Active User": item.total }]));
            } catch (err) {
                console.log(err);
            }
        };

        getStats();
    }, [MONTHS]);

    return (
        <div className="home">
            <FeaturedInfo />
            <Chart data={userStats} title="User Analytics" grid dataKey="Active User" />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    );
}
