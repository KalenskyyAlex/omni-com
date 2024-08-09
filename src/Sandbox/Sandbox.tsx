import '../index.css';
import './Sandbox.css';

function Sandbox() {
    return (
        <div className="vertical-group">
            <nav>
                <div className="horizontal-group">
                    <div>Logo Todo</div>
                    <div>Guidelines Todo</div>
                </div>
                <div className="horizontal-group">
                    <div>Theme Todo</div>
                    <div>| Todo</div>
                    <div>Socials</div>
                </div>
            </nav>
            <div className="editor-container">
                <div className="code-space">
                    <div className="horizontal-group underline-group code-border">
                        <div className="horizontal-group">
                            <button id="examples" className="text-button code-primary-text accent">script1.min</button>
                            <button id="examples" className="text-button code-secondary-text neutral">script1.min</button>
                        </div>
                        <div className="horizontal-group">
                            <button id="upload" className="icon-button neutral"></button>
                            <button id="download" className="icon-button neutral"></button>
                            <button id="examples" className="text-button code-secondary-text neutral">Examples</button>
                        </div>
                    </div>
                    <div className="horizontal-group overline-group code-border" style={{
                        justifyContent: "flex-end"
                    }}>
                        <text className="code-secondary-text">line 1, col 1</text>
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
