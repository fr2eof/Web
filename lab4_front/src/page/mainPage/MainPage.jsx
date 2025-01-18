import React, {useState, useContext, useEffect} from "react";
import {Slider, TextField, Button} from "@mui/material";
import CanvasComponent from "./component/Canvas.jsx";
import {ThemeContext} from "../../theme/ThemeContext.jsx";
import "../../style/page/Main.css";
import {useToast} from "../../component/toast/ToastContext.jsx";
import Toast from "../../component/toast/Toast.jsx";
import ResultsTable from "./component/ResultsTable.jsx";
import {useDispatch} from "react-redux";
import {logout} from "../../slice/authSlice.js";
import {useLogoutUserMutation} from "../../api/authApi.js";
import {useNavigate} from "react-router-dom";
import {useAddUserPointMutation, useGetAllUserPointsQuery} from "../../api/pointsApi.js";

const MainPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {showToast} = useToast();
    const {isDarkMode} = useContext(ThemeContext);
    const [x, setX] = useState(0);
    const [y, setY] = useState("0");
    const [r, setR] = useState(1);
    const [points, setPoints] = useState([]);
    const [results, setResults] = useState([]);

    const [logoutUser] = useLogoutUserMutation();
    const [addPoint] = useAddUserPointMutation();

    
    const {data: userPoints, isLoading, isError, refetch} = useGetAllUserPointsQuery(localStorage.getItem("userId"));

    
    useEffect(() => {
        if (userPoints) {
            
            const formattedResults = userPoints.map((point, index) => ({
                id: index + 1, 
                user: localStorage.getItem("username"), 
                x: point.x,
                y: point.y,
                r: point.r,
                inside: point.inArea, 
            }));

            
            setResults(formattedResults);
        }
    }, [userPoints]);

    const validateX = (value) => {
        if (isNaN(parseFloat(value)) || !isFinite(value)) {
            showToast("Введите корректное число для X!", "error", 3000);
            return false;
        }

        const num = parseFloat(value);
        if (num < -5 || num > 3) {
            showToast("Некорректное значение X! Допустимый диапазон: от -5 до 3.", "error", 3000);
            return false;
        }

        return true;
    };

    const validateY = (value) => {
        if (isNaN(parseFloat(value)) || !isFinite(value)) {
            showToast("Введите корректное число для Y!", "error", 3000);
            return false;
        }

        const num = parseFloat(value);
        if (num < -5 || num > 3) {
            showToast("Некорректное значение Y! Допустимый диапазон: от -5 до 3.", "error", 3000);
            return false;
        }

        const decimalPart = (value.toString().split(".")[1] || "").length;
        if (decimalPart > 4) {
            showToast("Введите не более 4 знаков после запятой для Y!", "error", 3000);
            return false;
        }

        return true;
    };

    const validateR = (value) => {
        if (isNaN(parseFloat(value)) || !isFinite(value)) {
            showToast("Введите корректное число для R!", "error", 3000);
            return false;
        }

        const num = parseFloat(value);
        if (num < 0 || num > 3) {
            showToast("Некорректное значение R! Допустимый диапазон: от 0 до 3.", "error", 3000);
            return false;
        }

        return true;
    };

    const handleYChange = (e) => {
        const value = e.target.value;

        if (isNaN(parseFloat(value)) && value !== "") {
            showToast("Введите корректное число для Y!", "error", 3000);
            return;
        }

        const decimalPart = (value.toString().split(".")[1] || "").length;
        if (decimalPart <= 4) {
            setY(value);
            validateY(value);
        } else {
            const truncatedValue = parseFloat(value).toFixed(4);
            setY(truncatedValue);
            validateY(truncatedValue);
        }
    };

    const handleRChange = (e, value) => {
        setR(value);
        validateR(value);
    };

    const handleCanvasClick = async (clickX, clickY) => {
        const scale = 30;
        const planeX = ((clickX - 200) / scale).toFixed(2);
        const planeY = ((200 - clickY) / scale).toFixed(2);

        
        const xValue = parseFloat(planeX);
        const yValue = parseFloat(planeY);

        
        if (xValue < -5 || xValue > 3) {
            showToast("Некорректное значение X! Допустимый диапазон: от -5 до 3.", "error", 3000);
            return;
        }

        
        if (yValue < -5 || yValue > 3) {
            showToast("Некорректное значение Y! Допустимый диапазон: от -5 до 3.", "error", 3000);
            return;
        }

        
        if (r < 0 || r > 3) {
            showToast("Некорректное значение R! Допустимый диапазон: от 0 до 3.", "error", 3000);
            return;
        }

        
        const newPoint = {x: xValue, y: yValue, r: r};
        setPoints([newPoint]);

        const data = {
            userId: localStorage.getItem("userId"),
            x: xValue,
            y: yValue,
            r: parseFloat(r.toFixed(4)),
        };

        try {
            const response = await addPoint(data).unwrap();
            console.log(response);

            
            const newResult = {
                id: results.length + 1, 
                user: localStorage.getItem("username"), 
                x: xValue,
                y: yValue,
                r: parseFloat(r.toFixed(4)),
                inside: response.inArea, 
            };

            setResults([...results, newResult]);

            refetch();

            showToast("Данные успешно отправлены!", "success", 3000);
        } catch (error) {
            if (error.originalStatus === 401) {
                navigate("/");
                showToast("Сессия закончилась!", "info", 3000);
            } else {
                showToast("Ошибка сети!", "error", 3000);
            }
        }
    };

    const handleSubmit = async () => {
        if (!y || !validateY(y)) {
            showToast("Введите корректное значение Y!", "error", 3000);
            return;
        }
        if (!validateX(x)) {
            showToast("Введите корректное значение X!", "error", 3000);
            return;
        }
        if (!validateR(r)) {
            showToast("Введите корректное значение R!", "error", 3000);
            return;
        }

        const data = {
            userId: localStorage.getItem("userId"),
            x: parseFloat(x.toFixed(4)),
            y: parseFloat(y),
            r: parseFloat(r.toFixed(4)),
        };

        const newPoint = {x: data.x, y: data.y};
        setPoints([newPoint]);

        try {
            const response = await addPoint(data).unwrap();

            
            const newResult = {
                id: results.length + 1, 
                user: localStorage.getItem("username"), 
                x: data.x,
                y: data.y,
                r: data.r,
                inside: response.inArea, 
            };

            
            setResults([...results, newResult]);

            
            refetch();

            showToast("Данные успешно отправлены!", "success", 3000);
        } catch (error) {
            if (error.originalStatus === 401) {
                navigate("/");
                showToast("Сессия закончилась!", "info", 3000);
            } else {
                showToast("Ошибка сети!", "error", 3000);
            }
        }
    };

    const handleLogout = async () => {
        try {
            const username = localStorage.getItem("username");
            const password = "";

            if (!username) {
                showToast("Данные пользователя не найдены.", "error", 3000);
                return;
            }

            await logoutUser({username, password}).unwrap();
            dispatch(logout());
            showToast("Вы успешно вышли из системы.", "warning", 3000);
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (error) {
            console.error("Ошибка при выходе:", error);
            showToast("Ошибка при выходе из системы.", "error", 3000);
        }
    };

    return (
        <div className="main-page main-content">
            <h1>Play Ground</h1>

            <div className="input-container">
                <div>
                    <label>X (Slider):</label>
                    <Slider
                        value={x}
                        min={-5}
                        max={3}
                        step={0.1}
                        onChange={(e, value) => setX(value)}
                    />
                    <span>{x}</span>
                </div>

                <div>
                    <label>Y (Text):</label>
                    <TextField
                        value={y}
                        onChange={handleYChange}
                        className="textfield"
                    />
                </div>

                <div>
                    <label>R (Slider):</label>
                    <Slider
                        value={r}
                        min={-5}
                        max={3}
                        step={0.1}
                        onChange={handleRChange}
                    />
                    <span>{r}</span>
                </div>
            </div>

            <div className="canvas-container">
                <CanvasComponent
                    r={r}
                    points={points}
                    onCanvasClick={handleCanvasClick}
                    isDarkMode={isDarkMode}
                />
            </div>

            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{margin: "10px 0"}}
            >
                Отправить
            </Button>

            {isLoading ? (
                <p>Загрузка данных...</p>
            ) : isError ? (
                <p>Ошибка при загрузке данных</p>
            ) : (
                <ResultsTable data={results}/>
            )}

            <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
            </Button>

            <Toast/>
        </div>
    );
};

export default MainPage;