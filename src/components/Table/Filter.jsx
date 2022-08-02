import React, {useState} from "react";
import {Titles} from "../../App";

export const Filter = (props) => {
    //масств для тайтлов, фильтров для мапа в компоненты и т.д.
    let Filters = Titles.slice(1, Titles.length)

    return (
        <>
            <strong>filter</strong>
            <div className={"table-filter"}>
                <div className={"table-filter-column"}>
                    <select name="column"
                            id="column-select"
                            value={props.filterColumn}
                            onChange={(e) => {
                                props.setFilterColumn(e.currentTarget.value)
                            }}
                    >
                        {
                            Filters.map((i, n) => {
                                return <option key={n}
                                               value={i.code}>{i.name}</option>
                            })
                        }
                    </select>
                </div>

                <div className={"table-filter-operator"}>
                    <select name="operator"
                            id="operator-select"
                            value={props.filterOperator}
                            onChange={(e) => {
                                props.setFilterOperator(e.currentTarget.value)
                            }}
                    >
                        <option value="равно">равно</option>
                        <option value="содержит">содержит</option>
                        <option value="больше">больше</option>
                        <option value="меньше">меньше</option>
                    </select>
                </div>

                <div className={"table-filter-input"}>
                    <input type="text" value={props.filterString}
                           onChange={(e) => {
                               props.setFilterString(e.currentTarget.value)
                           }}
                    />
                </div>
            </div>
        </>
    )
}