let configData = {};  // This will store the generated config data

function toggleEmaFields() {
    const emaFields = document.getElementById("emaFields");
    emaFields.style.display = document.getElementById("isEmaOn").checked ? "block" : "none";
    scrollToTop();  // Scroll to the top when EMA checkbox is toggled
}

function toggleDiaryFields() {
    const diaryFields = document.getElementById("diaryFields");
    diaryFields.style.display = document.getElementById("isDiaryOn").checked ? "block" : "none";
    scrollToTop();  // Scroll to the top when Diary checkbox is toggled
}

function toggleGarminFields() {
    const garminFields = document.getElementById("garminFields");
    garminFields.style.display = document.getElementById("isGarminOn").checked ? "block" : "none";
    scrollToTop();  // Scroll to the top when Garmin checkbox is toggled
}

function toggleAnnouncementsFields() {
    const announcementsFields = document.getElementById("announcementsFields");
    announcementsFields.style.display = document.getElementById("isAnnouncementsOn").checked ? "block" : "none";
    scrollToTop();  // Scroll to the top when Announcements checkbox is toggled
}

// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo(0, 0);  // Scroll to the top of the page
}

function generateConfig() {
    configData = {
        App: {
            auth_key: document.getElementById("auth_key").value,
            serverName: document.getElementById("serverName").value,
            isEmaOn: document.getElementById("isEmaOn").checked,  
            isDiaryOn: document.getElementById("isDiaryOn").checked,  
            isGarminOn: document.getElementById("isGarminOn").checked,  
            isAnnouncementsOn: document.getElementById("isAnnouncementsOn").checked,
            studyName: document.getElementById("studyName").value,
            studyPI: document.getElementById("studyPI").value,
            studyPIContact: document.getElementById("studyPIContact").value,
            configRefreshTime: parseInt(document.getElementById("configRefreshTime").value),
            upload_DATA: document.getElementById("upload_DATA").checked,
            require_WIFI_FOR_UPLOAD: document.getElementById("require_WIFI_FOR_UPLOAD").checked,
            require_CHARGING_FOR_UPLOAD: document.getElementById("require_CHARGING_FOR_UPLOAD").checked,
            enable_HK_DUMP: document.getElementById("enable_HK_DUMP").checked,
            enable_LOCATION_UPDATES: document.getElementById("enable_LOCATION_UPDATES").checked,
            use_BACKEND_AUTH_KEY: document.getElementById("use_BACKEND_AUTH_KEY").checked,
            save_LOGS: document.getElementById("save_LOGS").checked,
            hb_TIME_TICK: parseInt(document.getElementById("hb_TIME_TICK").value),
            db_DUMP_TIME: parseInt(document.getElementById("db_DUMP_TIME").value),
            hk_DUMP_INTERVAL: parseInt(document.getElementById("hk_DUMP_INTERVAL").value),
            max_UPLOAD_INTERVAL: parseInt(document.getElementById("max_UPLOAD_INTERVAL").value),
            serverUpdateButton: document.getElementById("serverUpdateButton").checked,
        }
    };

    // EMA section
    if (document.getElementById("isEmaOn").checked) {
        configData.Ema = {
            automaticReloadInterval: parseFloat(document.getElementById("automaticReloadInterval").value),
            blackoutTimes: convertToArray(document.getElementById("blackoutTimes").value),
            repeatingSchedule: convertToArray(document.getElementById("repeatingSchedule").value),
            repeatingMessages: convertToMessagesArray(document.getElementById("repeatingMessages").value),
            realTimeRepeatingSchedule: convertToArray(document.getElementById("realTimeRepeatingSchedule").value),
            realTimeRepeatingMessages: convertToMessagesArray(document.getElementById("realTimeRepeatingMessages").value),
            // blackoutTimes: JSON.parse(document.getElementById("blackoutTimes").value),
            // repeatingSchedule: JSON.parse(document.getElementById("repeatingSchedule").value),
            // repeatingMessages: document.getElementById("repeatingMessages").value.split("\n"),
            // realTimeRepeatingSchedule: JSON.parse(document.getElementById("realTimeRepeatingSchedule").value),
            // realTimeRepeatingMessages: document.getElementById("realTimeRepeatingMessages").value.split("\n"),
        };
    }

    // Diary section
    if (document.getElementById("isDiaryOn").checked) {
        configData.Diary = {
            dailyDiaryNotification: document.getElementById("dailyDiaryNotification").checked,
            dailyDiaryNotificationTime: convertToArray(document.getElementById("dailyDiaryNotificationTime").value), 
            dailyDiaryNotificationMessage: document.getElementById("dailyDiaryNotificationMessage").value,
            dailyDiaryFileSize: parseFloat(document.getElementById("dailyDiaryFileSize").value),
            dailyDiaryDuration: parseFloat(document.getElementById("dailyDiaryDuration").value),
            // dailyDiaryNotificationTime: JSON.parse(document.getElementById("dailyDiaryNotificationTime").value || "[20, 30]"),
            // dailyDiaryNotificationMessage: document.getElementById("dailyDiaryNotificationMessage").value,
            // dailyDiaryFileSize: parseFloat(document.getElementById("dailyDiaryFileSize").value) || 100.0,
            // dailyDiaryDuration: parseFloat(document.getElementById("dailyDiaryDuration").value) || 150.0,
        };
    }

    // Garmin section
    if (document.getElementById("isGarminOn").checked) {
        configData.Garmin = {
            garminBatteryLeftNotification: document.getElementById("garminBatteryLeftNotification").checked,
            garminBatteryPercentage: parseInt(document.getElementById("garminBatteryPercentage").value),
            garminBatteryNotificationInterval: parseFloat(document.getElementById("garminBatteryNotificationInterval").value),
            collectAcc: document.getElementById("collectAcc").checked,
            garminNotificationTime: parseFloat(document.getElementById("garminNotificationTime").value),
        };
    }

    // Announcements section
    if (document.getElementById("isAnnouncementsOn").checked) {
        configData.Announcements = {
            introChatMessage: document.getElementById("introChatMessage").value,
        };
    }

    // Output the generated JSON
    document.getElementById("output").textContent = JSON.stringify(configData, null, 2);
}

function convertToArray(input) {
    return input.split(',').map(item => parseInt(item.trim())).filter(item => !isNaN(item));
}

// function convertToMessagesArray(input) {
//     return input.split(',').map(item => `"${item.trim()}"`).filter(item => item.length > 0);
// }
function convertToMessagesArray(input) {
    return input.split(',').map(item => item.trim()).filter(item => item.length > 0);  // Ensure no double quotes
}

function downloadConfig() {
    if (Object.keys(configData).length === 0) {
        alert("Please generate the config first.");
        return;
    }

    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "config.json";  // The file will be named "config.json"
    link.click();
}

function startOver() {
    // Reset the form fields and configData
    document.getElementById("configForm").reset();
    document.getElementById("output").textContent = '';  // Clear the output area
    configData = {};  // Clear the generated config data
}
