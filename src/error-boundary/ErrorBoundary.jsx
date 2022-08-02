import React from "react";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
        return {hasError: true};
    }

    render() {
        if (this.state.hasError) {
            // Можно отрендерить запасной UI произвольного вида
            return <div className={"error-boundary"}>
                <strong
                    className={"error-boundary-item"}
                    style={{color: 'darkred'}}
                >
                    <p>Что-то пошло не так.</p>
                    <p>Проверьте пароль в server.js или переустановите приложение.</p>
                </strong>
            </div>;
        }

        return this.props.children;
    }
}