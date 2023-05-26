chrome.commands.onCommand.addListener(function(command) {
    if (command === 'save-text') {
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                function: () => {
                    const result = window.getSelection().toString();
                    
                    chrome.storage.sync.get('savedText', ((data) => {
                        let savedText = data.savedText || [];
                        if (savedText.includes(result)) return;

                        if (result) {
                            savedText.push(result);
                            chrome.storage.sync.set({ 'savedText': savedText });
                            console.log("Added:", result)
                        }
                    }));

                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError);
                        return;
                    }
                }
            });
        });
    }
});

