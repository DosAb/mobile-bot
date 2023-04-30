import { images } from "./static/index"
import arrow from './static/assets/arrow.svg'

export default function App()
{
    return <>
        <div className="section">
            <div className="navigation">
                <div className="row logo">
                    <h2>LOGO</h2>
                </div>
                <div className="row links">
                    <img src={arrow} alt="arrow" />
                    <h2>our showreel</h2>
                </div>
                <div className="row menu">
                    <div />
                    <div />
                    <div />
                </div>
            </div>
            <div className="hero">

            </div>
        </div>
    </>
}