import '../index.css';
import './Sandbox.css';

import themeSwitchLight from '../icons/theme_switch_light.svg';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import themeSwitchDark from '../../public/icons/theme_switch_dark.svg';

function Sandbox() {
    return (
        <div className="vertical-group">
            <nav>
                <div className="horizontal-group">
                    <div>Logo Todo</div>
                    <div>Guidelines Todo</div>
                </div>
                <div className="horizontal-group center" style={{
                    gap: "32px",
                }}>
                    <div className="horizontal-group center">
                        Theme
                        <img className={"theme-icon"} src={themeSwitchLight} alt=""/>
                    </div>
                    <strong>|</strong>
                    <div className="horizontal-group center" style={{
                        gap: "32px",
                    }}>
                        <div className="github-icon"></div>
                        <div className="linked-in-icon"></div>
                        <div className="telegram-icon"></div>
                    </div>
                </div>
            </nav>
            <div className="editor-container">
                <div className="code-space">
                    <div className="horizontal-group underline-group code-border">
                        <div className="horizontal-group">
                            <button id="examples" className="text-button code-primary-text tab-primary">script1.min</button>
                            <button id="examples" className="text-button code-secondary-text tab-secondary">script1.min</button>
                        </div>
                        <div className="horizontal-group">
                            <button id="upload" className="icon-button tab-secondary">
                                <div className="upload-icon"></div>
                            </button>
                            <button id="download" className="icon-button tab-secondary">
                                <div className="download-icon"></div>
                            </button>
                            <button id="examples" className="text-button code-secondary-text tab-secondary">Examples</button>
                        </div>
                    </div>
                    <div className="horizontal-group overline-group code-border" style={{
                        justifyContent: "flex-end"
                    }}>
                        <div className="line-coord">line 1, col 1</div>
                    </div>
                </div>
                <div className="terminal vertical-group dont-stretch">
                    <div className="horizontal-group underline-group terminal-border">
                        <button id="run" className="icon-button green"></button>
                        <button id="stop" className="icon-button red"></button>
                        <button id="stree" className="icon-button neutral"></button>
                        <button id="tokens" className="icon-button neutral"></button>
                    </div>
                    <div className="terminal-outlet-wrapper">
                        <div id="terminal-outlet">
                            &gt;&gt; Produced Output: <br/>
                            Lorem ipsum odor amet, consectetuer adipiscing elit. Morbi vestibulum dapibus egestas porta scelerisque. Commodo sagittis per finibus accumsan fames. Luctus senectus curae mi integer aptent. Sed consequat nostra elit, molestie tristique eu imperdiet felis. Aliquam volutpat inceptos in, vel ornare dictum hendrerit. Tellus orci eros tristique elit congue. Pretium purus lectus purus; sem torquent rutrum. Nisl nibh quam sodales accumsan suspendisse.
                            Lorem ipsum odor amet, consectetuer adipiscing elit. Morbi vestibulum dapibus egestas porta scelerisque. Commodo sagittis per finibus accumsan fames. Luctus senectus curae mi integer aptent. Sed consequat nostra elit, molestie tristique eu imperdiet felis. Aliquam volutpat inceptos in, vel ornare dictum hendrerit. Tellus orci eros tristique elit congue. Pretium purus lectus purus; sem torquent rutrum. Nisl nibh quam sodales accumsan suspendisse.
                            Lorem ipsum odor amet, consectetuer adipiscing elit. Morbi vestibulum dapibus egestas porta scelerisque. Commodo sagittis per finibus accumsan fames. Luctus senectus curae mi integer aptent. Sed consequat nostra elit, molestie tristique eu imperdiet felis. Aliquam volutpat inceptos in, vel ornare dictum hendrerit. Tellus orci eros tristique elit congue. Pretium purus lectus purus; sem torquent rutrum. Nisl nibh quam sodales accumsan suspendisse.
                            Lorem ipsum odor amet, consectetuer adipiscing elit. Morbi vestibulum dapibus egestas porta scelerisque. Commodo sagittis per finibus accumsan fames. Luctus senectus curae mi integer aptent. Sed consequat nostra elit, molestie tristique eu imperdiet felis. Aliquam volutpat inceptos in, vel ornare dictum hendrerit. Tellus orci eros tristique elit congue. Pretium purus lectus purus; sem torquent rutrum. Nisl nibh quam sodales accumsan suspendisse.
                            Lorem ipsum odor amet, consectetuer adipiscing elit. Morbi vestibulum dapibus egestas porta scelerisque. Commodo sagittis per finibus accumsan fames. Luctus senectus curae mi integer aptent. Sed consequat nostra elit, molestie tristique eu imperdiet felis. Aliquam volutpat inceptos in, vel ornare dictum hendrerit. Tellus orci eros tristique elit congue. Pretium purus lectus purus; sem torquent rutrum. Nisl nibh quam sodales accumsan suspendisse.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sandbox;
