import React, {useState} from "react";
import {Titles} from "../../App";
import {Loader} from "../Loader/Loader";

export const Table = (props) => {

    return (

        (!props.loading) //если загрузка завершена отображаем компонент, иначе лоадер

            ? <div className={"table"}>
                <div className={"table-titles"}>
                    {
                        Titles.map((i, n) => {
                            return <strong key={n}>{i.name}</strong>
                        })
                    }
                </div>

                <div className={"table-body"}>
                    <div className={"table-body-items"}>
                        {
                            props.data.map((i, n) => {
                                return <React.Fragment key={n}>
                                    <div className={"table-body-item"}
                                         key={"table-body-item" + "date" + n}
                                    >
                                        {i.date}
                                    </div>
                                    <div className={"table-body-item"}
                                         key={"table-body-item" + "name" + n}
                                    >
                                        {i.name}
                                    </div>
                                    <div className={"table-body-item"}
                                         key={"table-body-item" + "quantity" + n}
                                    >
                                        {i.quantity}
                                    </div>
                                    <div className={"table-body-item"}
                                         key={"table-body-item" + "distance" + n}
                                    >
                                        {i.distance}
                                    </div>
                                </React.Fragment>
                            })
                        }
                    </div>
                </div>

            </div>

            : <Loader/>
    )
}