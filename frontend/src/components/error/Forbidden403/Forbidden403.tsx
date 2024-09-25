import '../../../index.css';
import '../error.css';
import { Link } from "react-router-dom";
import Socials from "../../common/Socials/Socials";
import Navbar from "../../common/Navbar/Navbar";

function Forbidden403() {
    return (
        <div className="vertical-group">
            <Navbar />
            <Socials />

            <div className="vertical-group" style={{
                flexGrow: 1,
                justifyContent: "center"
            }}>
                <div className="vertical-group center gap16">
                    <div className="vertical-group center gap0">
                        <p className="kimberley error-code">403</p>
                        <p className="kimberley error-header">Forbidden</p>
                    </div>
                    <div className="vertical-group center gap8">
                        <p className="kimberley error-description">You do not have permission to view this page</p>
                        <Link className="link" to="/">Take Me Back</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forbidden403;
