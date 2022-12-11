import {
	minValue as nitrogenMinValue,
	maxValue as nitrogenMaxValue,
} from "./assets/objects/Nitrogen.js";
import {
	minValue as phosphorusMinValue,
	maxValue as phosphorusMaxValue,
} from "./assets/objects/Phosphorus.js";
import {
	minValue as potassiumMinValue,
	maxValue as potassiumMaxValue,
} from "./assets/objects/Potassium.js";
const MARANGAY_MASK = document.getElementById("marangay");
const MALABANAN_NORTE_MASK = document.getElementById("malabananNorte");
const CTX = document.getElementById("myChart");
const SELECT = document.getElementById("mapSelect");
const MARANGAY_CROPS = [];
const MALABANAN_NORTE_CROPS = [];
const MALABANAN_NORTE_CROPS_NITROGEN = [];
const MALABANAN_NORTE_CROPS_POTASSIUM = [];
const MALABANAN_NORTE_CROPS_PHOSPHORUS = [];
const COLORS = [
	"blue",
	"cadetblue",
	"green",
	"greenyellow",
	"yellow",
	"orange",
	"red",
];
function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generate random data for crop
for (let i = 1; i <= 440; i++) {
	const nitrogen = [];
	const phosphorus = [];
	const potassium = [];
	for (let i = 0; i < 5; i++) {
		nitrogen.push(getRndInteger(nitrogenMinValue, nitrogenMaxValue));
		phosphorus.push(getRndInteger(phosphorusMinValue, phosphorusMaxValue));
		potassium.push(getRndInteger(potassiumMinValue, potassiumMaxValue));
	}
	MALABANAN_NORTE_CROPS_NITROGEN.push({
		label: `CROP ${i} Nitrogren`,
		data: nitrogen,
		borderWidth: 1,
	});
	MALABANAN_NORTE_CROPS_PHOSPHORUS.push({
		label: `CROP ${i} Phosphorus`,
		data: phosphorus,
		borderWidth: 1,
	});
	MALABANAN_NORTE_CROPS_POTASSIUM.push({
		label: `CROP ${i} Potassium`,
		data: potassium,
		borderWidth: 1,
	});
}
const MALABANAN_NORTE_CROPS_NITROGEN_ROW_AVERAGE = [];
let rowLength = 26;
let week = [0, 0, 0, 0, 0];

let rowIndex = 1;
for (let i = 0; i < MALABANAN_NORTE_CROPS_NITROGEN.length; i++) {
	week[0] += MALABANAN_NORTE_CROPS_NITROGEN[i].data[0];
	week[1] += MALABANAN_NORTE_CROPS_NITROGEN[i].data[1];
	week[2] += MALABANAN_NORTE_CROPS_NITROGEN[i].data[2];
	week[3] += MALABANAN_NORTE_CROPS_NITROGEN[i].data[3];
	week[4] += MALABANAN_NORTE_CROPS_NITROGEN[i].data[4];
	if (i % rowLength === 0) {
		week[0] = week[0] / rowLength;
		week[1] = week[1] / rowLength;
		week[2] = week[2] / rowLength;
		week[3] = week[3] / rowLength;
		week[4] = week[4] / rowLength;

		MALABANAN_NORTE_CROPS_NITROGEN_ROW_AVERAGE.push({
			label: `Crop row ${rowIndex}`,
			data: week,
			borderWidth: 1,
		});
		week = [0, 0, 0, 0, 0];
		rowIndex += 1;
	}
	if (i === 130 - 1) {
		rowLength = rowLength - 1;
	}
	if (i === 130 - 1 + 50) {
		rowLength = rowLength - 1;
	}
	if (i === 130 - 1 + 50 + 168) {
		rowLength = rowLength - 1;
	}
	if (i === 130 - 1 + 50 + 168 + 69) {
		rowLength = rowLength - 1;
	}
	if (i === 130 - 1 + 50 + 168 + 69 + 22) {
		rowLength = rowLength - 1;
	}
}
new Chart(CTX, {
	type: "line",
	data: {
		labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
		datasets: MALABANAN_NORTE_CROPS_NITROGEN_ROW_AVERAGE,
	},
	options: {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	},
});
function colorMap(map = "MALABANAN_NORTE") {
	if (map === "MALABANAN_NORTE") {
		MARANGAY_MASK.setAttribute("style", "display: none");
		let dataIndex = 0;
		let colorIndex = 7;
		let rowIndex = 1;
		for (let i = 2; i <= 440; i++) {
			const crop = document.getElementById(`rectangle${i}`);
			// MALABANAN_NORTE_CROPS.push(crop);
			const data = MALABANAN_NORTE_CROPS_NITROGEN[dataIndex].data[0];
			if (data <= 140) {
				colorIndex -= 1;
			}
			if (data <= 120) {
				colorIndex -= 1;
			}
			if (data <= 100) {
				colorIndex -= 1;
			}
			if (data <= 80) {
				colorIndex -= 1;
			}
			if (data <= 60) {
				colorIndex -= 1;
			}
			if (data <= 40) {
				colorIndex -= 1;
			}
			if (data <= 20) {
				colorIndex = 0;
			}

			// crop.setAttribute("fill", "none");
			crop.setAttribute("fill", COLORS[colorIndex]);
			// crop.setAttribute("stroke-width", "10");
			colorIndex = 7;

			dataIndex += 1;
			if (i % rowLength === 0) {
				rowIndex += 1;
			}
			if (i === 130 - 1) {
				rowLength = rowLength - 1;
			}
			if (i === 130 - 1 + 50) {
				rowLength = rowLength - 1;
			}
			if (i === 130 - 1 + 50 + 168) {
				rowLength = rowLength - 1;
			}
			if (i === 130 - 1 + 50 + 168 + 69) {
				rowLength = rowLength - 1;
			}
			if (i === 130 - 1 + 50 + 168 + 69 + 22) {
				rowLength = rowLength - 1;
			}
		}
	} else if (map === "MARANGAY") {
		MALABANAN_NORTE_MASK.setAttribute("style", "display: none");
		let colorIndex = 0;
		for (let i = 1; i <= 263; i++) {
			const crop = document.getElementById(`crop${i}`);
			MARANGAY_CROPS.push(crop);
			crop.setAttribute("fill", COLORS[colorIndex]);
			crop.setAttribute("stroke", "none");
			colorIndex += 1;
			if (colorIndex >= COLORS.length) colorIndex = 0;
		}
	}
}
colorMap();
SELECT.addEventListener("change", (e) => {
	if (e.target.value === "MARANGAY") {
		const svgs = document.getElementsByTagName("svg");
		for (const svg of svgs) {
			if (svg.id !== "marangay") svg.setAttribute("style", "display: none");
			else if (svg.id === "marangay") {
				svg.setAttribute("style", "display: initial");
				document
					.getElementById("maskContainer")
					.setAttribute(
						"style",
						'background-image: url("./assets/map/marangay_crop.jpg")',
					);
			}
		}
		colorMap(e.target.value);
	} else if (e.target.value === "MALABANAN_NORTE") {
		const svgs = document.getElementsByTagName("svg");
		for (const svg of svgs) {
			if (svg.id !== "malabananNorte")
				svg.setAttribute("style", "display: none");
			else if (svg.id === "malabananNorte") {
				svg.setAttribute("style", "display: initial");
				document
					.getElementById("maskContainer")
					.setAttribute(
						"style",
						'background-image: url("./assets/map/malabanan_norte_crop.jpg")',
					);
			}
		}
		colorMap(e.target.value);
	}
});
