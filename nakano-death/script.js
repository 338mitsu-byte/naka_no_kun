// SVG Path Data (Precise boundaries from nakano_ku_18cho.json)
const mapPaths = {
    "kamitakada": "M 415.3,298.4 L 373.0,341.9 L 390.3,370.6 L 442.6,381.5 L 462.4,381.1 L 491.9,367.4 L 469.9,358.0 L 485.6,341.6 L 484.2,333.3 L 464.3,330.5 L 459.7,300.9 L 431.4,286.2 L 415.3,298.4 Z",
    "higashinakano": "M 491.9,367.4 L 462.4,381.1 L 459.1,398.8 L 441.2,400.1 L 474.4,441.0 L 530.2,436.2 L 538.5,390.2 L 585.0,360.0 L 550.0,357.5 L 491.9,367.4 Z",
    "chuo": "M 530.2,436.2 L 474.5,441.0 L 357.0,424.4 L 340.4,447.5 L 320.1,447.0 L 322.2,469.7 L 420.2,468.6 L 436.4,468.4 L 458.1,470.9 L 524.5,478.8 L 538.5,452.7 L 530.2,436.2 Z",
    "honcho": "M 525.2,478.8 L 436.5,468.4 L 322.2,469.7 L 309.6,478.4 L 314.0,491.6 L 347.2,487.2 L 365.6,501.5 L 363.7,523.3 L 399.9,517.5 L 424.0,505.8 L 453.1,507.2 L 477.6,514.6 L 499.3,510.1 L 515.4,495.3 L 525.2,478.8 Z",
    "yayoimachi": "M 499.1,510.1 L 477.6,514.6 L 453.2,507.3 L 424.0,505.8 L 399.9,517.5 L 363.7,523.3 L 338.5,538.2 L 334.8,547.6 L 316.1,557.0 L 299.8,558.0 L 305.8,573.7 L 311.4,578.0 L 365.7,562.4 L 380.3,561.6 L 408.5,560.1 L 425.2,559.2 L 454.3,550.8 L 481.4,526.1 L 500.3,513.8 L 499.1,510.1 Z",
    "minamidai": "M 454.0,550.8 L 425.2,559.2 L 365.8,562.4 L 308.2,578.8 L 300.5,586.5 L 311.5,603.3 L 301.2,612.1 L 321.2,609.7 L 329.0,616.2 L 338.1,615.6 L 338.3,621.8 L 345.8,621.8 L 343.7,630.6 L 334.1,628.9 L 338.8,640.5 L 350.0,636.3 L 358.3,622.8 L 373.5,609.8 L 399.5,599.9 L 415.6,585.0 L 424.0,581.4 L 437.3,563.4 L 454.0,550.8 Z",
    "nakano": "M 462.4,381.1 L 442.6,381.5 L 390.6,370.7 L 376.3,368.9 L 365.6,368.2 L 347.2,368.3 L 286.2,369.3 L 286.4,374.7 L 290.7,374.4 L 292.1,404.4 L 290.0,407.3 L 315.0,410.6 L 315.9,429.2 L 312.2,438.6 L 317.5,438.6 L 319.9,447.0 L 340.2,447.5 L 357.0,424.4 L 435.1,435.3 L 474.5,441.0 L 441.2,400.1 L 459.2,398.7 L 462.4,381.1 Z",
    "kamisaginomiya": "M 141.1,236.0 L 138.9,222.5 L 124.9,217.4 L 111.6,184.5 L 104.4,186.7 L 89.7,159.5 L 40.0,163.6 L 15.0,208.5 L 24.8,226.7 L 86.4,227.5 L 141.1,236.0 Z",
    "saginomiya": "M 221.1,278.5 L 215.5,273.1 L 218.1,271.1 L 219.5,255.2 L 223.2,232.3 L 204.8,232.2 L 204.3,242.7 L 141.3,236.2 L 86.0,227.5 L 24.8,226.7 L 42.3,257.3 L 96.4,263.7 L 128.7,264.6 L 178.6,265.9 L 221.1,278.5 Z",
    "eharacho": "M 398.1,174.4 L 391.7,183.3 L 385.2,181.4 L 381.9,187.5 L 374.2,186.6 L 372.3,193.6 L 363.0,193.0 L 363.0,194.8 L 372.6,209.3 L 372.8,216.6 L 374.1,218.6 L 376.3,220.0 L 385.1,221.7 L 393.3,224.8 L 390.6,231.2 L 442.2,226.9 L 443.8,206.1 L 449.8,208.6 L 453.6,199.5 L 426.0,178.8 L 413.4,175.0 L 398.1,174.4 Z",
    "egota": "M 304.0,231.5 L 304.2,239.9 L 291.0,239.5 L 290.0,263.1 L 318.4,255.5 L 393.4,253.8 L 418.6,257.5 L 433.3,256.3 L 431.6,252.2 L 434.9,238.0 L 442.0,227.0 L 390.6,231.1 L 393.3,224.8 L 385.1,221.7 L 376.3,220.0 L 374.1,218.6 L 372.8,216.6 L 372.6,209.2 L 363.0,194.8 L 356.0,193.0 L 349.9,192.6 L 344.6,194.8 L 342.2,201.0 L 339.5,205.9 L 338.5,211.6 L 331.8,223.0 L 321.9,229.1 L 312.8,231.9 L 304.0,231.5 Z",
    "matsugaoka": "M 377.9,254.1 L 378.9,261.6 L 377.2,265.9 L 381.4,290.9 L 380.4,298.2 L 375.4,303.7 L 397.9,316.2 L 413.7,299.9 L 419.1,292.4 L 414.9,289.2 L 416.7,281.9 L 424.0,283.2 L 427.4,274.7 L 434.7,275.4 L 436.3,267.7 L 432.4,256.2 L 418.6,257.5 L 393.3,253.8 L 377.9,254.1 Z",
    "maruyama": "M 223.2,232.3 L 219.6,255.1 L 252.2,262.7 L 287.2,263.7 L 288.2,263.5 L 290.0,263.1 L 291.0,239.5 L 273.8,235.3 L 257.7,234.5 L 256.6,235.7 L 223.2,232.3 Z",
    "shirasagi": "M 149.9,325.5 L 154.1,313.9 L 146.9,310.9 L 143.2,310.5 L 139.2,307.7 L 138.2,304.6 L 142.2,296.8 L 144.1,291.1 L 141.7,272.4 L 127.8,264.7 L 96.1,263.7 L 42.3,257.3 L 47.2,270.8 L 58.6,283.5 L 65.6,280.2 L 75.5,287.9 L 71.2,298.8 L 79.4,310.0 L 122.1,314.9 L 149.9,325.5 Z",
    "wakamiya": "M 204.3,320.5 L 214.6,320.0 L 226.0,321.7 L 231.0,321.1 L 228.6,308.8 L 231.2,287.4 L 220.7,278.4 L 178.8,266.0 L 127.1,264.6 L 128.2,264.7 L 141.7,272.4 L 144.1,291.1 L 142.0,297.1 L 138.0,304.4 L 139.1,307.7 L 143.2,310.5 L 146.9,310.9 L 154.2,313.9 L 171.7,320.3 L 176.1,326.4 L 186.8,329.4 L 196.6,324.8 L 204.3,320.5 Z",
    "yamatocho": "M 260.1,375.5 L 256.3,343.0 L 255.7,333.3 L 255.8,308.8 L 251.5,308.6 L 230.8,321.1 L 226.0,321.7 L 214.5,319.9 L 204.4,320.6 L 186.8,329.4 L 176.1,326.4 L 171.8,320.3 L 154.1,313.9 L 149.7,325.5 L 156.9,328.4 L 155.3,345.3 L 166.2,354.1 L 232.8,372.7 L 234.9,376.1 L 260.1,375.5 Z",
    "numabukuro": "M 287.2,263.7 L 289.1,266.9 L 288.1,284.0 L 297.0,288.0 L 295.7,290.1 L 294.5,292.2 L 291.1,303.3 L 288.2,307.4 L 287.7,311.0 L 295.6,322.3 L 301.6,319.3 L 303.1,316.7 L 308.1,312.4 L 311.7,310.9 L 325.3,300.5 L 326.2,301.2 L 327.5,301.6 L 330.2,301.6 L 332.6,299.8 L 332.7,297.8 L 335.6,295.8 L 344.9,296.7 L 346.3,298.9 L 349.5,303.9 L 355.8,306.6 L 364.9,308.2 L 370.7,306.6 L 375.4,303.7 L 380.4,298.1 L 381.3,290.4 L 377.2,265.8 L 378.9,261.6 L 377.8,254.1 L 318.4,255.5 L 287.2,263.7 Z",
    "arai": "M 295.6,322.3 L 301.0,333.2 L 306.4,340.9 L 308.4,350.5 L 308.4,356.5 L 309.6,368.8 L 365.6,368.2 L 376.1,369.0 L 390.3,370.6 L 373.0,341.9 L 397.9,316.2 L 375.4,303.7 L 370.7,306.6 L 364.9,308.2 L 355.8,306.7 L 349.5,303.9 L 344.9,296.7 L 335.6,295.8 L 332.8,297.7 L 332.6,299.8 L 330.2,301.6 L 327.5,301.6 L 326.2,301.2 L 325.3,300.5 L 311.6,311.0 L 308.1,312.4 L 303.1,316.7 L 301.6,319.3 L 295.6,322.3 Z",
    "nogata": "M 219.5,255.1 L 218.1,271.0 L 215.4,273.2 L 231.3,287.5 L 228.7,308.9 L 231.0,321.0 L 251.5,308.6 L 255.8,308.8 L 255.9,333.8 L 256.3,343.2 L 260.1,375.4 L 286.3,374.7 L 286.1,369.2 L 309.5,368.9 L 308.3,356.6 L 308.3,350.8 L 306.4,340.7 L 301.0,333.2 L 295.5,322.2 L 287.8,311.0 L 288.2,307.4 L 291.0,303.4 L 294.5,292.2 L 297.0,288.0 L 288.1,284.0 L 289.1,266.9 L 287.2,263.7 L 252.2,262.7 L 219.5,255.1 Z"
};

