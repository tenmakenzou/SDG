document.addEventListener("DOMContentLoaded", () => {
    const inputsDiv = document.getElementById("inputs");
    const evaluateBtn = document.getElementById("evaluateBtn");

    const sdgs = {
        SDG01: ["I1", "I2"],
        SDG02: ["I3", "I4"],
        SDG03: ["I5", "I6"],
        SDG04: ["I7", "I8"],
        SDG05: ["I9", "I10", "I11", "I12"],
        SDG06: ["I13", "I14"],
        SDG07: ["I15", "I16", "I17"],
        SDG09: ["I18"],
        SDG10: ["I19"],
        SDG11: ["I20", "I21"],
        SDG12: ["I22", "I23", "I24"],
        SDG13: ["I25", "I26"],
        SDG14: ["I27"],
        SDG15: ["I28"],
        SDG17: ["I30", "I31", "I32", "I33", "I34"]
    };

    const weights = {
        I1: 0.784, I2: 0.216, I3: 0.58, I4: 0.42,
        I5: 0.663, I6: 0.337, I7: 0.701, I8: 0.299,
        I9: 0.193, I10: 0.257, I11: 0.427, I12: 0.123,
        I13: 0.552, I14: 0.448, I15: 0.58, I16: 0.264,
        I17: 0.176, I18: 1, I19: 1, I20: 0.465,
        I21: 0.535, I22: 0.291, I23: 0.422, I24: 0.266,
        I25: 0.589, I26: 0.411, I27: 1, I28: 1,
        I29: 1, I30: 0.241, I31: 0.322, I32: 0.18,
        I33: 0.114, I34: 0.143
    };

    const totalScoreDiv = document.createElement("div");
    totalScoreDiv.id = "totalScoreDiv";
    totalScoreDiv.style.marginTop = "20px";
    totalScoreDiv.innerHTML = `
        <h3>Total Weighted Score: <strong id="totalScore">0.00</strong></h3>
    `;
    evaluateBtn.insertAdjacentElement("afterend", totalScoreDiv);

    const indicatorPlaceholders = {
        I3: {
            value1: "κιλά",
            value2: "αριθμός πληθυσμού",
            value3: "κιλά (year)",
            value4: "αριθμός πληθυσμού (year)"
        },
        I8: {
            value1: "αριθμός πρωτοετών φοιτητών",
            value2: "αριθμός αποφοιτήσαντων",
            value3: "αριθμός πρωτοετών φοιτητών (year)",
            value4: "αριθμός αποφοιτήσαντων (year)"
        },
        I9: {
            value1: "Number of female senior academic staff",
            value2: "Number of senior academic staff",
            value3: "Number of female senior academic staff (year)",
            value4: "Number of senior academic staff (year)"
        },
        I18: {
            value1: "Research income",
            value2: "Number of academic staff",
            value3: "Research income (year)",
            value4: "Number of academic staff (year)"
        },
        I13: {
            value1: "ποσότητα νερού σε κυβικά μέτρα",
            value2: "πληθυσμός πανεπιστημιούπολης",
            value3: "ποσότητα νερού σε κυβικά μέτρα (year)",
            value4: "πληθυσμός πανεπιστημιούπολης (year)"
        },
        I17: {
            value1: "Total energy used in Gigajoule (GJ)",
            value2: "Floor space of the university buildings in square metre (m2)",
            value3: "Total energy used in Gigajoule (GJ) (year)",
            value4: "Floor space of the university buildings in square metre (m2) (year)"
        },
        I24: {
            value1: "Amount of waste recycled",
            value2: "Amount of waste generated",
            value3: "Amount of waste recycled (year)",
            value4: "Amount of waste generated (year)"
        },
        I30: {
            value1: "Number of publications",
            value2: "Number of academic staff",
            value3: "Number of publications (year)",
            value4: "Number of academic staff (year)"
        }
    };

    Object.keys(sdgs).forEach(sdg => {
        if (sdgs[sdg].length > 0) {
            const sdgHeader = document.createElement("h3");
            sdgHeader.textContent = sdg;
            inputsDiv.appendChild(sdgHeader);

            sdgs[sdg].forEach(indicator => {
                const div = document.createElement("div");
                div.classList.add("input-group");

                let labelText = indicator;

                if (indicatorPlaceholders[indicator]) {
                    div.innerHTML = `
                        <label>${labelText}:</label>
                        <div class="indicator-inputs">
                            <input 
                                type="number" 
                                class="value" 
                                id="${indicator}_value1" 
                                name="${indicator}_value1" 
                                placeholder="${indicatorPlaceholders[indicator].value1}" 
                                step="0.1"
                            >
                            <input 
                                type="number" 
                                class="value" 
                                id="${indicator}_value2" 
                                name="${indicator}_value2" 
                                placeholder="${indicatorPlaceholders[indicator].value2}" 
                                step="0.1"
                            >
                            <input 
                                type="number" 
                                class="value" 
                                id="${indicator}_value3" 
                                name="${indicator}_value3" 
                                placeholder="${indicatorPlaceholders[indicator].value3}" 
                                step="0.1"
                            >
                            <input 
                                type="number" 
                                class="value" 
                                id="${indicator}_value4" 
                                name="${indicator}_value4" 
                                placeholder="${indicatorPlaceholders[indicator].value4}" 
                                step="0.1"
                            >
                        </div>
                        <p id="${indicator}_result" class="indicator-result">Weighted Score: </p>
                        <p id="${indicator}_feedback" class="indicator-feedback"></p>
                    `;
                } else {
                    div.innerHTML = `
                        <label>${labelText}:</label>
                        <div class="indicator-inputs">
                            <input 
                                type="number" 
                                class="value" 
                                id="${indicator}_value1" 
                                name="${indicator}_value1" 
                                placeholder="Enter value" 
                                step="0.1"
                            >
                            <input 
                                type="number" 
                                class="value" 
                                id="${indicator}_value2" 
                                name="${indicator}_value2" 
                                placeholder="Enter value" 
                                step="0.1"
                            >
                            <input 
                                type="number" 
                                class="value" 
                                id="${indicator}_value3" 
                                name="${indicator}_value3" 
                                placeholder="Enter value" 
                                step="0.1"
                            >
                        </div>
                        <p id="${indicator}_result" class="indicator-result">Weighted Score: </p>
                        <p id="${indicator}_feedback" class="indicator-feedback"></p>
                    `;
                }
                inputsDiv.appendChild(div);
            });
        }
    });

    function resetResults() {
        Object.keys(sdgs).forEach(sdg => {
            sdgs[sdg].forEach(indicator => {
                const result = document.getElementById(`${indicator}_result`);
                const feedback = document.getElementById(`${indicator}_feedback`);
                if (result) result.textContent = `Weighted Score: `;
                if (feedback) feedback.textContent = ``;
            });
        });
        document.getElementById("totalScore").textContent = "0.00";
    }

    function displayIndicatorResults(indicator, weightedScore, feedbackMessage) {
        const result = document.getElementById(`${indicator}_result`);
        const feedback = document.getElementById(`${indicator}_feedback`);

        if (result) result.textContent = `Weighted Score: ${weightedScore.toFixed(2)}`;
        if (feedback && feedbackMessage) feedback.textContent = feedbackMessage;
    }

    function updateTotalScore(totalScore) {
        const totalScoreElement = document.getElementById("totalScore");
        totalScoreElement.textContent = totalScore.toFixed(2);
    }

    evaluateBtn.addEventListener("click", () => {
        resetResults();

        let totalScore = 0;

        Object.keys(sdgs).forEach(sdg => {
            sdgs[sdg].forEach(indicator => {
                const value1 = parseFloat(document.getElementById(`${indicator}_value1`).value);
                const value2 = parseFloat(document.getElementById(`${indicator}_value2`).value);
                const value3 = parseFloat(document.getElementById(`${indicator}_value3`).value);
                const value4 = document.getElementById(`${indicator}_value4`)
                    ? parseFloat(document.getElementById(`${indicator}_value4`).value)
                    : NaN;

                if (!isNaN(value1) && !isNaN(value2) && !isNaN(value3)) {
                    let F = value1 + value2;
                    let E = value3 + value4;

                    const percentageChange = F / E;

                    let result = 0;

                    if (indicator === "I8" || indicator === "I9") {
                        if (percentageChange < 1) {
                            result = 0;
                        } else {
                            result = percentageChange;
                        }
                        const weightedScore = result * weights[indicator];
                        totalScore += weightedScore;

                        displayIndicatorResults(indicator, weightedScore, `${indicator} Calculation.`);
                    } else if (indicator === "I13" || indicator === "I17") {
                        if (percentageChange < 1) {
                            result = 1 / percentageChange;
                        } else {
                            result = 0;
                        }

                        const normalizedResult = result / (1 / result);
                        const weightedScore = normalizedResult * weights[indicator];
                        totalScore += weightedScore;

                        displayIndicatorResults(indicator, weightedScore, `${indicator} Special calculation.`);
                    } else if (indicator === "I18") {
                        if (percentageChange < 1) {
                            result = 0;
                        } else {
                            result = percentageChange;
                        }
                        const weightedScore = result * weights[indicator];
                        totalScore += weightedScore;

                        displayIndicatorResults(indicator, weightedScore, `${indicator} Division calculation.`);
                    } else if (indicator === "I24") {
                        if (percentageChange < 1) {
                            result = 1 / percentageChange;
                        } else {
                            result = 0;
                        }

                        const weightedScore = result * weights[indicator];
                        totalScore += weightedScore;

                        displayIndicatorResults(indicator, weightedScore, `${indicator} Division calculation.`);
                    } else if (indicator === "I30") {
                        if (percentageChange < 1) {
                            result = 0;
                        } else {
                            result = percentageChange;
                        }

                        const weightedScore = result * weights[indicator];
                        totalScore += weightedScore;

                        displayIndicatorResults(indicator, weightedScore, `${indicator} Division calculation.`);
                    } else if (indicator === "I3") {
                        if (value1 && value2) {
                            const result = (value1 / value2);
                            const weightedScore = result * weights[indicator];
                            totalScore += weightedScore;

                            displayIndicatorResults(indicator, weightedScore, `${indicator} Ratio calculation.`);
                        }
                    } else {
                        const result = (value1 + value2 + value3);
                        const weightedScore = result * weights[indicator];
                        totalScore += weightedScore;
                    
                        const rangeCheckIndicators1 = [
                            "I1", "I2", "I4", "I5", "I6", "I7", "I20", "I25", "I31", "I32"
                        ];
                    
                        const rangeCheckIndicators2 = [
                            "I10", "I11", "I12", "I14", "I15", "I16", "I19", "I21", "I22", "I23", "I26", "I27", "I28", "I29", "I33", "I34"
                        ];
                    
                        if (rangeCheckIndicators1.includes(indicator) && weightedScore >= 0 && weightedScore <= 2.25) {
                            const feedbackMessage = `More things can be done.`;
                            displayIndicatorResults(indicator, weightedScore, feedbackMessage);
                        } else if (rangeCheckIndicators2.includes(indicator) && weightedScore  >= 0 && weightedScore  <= 2) {
                            const feedbackMessage = ` More things can be done.`;
                            displayIndicatorResults(indicator, weightedScore, feedbackMessage);
                        } else {
                            displayIndicatorResults(indicator, weightedScore, `${indicator} Sum calculation.`);
                        }
                    }
                    
                }
            });
        });

        updateTotalScore(totalScore);
    });
});
