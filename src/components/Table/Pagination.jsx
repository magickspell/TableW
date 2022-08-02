import React, {useEffect, useState} from "react";

export const Pagination = (props) => {

    // если размер бд не равен нулю - рассчитываем элементы для пагинации
    let [countSize, setCountSize] = useState([])
    const setupPag = () => {
        let total = Math.round(props.size / props.perPage) // округляем что-бы в пагинацию вошел остаток
        console.log(`total pages: ${total}`)
        let arr = []
        for (let i = 1; i <= total; i++) {
            arr.push(i)
        }
        setCountSize(arr)
    }
    useEffect(() => {
        if (props.size !== 0) {
            setupPag()
        }
    }, [props.size])

    return (
        (!props.loading) //если загрузка завершена отображаем компонент, иначе лоадер
            ?
            <div className={"table-pagination"}>
                <hr/>
                <div className={"table-pagination-items"}>
                    {
                        (countSize.length !== 0) // если массив заполнен выводим пагинацию
                            ? countSize.map((i, n) => {
                                return <div
                                    className={
                                        (() => {
                                            // если i = текущая страница, вешаем активный стиль
                                            // что-бы покрасить в черный цвет кнопку
                                            if (i == props.page) { //не привожу к типу что-бы было красивее
                                                return "table-pagination-item active"
                                            } else {
                                                return "table-pagination-item"
                                            }
                                        })()
                                    }
                                    key={n}
                                    onClick={(e) => {
                                        props.setPage(e.currentTarget.innerText.trim())
                                    }}
                                >
                                    {i}
                                </div>
                            })

                            : []
                    }
                </div>
                <hr/>
            </div>
            : []
    )
}