// Note: "ekota" key in mapPaths matches "egota" in config.js (id correction needed below)
// I'll map them carefully.

const svgContainer = document.getElementById('nakano-map');
const modal = document.getElementById('video-modal');
const modalTitle = document.getElementById('modal-title');
const closeBtn = document.querySelector('.close-btn');

let player;

// 1. Initialize Map
function initMap() {
    // 手動座標指定（必要エリアのみ）
    const manualPositions = {
        nogata: { y: 290 },          // 野方
        egota: { y: 238 },           // 江古田
        matsugaoka: { y: 270 },      // 松が丘
        numabukuro: { y: 278 },      // 沼袋
        higashinakano: { x: 500 },   // 東中野
        nakano: { y: 400 },          // 中野
        honcho: { y: 490 },          // 本町
        minamidai: { y: 585 }        // 南台
    };

    // Generate paths
    areas.forEach(area => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const pathData = mapPaths[area.id] || mapPaths[area.id.replace('egota', 'ekota')];

        if (pathData) {
            path.setAttribute("d", pathData);
            path.setAttribute("class", "area");
            path.setAttribute("id", area.id);
            path.addEventListener('click', () => openModal(area));

            // ラベル生成
            const bbox = getApproxCenter(pathData);
            const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

            let x = bbox.x;
            let y = bbox.y;

            // 手動指定がある場合は上書き
            if (manualPositions[area.id]) {
                if (manualPositions[area.id].x !== undefined) {
                    x = manualPositions[area.id].x;
                }
                if (manualPositions[area.id].y !== undefined) {
                    y = manualPositions[area.id].y;
                }
            }

            text.setAttribute("x", x);
            text.setAttribute("y", y);

            // 中央基準にする（おすすめ）
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("dominant-baseline", "middle");

            text.setAttribute("class", "label");
            text.textContent = area.name;

            svgContainer.appendChild(path);
            svgContainer.appendChild(text);
        } else {
            console.warn(`No path data for ${area.id}`);
        }
    });
}


// Helper to find approx center of a path string (simplified)
function getApproxCenter(d) {
    const numbers = d.match(/[-+]?[0-9]*\.?[0-9]+/g).map(Number);
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

    for (let i = 0; i < numbers.length; i += 2) {
        const x = numbers[i];
        const y = numbers[i + 1];
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    }

    return {
        x: minX + (maxX - minX) / 2,
        y: minY + (maxY - minY) / 2
    };
}

// 2. YouTube API Logic
function onYouTubeIframeAPIReady() {
    // API is ready
}

function openModal(area) {
    modal.style.display = "flex";
    modalTitle.textContent = area.name;

    if (player) {
        player.loadVideoById(area.videoId);
    } else {
        player = new YT.Player('player', {
            height: '100%',
            width: '100%',
            videoId: area.videoId,
            events: {
                'onReady': (event) => event.target.playVideo()
            }
        });
    }
}

// 3. Modal Controls
closeBtn.onclick = function () {
    closeModal();
}

window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}

function closeModal() {
    modal.style.display = "none";
    if (player) {
        player.stopVideo();
    }
}

// Init
document.addEventListener('DOMContentLoaded', initMap);
