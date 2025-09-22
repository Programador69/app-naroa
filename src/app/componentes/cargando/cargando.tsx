import './cargando.css';

export function Cargando() {
    return (
        <div id="loading-pulse" className="loading-container">
            <div className="loading-pulse">
                <div className="pulse-circle"></div>
                <div className="loading-text">
                    Cargando artículos...
                    <div className="loading-subtext">Sincronizando con nuestro inventario</div>
                </div>
            </div>
        </div>
    )
}