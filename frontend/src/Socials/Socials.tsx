import '../index.css';
import './Socials.css';
import {useRef, useState} from "react";
import {Link} from "react-router-dom";
import github from "../icons/github.svg";
import linkedIn from "../icons/linked_in.svg";
import telegram from "../icons/telegram.svg";

function Socials() {
    const [isHovered, setHovered] = useState(false);
    const socialsButton = useRef<HTMLButtonElement | null>(null);

    return (
        <button ref={socialsButton}
                onMouseEnter={() => {
                    setHovered(true);
                    socialsButton.current!.style.animationPlayState = 'paused';
                    socialsButton.current!.style.backgroundSize = '0';
                }}
                onMouseLeave={() => {
                    setHovered(false);
                    socialsButton.current!.style.animationPlayState = 'running';
                    socialsButton.current!.style.backgroundSize = '24px';
                }}
                className="floating-button">
            {
                isHovered ? <div className="vertical-group" style={{
                    justifyContent: 'space-between',
                    gap: "12px"
                }}>
                    <Link target="_blank" to="https://github.com/KalenskyyAlex/omni-com">
                        <img src={github} alt="GH"/>
                    </Link>
                    <Link target="_blank" to="https://www.linkedin.com/in/o-kalenskyy">
                        <img src={linkedIn} alt="LI"/>
                    </Link>
                    <Link target="_blank" to="https://t.me/kalenskyj">
                        <img src={telegram} alt="TG"/>
                    </Link>
                </div> : null
            }

        </button>
    );
}

export default Socials;