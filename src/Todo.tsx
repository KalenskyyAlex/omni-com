import './index.css'
import {Link} from "react-router-dom";

function Todo() {
    return (
        <div className="vertical-group center" style={{
            justifyContent: "center",
            gap: "24px"
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                This page is still in development
            </div>
            <Link to="/sandbox" style={{
                display: 'flex',
                alignItems: 'center',
                color: 'var(--logo-primary)'
            }}>Take Me Back</Link>
        </div>
    )
}

export default Todo;