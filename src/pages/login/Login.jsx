import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/apiCalls";

const Login = () => {
    const { error } = useSelector((state) => state.user);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });

        if (!error) {
            setUsername("");
            setPassword("");
            navigate("/");
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <input style={{ padding: 10, marginBottom: 20 }} type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
            <input style={{ padding: 10, marginBottom: 20 }} type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleClick} style={{ padding: 10, width: 100 }}>
                Login
            </button>
        </div>
    );
};

export default Login;
