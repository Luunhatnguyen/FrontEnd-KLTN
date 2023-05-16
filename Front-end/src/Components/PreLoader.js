import React from "react";

export default function PreLoader() {
    return (
        <div className="loader-wrap">
            <div className="preloader">
                <div className="preloader-close">Preloader Close</div>
                <div id="handle-preloader" className="handle-preloader">
                    <div className="animation-preloader">
                        <div className="spinner" />
                        <div className="txt-loading">
                            <span data-text-preloader="b" className="letters-loading">
                                b
                            </span>
                            <span data-text-preloader="u" className="letters-loading">
                                u
                            </span>
                            <span data-text-preloader="s" className="letters-loading">
                                s
                            </span>
                            <span data-text-preloader="s" className="letters-loading">
                                s
                            </span>
                            <span data-text-preloader="t" className="letters-loading">
                                t
                            </span>
                            <span data-text-preloader="a" className="letters-loading">
                                a
                            </span>
                            <span data-text-preloader="t" className="letters-loading">
                                t
                            </span>
                            <span data-text-preloader="i" className="letters-loading">
                                i
                            </span>
                            <span data-text-preloader="o" className="letters-loading">
                                o
                            </span>
                            <span data-text-preloader="n" className="letters-loading">
                                n
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
