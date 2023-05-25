chrome.commands.onCommand.addListener(function(command) {
    if (command === 'save-text') {
        chrome.tabs.executeScript({
            code: 'window.getSelection().toString()'
        }, function(results) {
            chrome.storage.sync.get('savedText', ((data) => {
                let savedText = data.savedText || [];
                if (savedText.includes(results[0])) return;

                if (results && results[0]) {
                    savedText.push(results[0]);
                    chrome.storage.sync.set({ 'savedText': savedText });
                    console.log("Added:", results[0])
                }
            }));

            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }
        });
    }
});

