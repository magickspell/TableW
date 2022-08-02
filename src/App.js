import React, {useEffect} from "react";
import './App.css';
import {useState} from "react";
import {Filter} from "./components/Table/Filter";
import {Table} from "./components/Table/Table";
import {Pagination} from "./components/Table/Pagination";
import {DataProvider} from "./api/api";

//массив для тайтлов, фильтров для мапа в компоненты и т.д.
export const Titles = [{name: 'Дата', code: 'date'},
    {name: 'Название', code: 'name'},
    {name: 'Количество', code: 'quantity'},
    {name: 'Расстояние', code: 'distance'}]

function App() {

    // ставим статус загрузки для отображения лоадера
    let [loading, setLoading] = useState(true)

    //получаем размеры базы и прочеее для пагинации
    const perPage = 8 //кол-во элементов н одной страничке
    const getLength = async () => { //получаем кол-во элементов в базе
        let result = await DataProvider.getLength()
        setSize(result)
    }
    let [page, setPage] = useState(1) //текущая страница
    let [size, setSize] = useState(0) //кол-во элементов в базе
    useEffect(() => {
        if (size === 0) {
            getLength()
        }
    }, [size])

    //получаем данные с ссервера
    const getRes = async (start = 1) => {
        let result = await DataProvider.getRange(((start - 1) * perPage), perPage)
        return result
    }
    let [welbexRes, setWelbexRes] = useState([]) //элекменты из базы для текущей странички
    let [welbexResInit, setWelbexResInit] = useState([]) //инишал значение
    const setupWelbex = async () => {
        let result = await getRes(page)
        setWelbexRes(result)
    }
    useEffect(() => { //для лоадинга и фильтра
        if (welbexRes.length > 0) {
            setLoading(false)
            if (filterString.length === 0) {
                setWelbexResInit(welbexRes)
            }
        }
    }, [welbexRes])
    useEffect(() => { // при смене странички грузим новые данные
        setupWelbex()
    }, [page])

    //фильтруем
    let [filterString, setFilterString] = useState('') // строка фильтра
    let [filterColumn, setFilterColumn] = useState('name') // колонка для фильтра
    let [filterOperator, setFilterOperator] = useState('равно') // оператор фильтра
    const setupFilter = () => { // функция фильтрации
        let arr = welbexResInit.map(i => i)
        if (filterString.length !== 0) {
            if (filterOperator === 'содержит') {
                let result = arr.filter((i) => {
                    if (String(i[`${filterColumn}`]).indexOf(filterString) !== -1) {
                        return i
                    }
                })
                if (result.length === 0) {
                    setWelbexRes([{}]) // ставим пустой объект, что-бы не потрять инишал массив при отсутсвии совпадений
                } else setWelbexRes(result)
            }
            if (filterOperator === 'равно') {
                let result = arr.filter((i) => {
                    return (i[`${filterColumn}`]) == (filterString)
                })
                if (result.length === 0) {
                    setWelbexRes([{}])
                } else setWelbexRes(result)
            }
            if (filterOperator === 'больше') {
                let result = arr.filter((i) => {
                    return Number(i[`${filterColumn}`]) > Number(filterString)
                })
                if (result.length === 0) {
                    setWelbexRes([{}])
                } else setWelbexRes(result)
            }
            if (filterOperator === 'меньше') {
                let result = arr.filter((i) => {
                    return Number(i[`${filterColumn}`]) < Number(filterString)
                })
                if (result.length === 0) {
                    setWelbexRes([{}])
                } else setWelbexRes(result)
            }
        } else if (filterString.length === 0) { // еслили стерли фильтр поставили инишал значение
            setWelbexRes(arr)
        }
    }
    useEffect(() => { //фильтруем, если получили респонс от сервера
        if (welbexRes.length !== 0) {
            setupFilter()
        }
    }, [filterString, filterColumn, filterOperator, loading])
    useEffect(() => { //сбрасываем фильтр при переключении странички
        setFilterString('')
    }, [page])


    return (
        <div className={"table-wrapper"}>

            <h1>Table</h1>

            <hr/>

            <Filter
                loading={loading}
                setLoading={setLoading}
                filterString={filterString}
                setFilterString={setFilterString}
                filterColumn={filterColumn}
                setFilterColumn={setFilterColumn}
                filterOperator={filterOperator}
                setFilterOperator={setFilterOperator}
            />

            <hr/>

            <Table
                loading={loading}
                setLoading={setLoading}
                data={welbexRes}
            />

            <Pagination
                loading={loading}
                setLoading={setLoading}
                size={size}
                perPage={perPage}
                page={page}
                setPage={setPage}
            />

        </div>
    );
}

export default App;
