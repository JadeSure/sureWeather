import React from 'react'
import './icon.css'

function Cloudy() {

    return (
        <div className="icon cloudy">
            <div className="cloud"></div>
            <div className="cloud"></div>
        </div>
    )
}

function Flurries() {
    return (
        <div className="icon flurries">
            <div className="cloud"></div>
            <div className="snow">
                <div className="flake"></div>
                <div className="flake"></div>
            </div>
        </div>
    )
}

function Rainy() {
    return (
        <div className="icon rainy">
            <div className="cloud"></div>
            <div className="rain"></div>
        </div>
    )
}

function Sunny() {
    return (
        <div className="icon sunny">
            <div className="sun">
                <div className="rays"></div>
            </div>
        </div>
    )
}

function Sunshower() {
    return (
        <div className="icon sun-shower">
            <div className="cloud"></div>
            <div className="sun">
                <div className="rays"></div>
            </div>
            <div className="rain"></div>
        </div>
    )
}

function Thunderstorm() {
    return (
        <div className="icon thunder-storm">
            <div className="cloud"></div>
            <div className="lightning">
                <div className="bolt"></div>
                <div className="bolt"></div>
            </div>
        </div>
    )
}

export { Cloudy, Flurries, Rainy, Sunny, Sunshower, Thunderstorm }
