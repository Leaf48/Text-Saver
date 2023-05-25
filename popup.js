document.addEventListener('DOMContentLoaded', function () {
    // When the popup is loaded, fetch the saved texts and display them
    chrome.storage.sync.get('savedText', function (data) {
        const savedText = data.savedText || [];
        console.log(savedText)

        const list = document.getElementById('saved-text-list');

        savedText.forEach((text, index) => {

            const li = document.createElement('li');
            const a = document.createElement("a")
            a.href = `https://duckduckgo.com/?q=${text}&atb=v345-1&ia=web`
            a.text = text
            li.appendChild(a)
            
            // // Add a button for removing this specific text
            // const removeBtn = document.createElement('button');
            // removeBtn.textContent = 'Remove';
            // removeBtn.addEventListener('click', function () {
            //     // Remove this text from savedTexts and update the storage
            //     savedText.splice(index, 1);
            //     chrome.storage.sync.set({ 'savedText': savedText }, function () {
            //         // Update the UI
            //         list.removeChild(li);
            //     });
            // });
            // li.appendChild(removeBtn);
            list.appendChild(li);
        });
    });

    // Add an event listener to the "Remove All" button
    document.getElementById('remove-all-btn').addEventListener('click', function () {
        const list = document.getElementById('saved-text-list');
        // Clear the storage and the UI
        chrome.storage.sync.clear();
        list.remove()
    });
});
