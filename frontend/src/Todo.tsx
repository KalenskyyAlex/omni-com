import './index.css'
import {Link} from "react-router-dom";

function Todo() {
    return (
        <div className="vertical-group center" style={{
            justifyContent: "center",
            gap: "24px"
        }}>
            <h1 style={{
                display: 'flex',
                alignItems: 'center',
                color: "var(--logo-quaternary)"
            }}>
                This page is still in development
            </h1>
            <Link to="/sandbox" style={{
                display: 'flex',
                alignItems: 'center',
                color: 'var(--logo-primary)'
            }}>Take Me Back</Link>
        </div>
    )
}

export default Todo;